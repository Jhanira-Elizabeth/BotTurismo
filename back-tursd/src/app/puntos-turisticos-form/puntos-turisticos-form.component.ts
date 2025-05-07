import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PuntoTuristico } from '../puntos-turisticos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puntos-turisticos-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './puntos-turisticos-form.component.html',
  styleUrls: ['./puntos-turisticos-form.component.scss'],
})
export class PuntosTuristicosFormComponent implements OnInit {
  @Input() puntoTuristico: PuntoTuristico | null = null;
  @Output() guardar = new EventEmitter<PuntoTuristico>();
  @Output() cerrar = new EventEmitter<void>();
  puntoTuristicoForm: FormGroup;
  estados = ['activo', 'inactivo'];

  constructor(private fb: FormBuilder) {
    this.puntoTuristicoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      latitud: [null],
      longitud: [null],
      id_parroquia: [null],
      estado: ['', Validators.required],
      creado_por: [''],
      editado_por: [''],
      fecha_creacion: [''],
      fecha_ultima_edicion: [''],
    });
  }

  ngOnInit(): void {
    if (this.puntoTuristico) {
      this.puntoTuristicoForm.patchValue(this.puntoTuristico);
      this.puntoTuristicoForm.controls['creado_por'].disable();
      this.puntoTuristicoForm.controls['fecha_creacion'].disable();
      this.puntoTuristicoForm.controls['fecha_ultima_edicion'].disable(); // También deshabilitar en edición
    } else {
      this.puntoTuristicoForm.patchValue({
        estado: 'activo', // Valor por defecto al crear
        creado_por: 'Usuario Actual', // Puedes establecer un valor por defecto
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16),
      });
    }
  }

  onSubmit(): void {
    if (this.puntoTuristicoForm.valid) {
      const puntoAGuardar: PuntoTuristico = {
        ...this.puntoTuristicoForm.value,
      };
      if (this.puntoTuristico?.id) {
        puntoAGuardar.id = this.puntoTuristico.id;
      }
      this.guardar.emit(puntoAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}