import { Component, OnInit } from '@angular/core';
import { DuenosLocalesService, DuenoLocal } from '../duenos-locales.service';
import { CommonModule } from '@angular/common';
import { DuenosLocalesFormComponent } from '../duenos-locales-form/duenos-locales-form.component';

@Component({
  selector: 'app-duenos-locales-lista',
  standalone: true,
  imports: [CommonModule, DuenosLocalesFormComponent],
  templateUrl: './duenos-locales-lista.component.html',
  styleUrls: ['./duenos-locales-lista.component.scss'],
})
export class DuenosLocalesListaComponent implements OnInit {
  duenos: DuenoLocal[] = [];
  duenoSeleccionado: DuenoLocal | null = null;
  mostrarFormulario = false;

  constructor(private duenosService: DuenosLocalesService) {}

  ngOnInit(): void {
    this.cargarDuenos();
  }

  cargarDuenos(): void {
    this.duenosService.getAllDuenos().subscribe(
      (data) => {
        this.duenos = data.sort((a, b) => (a.id || 0) - (b.id || 0));
      },
      (error) => {
        console.error('Error al cargar los dueños:', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }

  abrirFormularioCrear(): void {
    this.duenoSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(dueno: DuenoLocal): void {
    this.duenoSeleccionado = { ...dueno };
    this.mostrarFormulario = true;
  }

  eliminarDueno(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este dueño?')) {
      this.duenosService.deleteDueno(id).subscribe(
        () => {
          this.cargarDuenos();
          alert('Dueño eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar el dueño:', error);
          alert('Error al eliminar el dueño');
        }
      );
    }
  }

  guardarDueno(dueno: DuenoLocal): void {
    if (dueno.id) {
      this.duenosService.updateDueno(dueno.id, dueno).subscribe(
        (data) => {
          this.cargarDuenos();
          this.mostrarFormulario = false;
          this.duenoSeleccionado = null;
          alert('Dueño actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar el dueño:', error);
          alert('Error al actualizar el dueño');
        }
      );
    } else {
      this.duenosService.createDueno(dueno).subscribe(
        (data) => {
          this.cargarDuenos();
          this.mostrarFormulario = false;
          this.duenoSeleccionado = null;
          alert('Dueño creado correctamente');
        },
        (error) => {
          console.error('Error al crear el dueño:', error);
          alert('Error al crear el dueño');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.duenoSeleccionado = null;
  }
}