import { Component, OnInit } from '@angular/core';
import { HorariosAtencionService, HorarioAtencion } from '../horario-atencion.service';
import { CommonModule } from '@angular/common';
import { HorariosAtencionFormComponent } from '../horarios-atencion-form/horarios-atencion-form.component';

@Component({
  selector: 'app-horarios-atencion-lista',
  standalone: true,
  imports: [CommonModule, HorariosAtencionFormComponent],
  templateUrl: './horarios-atencion-lista.component.html',
  styleUrls: ['./horarios-atencion-lista.component.scss'],
})
export class HorariosAtencionListaComponent implements OnInit {
  horarios: HorarioAtencion[] = [];
  horarioSeleccionado: HorarioAtencion | null = null;
  mostrarFormulario = false;

  constructor(private horariosService: HorariosAtencionService) {}

  ngOnInit(): void {
    this.cargarHorarios();
  }

  cargarHorarios(): void {
    this.horariosService.getAllHorarios().subscribe(
      (data) => {
        this.horarios = data.sort((a, b) => (a.id || 0) - (b.id || 0));
      },
      (error) => {
        console.error('Error al cargar los horarios:', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }

  abrirFormularioCrear(): void {
    this.horarioSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(horario: HorarioAtencion): void {
    this.horarioSeleccionado = { ...horario };
    this.mostrarFormulario = true;
  }

  eliminarHorario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      this.horariosService.deleteHorario(id).subscribe(
        () => {
          this.cargarHorarios();
          alert('Horario eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar el horario:', error);
          alert('Error al eliminar el horario');
        }
      );
    }
  }

  guardarHorario(horario: HorarioAtencion): void {
    if (horario.id) {
      this.horariosService.updateHorario(horario.id, horario).subscribe(
        (data) => {
          this.cargarHorarios();
          this.mostrarFormulario = false;
          this.horarioSeleccionado = null;
          alert('Horario actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar el horario:', error);
          alert('Error al actualizar el horario');
        }
      );
    } else {
      this.horariosService.createHorario(horario).subscribe(
        (data) => {
          this.cargarHorarios();
          this.mostrarFormulario = false;
          this.horarioSeleccionado = null;
          alert('Horario creado correctamente');
        },
        (error) => {
          console.error('Error al crear el horario:', error);
          alert('Error al crear el horario');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.horarioSeleccionado = null;
  }
}