import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DuenoLocal } from '../duenos-locales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-duenos-locales-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './duenos-locales-form.component.html',
  styleUrls: ['./duenos-locales-form.component.scss'],
})
export class DuenosLocalesFormComponent implements OnInit {
  @Input() dueno: DuenoLocal | null = null;
  @Output() guardar = new EventEmitter<DuenoLocal>();
  @Output() cerrar = new EventEmitter<void>();
  duenoForm: FormGroup;
  estados = ['activo', 'inactivo'];

  constructor(private fb: FormBuilder) {
    this.duenoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: [''], // No es requerido para la edición
      estado: ['', Validators.required],
      creado_por: [''],
      editado_por: [''],
      fecha_creacion: [''],
      fecha_ultima_edicion: [''],
    });
  }

  ngOnInit(): void {
    if (this.dueno) {
      this.duenoForm.patchValue(this.dueno);
      // No permitir la edición de la contraseña aquí, podrías tener un formulario separado para eso
      this.duenoForm.get('contrasena')?.disable();
    } else {
      this.duenoForm.patchValue({
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16),
      });
      this.duenoForm.get('contrasena')?.setValidators([Validators.required]);
      this.duenoForm.get('contrasena')?.enable();
      this.duenoForm.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.duenoForm.valid) {
      const duenoAGuardar: DuenoLocal = {
        ...this.duenoForm.value,
        id: this.dueno?.id,
        contrasena: this.duenoForm.get('contrasena')?.value || undefined, // Evitar enviar contraseña vacía en edición
      };
      this.guardar.emit(duenoAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}