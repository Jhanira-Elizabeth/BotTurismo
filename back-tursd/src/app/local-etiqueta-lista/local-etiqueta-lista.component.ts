import { Component, OnInit } from '@angular/core';
import { LocalEtiquetaService, LocalEtiqueta } from '../local-etiqueta.service';
import { CommonModule } from '@angular/common';
import { LocalEtiquetaFormComponent } from '../local-etiqueta-form/local-etiqueta-form.component';

@Component({
  selector: 'app-local-etiqueta-lista',
  standalone: true,
  imports: [CommonModule, LocalEtiquetaFormComponent],
  templateUrl: './local-etiqueta-lista.component.html',
  styleUrls: ['./local-etiqueta-lista.component.scss'],
})
export class LocalEtiquetaListaComponent implements OnInit {
  localEtiquetas: LocalEtiqueta[] = [];
  localEtiquetaSeleccionada: LocalEtiqueta | null = null;
  mostrarFormulario = false;

  constructor(private localEtiquetaService: LocalEtiquetaService) {}

  ngOnInit(): void {
    this.cargarLocalEtiquetas();
  }

  cargarLocalEtiquetas(): void {
    this.localEtiquetaService.getAllLocalEtiquetas().subscribe(
      (data) => {
        this.localEtiquetas = data;
      },
      (error) => {
        console.error('Error al cargar las relaciones Local-Etiqueta:', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }

  abrirFormularioCrear(): void {
    this.localEtiquetaSeleccionada = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(localEtiqueta: LocalEtiqueta): void {
    this.localEtiquetaSeleccionada = { ...localEtiqueta };
    this.mostrarFormulario = true;
  }

  eliminarLocalEtiqueta(id_local: number, id_etiqueta: number): void {
    if (confirm(`¿Estás seguro de eliminar la relación Local: ${id_local} - Etiqueta: ${id_etiqueta}?`)) {
      this.localEtiquetaService.deleteLocalEtiqueta(id_local, id_etiqueta).subscribe(
        () => {
          this.cargarLocalEtiquetas();
          alert('Relación Local-Etiqueta eliminada correctamente');
        },
        (error) => {
          console.error('Error al eliminar la relación:', error);
          alert('Error al eliminar la relación');
        }
      );
    }
  }

  guardarLocalEtiqueta(localEtiqueta: LocalEtiqueta): void {
    if (this.localEtiquetaSeleccionada) {
      // Excluimos 'creado_por' ya que el backend no permite su modificación
      const { creado_por, ...etiquetaActualizada } = localEtiqueta;
      this.localEtiquetaService.updateLocalEtiqueta(this.localEtiquetaSeleccionada.id_local, this.localEtiquetaSeleccionada.id_etiqueta, etiquetaActualizada).subscribe(
        (data) => {
          this.cargarLocalEtiquetas();
          this.mostrarFormulario = false;
          this.localEtiquetaSeleccionada = null;
          alert('Relación Local-Etiqueta actualizada correctamente');
        },
        (error) => {
          console.error('Error al actualizar la relación:', error);
          alert('Error al actualizar la relación');
        }
      );
    } else {
      this.localEtiquetaService.createLocalEtiqueta(localEtiqueta).subscribe(
        (data) => {
          this.cargarLocalEtiquetas();
          this.mostrarFormulario = false;
          this.localEtiquetaSeleccionada = null;
          alert('Relación Local-Etiqueta creada correctamente');
        },
        (error) => {
          console.error('Error al crear la relación:', error);
          alert('Error al crear la relación');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.localEtiquetaSeleccionada = null;
  }
}