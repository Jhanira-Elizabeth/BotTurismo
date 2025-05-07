import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalEtiqueta } from '../local-etiqueta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-local-etiqueta-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './local-etiqueta-form.component.html',
  styleUrls: ['./local-etiqueta-form.component.scss'],
})
export class LocalEtiquetaFormComponent implements OnInit {
  @Input() localEtiqueta: LocalEtiqueta | null = null;
  @Output() guardar = new EventEmitter<LocalEtiqueta>();
  @Output() cerrar = new EventEmitter<void>();
  localEtiquetaForm: FormGroup;
  estados = ['activo', 'inactivo'];

  constructor(private fb: FormBuilder) {
    this.localEtiquetaForm = this.fb.group({
      id_local: ['', Validators.required],
      id_etiqueta: ['', Validators.required],
      estado: ['', Validators.required],
      creado_por: ['', Validators.required],
      editado_por: [''],
      fecha_creacion: ['', Validators.required],
      fecha_ultima_edicion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.localEtiqueta) {
      this.localEtiquetaForm.patchValue(this.localEtiqueta);
      // 'creado_por' y 'fecha_creacion' no deberían ser editables
      this.localEtiquetaForm.controls['creado_por'].disable();
      this.localEtiquetaForm.controls['fecha_creacion'].disable();
      this.localEtiquetaForm.controls['id_local'].disable();
      this.localEtiquetaForm.controls['id_etiqueta'].disable();
    } else {
      this.localEtiquetaForm.patchValue({
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16),
        creado_por: 'Usuario Actual', // Puedes establecer un valor por defecto
      });
    }
  }

  onSubmit(): void {
    if (this.localEtiquetaForm.valid) {
      const localEtiquetaAGuardar: LocalEtiqueta = {
        ...this.localEtiquetaForm.value,
      };
      if (this.localEtiqueta) {
        localEtiquetaAGuardar.id_local = this.localEtiqueta.id_local;
        localEtiquetaAGuardar.id_etiqueta = this.localEtiqueta.id_etiqueta;
      }
      this.guardar.emit(localEtiquetaAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}