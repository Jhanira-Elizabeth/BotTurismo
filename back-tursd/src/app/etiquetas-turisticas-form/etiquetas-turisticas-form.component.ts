import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EtiquetaTuristica } from '../etiquetas-turisticas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etiquetas-turisticas-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './etiquetas-turisticas-form.component.html',
  styleUrls: ['./etiquetas-turisticas-form.component.scss'],
})
export class EtiquetasTuristicasFormComponent implements OnInit {
  @Input() etiqueta: EtiquetaTuristica | null = null;
  @Output() guardar = new EventEmitter<EtiquetaTuristica>();
  @Output() cerrar = new EventEmitter<void>();
  etiquetaForm: FormGroup;
  estados = ['activo', 'inactivo'];

  constructor(private fb: FormBuilder) {
    this.etiquetaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: ['', Validators.required],
      creado_por: ['', Validators.required],
      editado_por: [''],
      fecha_creacion: ['', Validators.required],
      fecha_ultima_edicion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.etiqueta) {
      this.etiquetaForm.patchValue(this.etiqueta);
      // 'creado_por' y 'fecha_creacion' no deberían ser editables
      this.etiquetaForm.controls['creado_por'].disable();
      this.etiquetaForm.controls['fecha_creacion'].disable();
    } else {
      this.etiquetaForm.patchValue({
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16),
        creado_por: 'Usuario Actual', // Puedes establecer un valor por defecto o dejarlo vacío
      });
    }
  }

  onSubmit(): void {
    if (this.etiquetaForm.valid) {
      const etiquetaAGuardar: EtiquetaTuristica = {
        ...this.etiquetaForm.value,
        id: this.etiqueta?.id,
      };
      this.guardar.emit(etiquetaAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}