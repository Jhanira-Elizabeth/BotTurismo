import { Component, OnInit } from '@angular/core';
import { EtiquetasTuristicasService, EtiquetaTuristica } from '../etiquetas-turisticas.service';
import { CommonModule } from '@angular/common';
import { EtiquetasTuristicasFormComponent } from '../etiquetas-turisticas-form/etiquetas-turisticas-form.component';

@Component({
  selector: 'app-etiquetas-turisticas-lista',
  standalone: true,
  imports: [CommonModule, EtiquetasTuristicasFormComponent],
  templateUrl: './etiquetas-turisticas-lista.component.html',
  styleUrls: ['./etiquetas-turisticas-lista.component.scss'],
})
export class EtiquetasTuristicasListaComponent implements OnInit {
  etiquetas: EtiquetaTuristica[] = [];
  etiquetaSeleccionada: EtiquetaTuristica | null = null;
  mostrarFormulario = false;

  constructor(private etiquetasService: EtiquetasTuristicasService) {}

  ngOnInit(): void {
    this.cargarEtiquetas();
  }

  cargarEtiquetas(): void {
    this.etiquetasService.getAllEtiquetas().subscribe(
      (data) => {
        this.etiquetas = data.sort((a, b) => (a.id || 0) - (b.id || 0));
      },
      (error) => {
        console.error('Error al cargar las etiquetas:', error);
        // Manejar el error (mostrar mensaje al usuario, etc.)
      }
    );
  }

  abrirFormularioCrear(): void {
    this.etiquetaSeleccionada = null;
    this.mostrarFormulario = true;
  }

  abrirFormularioEditar(etiqueta: EtiquetaTuristica): void {
    this.etiquetaSeleccionada = { ...etiqueta };
    this.mostrarFormulario = true;
  }

  eliminarEtiqueta(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta etiqueta?')) {
      this.etiquetasService.deleteEtiqueta(id).subscribe(
        () => {
          this.cargarEtiquetas();
          alert('Etiqueta eliminada correctamente');
        },
        (error) => {
          console.error('Error al eliminar la etiqueta:', error);
          alert('Error al eliminar la etiqueta');
        }
      );
    }
  }

  guardarEtiqueta(etiqueta: EtiquetaTuristica): void {
    if (etiqueta.id) {
      // Excluimos 'creado_por' ya que el backend no permite su modificación
      const { creado_por, ...etiquetaActualizada } = etiqueta;
      this.etiquetasService.updateEtiqueta(etiqueta.id, etiquetaActualizada).subscribe(
        (data) => {
          this.cargarEtiquetas();
          this.mostrarFormulario = false;
          this.etiquetaSeleccionada = null;
          alert('Etiqueta actualizada correctamente');
        },
        (error) => {
          console.error('Error al actualizar la etiqueta:', error);
          alert('Error al actualizar la etiqueta');
        }
      );
    } else {
      this.etiquetasService.createEtiqueta(etiqueta).subscribe(
        (data) => {
          this.cargarEtiquetas();
          this.mostrarFormulario = false;
          this.etiquetaSeleccionada = null;
          alert('Etiqueta creada correctamente');
        },
        (error) => {
          console.error('Error al crear la etiqueta:', error);
          alert('Error al crear la etiqueta');
        }
      );
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.etiquetaSeleccionada = null;
  }
}