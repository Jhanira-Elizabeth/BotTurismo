import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Parroquia } from '../parroquias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parroquias-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './parroquias-form.component.html',
  styleUrls: ['./parroquias-form.component.scss'],
})
export class ParroquiasFormComponent implements OnInit {
  @Input() parroquia: Parroquia | null = null;
  @Output() guardar = new EventEmitter<Parroquia>();
  @Output() cerrar = new EventEmitter<void>();
  parroquiaForm: FormGroup;
  estados = ['activo', 'inactivo'];

  constructor(private fb: FormBuilder) {
    this.parroquiaForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha_fundacion: ['', Validators.required],
      poblacion: ['', Validators.required],
      temperatura_promedio: ['', Validators.required],
      descripcion: [''],
      estado: ['', Validators.required],
      creado_por: [''],
      editado_por: [''],
      fecha_creacion: [''],
      fecha_ultima_edicion: [''],
    });
  }

  ngOnInit(): void {
    if (this.parroquia) {
      this.parroquiaForm.patchValue(this.parroquia);
      this.parroquiaForm.controls['creado_por'].disable();
      this.parroquiaForm.controls['fecha_creacion'].disable();
      this.parroquiaForm.controls['fecha_ultima_edicion'].disable(); // También deshabilitar en edición
    } else {
      this.parroquiaForm.patchValue({
        estado: 'activo', // Valor por defecto al crear
        creado_por: 'Usuario Actual', // Puedes establecer un valor por defecto
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16),
      });
    }
  }

  onSubmit(): void {
    if (this.parroquiaForm.valid) {
      const parroquiaAGuardar: Parroquia = {
        ...this.parroquiaForm.value,
      };
      if (this.parroquia?.id) {
        parroquiaAGuardar.id = this.parroquia.id;
      }
      this.guardar.emit(parroquiaAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}