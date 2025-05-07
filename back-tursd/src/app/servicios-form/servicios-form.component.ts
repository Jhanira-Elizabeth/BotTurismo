import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { ServicioLocal } from '../servicios-locales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Asegúrate de tener ReactiveFormsModule aquí
  templateUrl: './servicios-form.component.html',
  styleUrls: ['./servicios-form.component.scss']
})
export class ServiciosFormComponent implements OnInit {
  @Input() servicio: ServicioLocal | null = null;
  @Output() guardar = new EventEmitter<ServicioLocal>();
  @Output() cerrar = new EventEmitter<void>();
  servicioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.servicioForm = this.fb.group({
      id_local: ['', Validators.required],
      servicio: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      creado_por: [''],
      editado_por: [''],
      fecha_creacion: [''],
      fecha_ultima_edicion: ['']
    });
  }

  ngOnInit(): void {
    if (this.servicio) {
      this.servicioForm.patchValue(this.servicio);
    } else {
      this.servicioForm.patchValue({
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16)
      });
    }
  }

  onSubmit(): void {
    if (this.servicioForm.valid) {
      const servicioAGuardar: ServicioLocal = {
        ...this.servicioForm.value,
        id: this.servicio?.id
      };
      this.guardar.emit(servicioAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}