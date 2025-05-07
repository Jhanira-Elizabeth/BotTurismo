import { Component, OnInit } from '@angular/core';
import { LocalesService, LocalTuristico } from '../locales.service';
import { CommonModule } from '@angular/common';
import { LocalesFormComponent } from '../locales-form/locales-form.component';

@Component({
  selector: 'app-locales-lista',
  standalone: true,
  imports: [CommonModule, LocalesFormComponent],
  templateUrl: './locales-lista.component.html',
  styleUrls: ['./locales-lista.component.scss'],
})
export class LocalesListaComponent implements OnInit {
  locales: LocalTuristico[] = [];
  localSeleccionado: LocalTuristico | null = null;
  mostrarFormulario = false;

  constructor(private localesService: LocalesService) {}

  ngOnInit(): void {
    this.cargarLocales();
  }

  cargarLocales(): void {
    this.localesService.getAllLocales().subscribe(
      (data) => {
        this.locales = data.sort((a, b) => (a.id || 0) - (b.id || 0));
      },
      (error) => {
        console.error('Error al cargar los locales:', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }

  abrirFormularioCrear(): void {
    this.localSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(local: LocalTuristico): void {
    this.localSeleccionado = { ...local };
    this.mostrarFormulario = true;
  }

  eliminarLocal(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este local?')) {
      this.localesService.deleteLocal(id).subscribe(
        () => {
          this.cargarLocales();
          alert('Local eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar el local:', error);
          alert('Error al eliminar el local');
        }
      );
    }
  }

  guardarLocal(local: LocalTuristico): void {
    if (this.localSeleccionado?.id) {
      // Excluimos 'creado_por' ya que el backend no permite su modificación
      const { creado_por, ...localActualizado } = local;
      this.localesService.updateLocal(this.localSeleccionado.id, localActualizado).subscribe(
        () => {
          this.cargarLocales();
          this.mostrarFormulario = false;
          this.localSeleccionado = null;
          alert('Local actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar el local:', error);
          alert('Error al actualizar el local');
        }
      );
    } else {
      this.localesService.createLocal(local).subscribe(
        () => {
          this.cargarLocales();
          this.mostrarFormulario = false;
          this.localSeleccionado = null;
          alert('Local creado correctamente');
        },
        (error) => {
          console.error('Error al crear el local:', error);
          alert('Error al crear el local');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.localSeleccionado = null;
  }
}