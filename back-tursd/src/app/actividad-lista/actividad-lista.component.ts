import { Component, OnInit } from '@angular/core';
import { ActividadService, Actividad } from '../actividad.service';
import { CommonModule } from '@angular/common';
import { ActividadFormComponent } from '../actividad-form/actividad-form.component';

@Component({
  selector: 'app-actividad-lista',
  standalone: true,
  imports: [CommonModule, ActividadFormComponent],
  templateUrl: './actividad-lista.component.html',
  styleUrls: ['./actividad-lista.component.scss'],
})
export class ActividadListaComponent implements OnInit {
  actividades: Actividad[] = [];
  actividadSeleccionada: Actividad | null = null;
  mostrarFormulario = false;

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.actividadService.getAllActividades().subscribe(
      (data) => {
        this.actividades = data.sort((a, b) => (a.id || 0) - (b.id || 0));
      },
      (error) => {
        console.error('Error al cargar las actividades:', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }

  abrirFormularioCrear(): void {
    this.actividadSeleccionada = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(actividad: Actividad): void {
    this.actividadSeleccionada = { ...actividad };
    this.mostrarFormulario = true;
  }

  eliminarActividad(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      this.actividadService.deleteActividad(id).subscribe(
        () => {
          this.cargarActividades();
          alert('Actividad eliminada correctamente');
        },
        (error) => {
          console.error('Error al eliminar la actividad:', error);
          alert('Error al eliminar la actividad');
        }
      );
    }
  }

  guardarActividad(actividad: Actividad): void {
    if (actividad.id) {
      this.actividadService.updateActividad(actividad.id, actividad).subscribe(
        (data) => {
          this.cargarActividades();
          this.mostrarFormulario = false;
          this.actividadSeleccionada = null;
          alert('Actividad actualizada correctamente');
        },
        (error) => {
          console.error('Error al actualizar la actividad:', error);
          alert('Error al actualizar la actividad');
        }
      );
    } else {
      this.actividadService.createActividad(actividad).subscribe(
        (data) => {
          this.cargarActividades();
          this.mostrarFormulario = false;
          this.actividadSeleccionada = null;
          alert('Actividad creada correctamente');
        },
        (error) => {
          console.error('Error al crear la actividad:', error);
          alert('Error al crear la actividad');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.actividadSeleccionada = null;
  }
}