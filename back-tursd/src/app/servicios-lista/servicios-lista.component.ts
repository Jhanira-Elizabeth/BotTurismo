import { Component, OnInit } from '@angular/core';
import { ServiciosLocalesService, ServicioLocal } from '../servicios-locales.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ServiciosFormComponent } from '../servicios-form/servicios-form.component'; // Importa ServiciosFormComponent

@Component({
  selector: 'app-servicios-lista',
  standalone: true,
  imports: [CommonModule, ServiciosFormComponent], // Asegúrate de tener ServiciosFormComponent aquí
  templateUrl: './servicios-lista.component.html',
  styleUrls: ['./servicios-lista.component.scss']
})
export class ServiciosListaComponent implements OnInit {
  servicios: ServicioLocal[] = [];
  servicioSeleccionado: ServicioLocal | null = null;
  mostrarFormulario = false;

  constructor(private serviciosService: ServiciosLocalesService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.getAllServicios().subscribe(
      (data) => {
        this.servicios = data.sort((a, b) => (a.id || 0) - (b.id || 0));
      },
      (error) => {
        console.error('Error al cargar los servicios:', error);
      }
    );
  }

  abrirFormularioCrear(): void {
    this.servicioSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(servicio: ServicioLocal): void {
    this.servicioSeleccionado = { ...servicio };
    this.mostrarFormulario = true;
  }

  eliminarServicio(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.serviciosService.deleteServicio(id).subscribe(
        () => {
          this.cargarServicios();
          alert('Servicio eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar el servicio:', error);
          alert('Error al eliminar el servicio');
        }
      );
    }
  }

  guardarServicio(servicio: ServicioLocal): void { // Asegúrate de que el tipo del parámetro sea ServicioLocal
    if (servicio.id) {
      this.serviciosService.updateServicio(servicio.id, servicio).subscribe(
        (data) => {
          this.cargarServicios();
          this.mostrarFormulario = false;
          this.servicioSeleccionado = null;
          alert('Servicio actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar el servicio:', error);
          alert('Error al actualizar el servicio');
        }
      );
    } else {
      this.serviciosService.createServicio(servicio).subscribe(
        (data) => {
          this.cargarServicios();
          this.mostrarFormulario = false;
          this.servicioSeleccionado = null;
          alert('Servicio creado correctamente');
        },
        (error) => {
          console.error('Error al crear el servicio:', error);
          alert('Error al crear el servicio');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.servicioSeleccionado = null;
  }
}