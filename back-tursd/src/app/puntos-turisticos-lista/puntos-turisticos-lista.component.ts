import { Component, OnInit } from '@angular/core';
import { PuntosTuristicosService, PuntoTuristico } from '../puntos-turisticos.service';
import { CommonModule } from '@angular/common';
import { PuntosTuristicosFormComponent } from '../puntos-turisticos-form/puntos-turisticos-form.component';

@Component({
  selector: 'app-puntos-turisticos-lista',
  standalone: true,
  imports: [CommonModule, PuntosTuristicosFormComponent],
  templateUrl: './puntos-turisticos-lista.component.html',
  styleUrls: ['./puntos-turisticos-lista.component.scss'],
})
export class PuntosTuristicosListaComponent implements OnInit {
  puntosTuristicos: PuntoTuristico[] = [];
  puntoTuristicoSeleccionado: PuntoTuristico | null = null;
  mostrarFormulario = false;

  constructor(private puntosTuristicosService: PuntosTuristicosService) {}

  ngOnInit(): void {
    this.cargarPuntosTuristicos();
  }

  cargarPuntosTuristicos(): void {
    this.puntosTuristicosService.getAllPuntosTuristicos().subscribe(
      (data) => {
        this.puntosTuristicos = data.sort((a, b) => (a.id || 0) - (b.id || 0));
      },
      (error) => {
        console.error('Error al cargar los puntos turísticos:', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }

  abrirFormularioCrear(): void {
    this.puntoTuristicoSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(punto: PuntoTuristico): void {
    this.puntoTuristicoSeleccionado = { ...punto };
    this.mostrarFormulario = true;
  }

  eliminarPuntoTuristico(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este punto turístico?')) {
      this.puntosTuristicosService.deletePuntoTuristico(id).subscribe(
        () => {
          this.cargarPuntosTuristicos();
          alert('Punto turístico eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar el punto turístico:', error);
          alert('Error al eliminar el punto turístico');
        }
      );
    }
  }

  guardarPuntoTuristico(punto: PuntoTuristico): void {
    if (this.puntoTuristicoSeleccionado?.id) {
      // Excluimos 'creado_por' ya que el backend no permite su modificación
      const { creado_por, ...puntoActualizado } = punto;
      this.puntosTuristicosService.updatePuntoTuristico(this.puntoTuristicoSeleccionado.id, puntoActualizado).subscribe(
        () => {
          this.cargarPuntosTuristicos();
          this.mostrarFormulario = false;
          this.puntoTuristicoSeleccionado = null;
          alert('Punto turístico actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar el punto turístico:', error);
          alert('Error al actualizar el punto turístico');
        }
      );
    } else {
      this.puntosTuristicosService.createPuntoTuristico(punto).subscribe(
        () => {
          this.cargarPuntosTuristicos();
          this.mostrarFormulario = false;
          this.puntoTuristicoSeleccionado = null;
          alert('Punto turístico creado correctamente');
        },
        (error) => {
          console.error('Error al crear el punto turístico:', error);
          alert('Error al crear el punto turístico');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.puntoTuristicoSeleccionado = null;
  }
}