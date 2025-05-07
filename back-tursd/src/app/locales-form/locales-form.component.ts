import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalTuristico } from '../locales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locales-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './locales-form.component.html',
  styleUrls: ['./locales-form.component.scss'],
})
export class LocalesFormComponent implements OnInit {
  @Input() local: LocalTuristico | null = null;
  @Output() guardar = new EventEmitter<LocalTuristico>();
  @Output() cerrar = new EventEmitter<void>();
  localForm: FormGroup;
  estados = ['activo', 'inactivo'];

  constructor(private fb: FormBuilder) {
    this.localForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      id_dueno: [''],
      direccion: [''],
      latitud: ['', Validators.pattern(/^-?\d+(\.\d{1,6})?$/)],
      longitud: ['', Validators.pattern(/^-?\d+(\.\d{1,6})?$/)],
      id_parroquia: [''],
      estado: ['', Validators.required],
      creado_por: [''],
      editado_por: [''],
      fecha_creacion: [''],
      fecha_ultima_edicion: [''],
    });
  }

  ngOnInit(): void {
    if (this.local) {
      this.localForm.patchValue(this.local);
      this.localForm.controls['creado_por'].disable();
      this.localForm.controls['fecha_creacion'].disable();
    } else {
      this.localForm.patchValue({
        estado: 'activo', // Valor por defecto al crear
        creado_por: 'Usuario Actual', // Puedes establecer un valor por defecto
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16),
      });
    }
  }

  onSubmit(): void {
    if (this.localForm.valid) {
      const localAGuardar: LocalTuristico = {
        ...this.localForm.value,
      };
      if (this.local?.id) {
        localAGuardar.id = this.local.id;
      }
      this.guardar.emit(localAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}