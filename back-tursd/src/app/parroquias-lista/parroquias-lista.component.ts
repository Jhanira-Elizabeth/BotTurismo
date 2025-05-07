import { Component, OnInit } from '@angular/core';
import { ParroquiasService, Parroquia } from '../parroquias.service';
import { CommonModule } from '@angular/common';
import { ParroquiasFormComponent } from '../parroquias-form/parroquias-form.component';

@Component({
  selector: 'app-parroquias-lista',
  standalone: true,
  imports: [CommonModule, ParroquiasFormComponent],
  templateUrl: './parroquias-lista.component.html',
  styleUrls: ['./parroquias-lista.component.scss'],
})
export class ParroquiasListaComponent implements OnInit {
  parroquias: Parroquia[] = [];
  parroquiaSeleccionada: Parroquia | null = null;
  mostrarFormulario = false;

  constructor(private parroquiasService: ParroquiasService) {}

  ngOnInit(): void {
    this.cargarParroquias();
  }

  cargarParroquias(): void {
    this.parroquiasService.getAllParroquias().subscribe(
      (data) => {
        this.parroquias = data.sort((a, b) => (a.id || 0) - (b.id || 0));
      },
      (error) => {
        console.error('Error al cargar las parroquias:', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }

  abrirFormularioCrear(): void {
    this.parroquiaSeleccionada = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(parroquia: Parroquia): void {
    this.parroquiaSeleccionada = { ...parroquia };
    this.mostrarFormulario = true;
  }

  eliminarParroquia(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta parroquia?')) {
      this.parroquiasService.deleteParroquia(id).subscribe(
        () => {
          this.cargarParroquias();
          alert('Parroquia eliminada correctamente');
        },
        (error) => {
          console.error('Error al eliminar la parroquia:', error);
          alert('Error al eliminar la parroquia');
        }
      );
    }
  }

  guardarParroquia(parroquia: Parroquia): void {
    if (this.parroquiaSeleccionada?.id) {
      // Excluimos 'creado_por' ya que el backend no permite su modificación
      const { creado_por, ...parroquiaActualizada } = parroquia;
      this.parroquiasService.updateParroquia(this.parroquiaSeleccionada.id, parroquiaActualizada).subscribe(
        () => {
          this.cargarParroquias();
          this.mostrarFormulario = false;
          this.parroquiaSeleccionada = null;
          alert('Parroquia actualizada correctamente');
        },
        (error) => {
          console.error('Error al actualizar la parroquia:', error);
          alert('Error al actualizar la parroquia');
        }
      );
    } else {
      this.parroquiasService.createParroquia(parroquia).subscribe(
        () => {
          this.cargarParroquias();
          this.mostrarFormulario = false;
          this.parroquiaSeleccionada = null;
          alert('Parroquia creada correctamente');
        },
        (error) => {
          console.error('Error al crear la parroquia:', error);
          alert('Error al crear la parroquia');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.parroquiaSeleccionada = null;
  }
}