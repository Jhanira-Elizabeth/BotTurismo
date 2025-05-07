import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Actividad } from '../actividad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actividad-form.component.html',
  styleUrls: ['./actividad-form.component.scss'],
})
export class ActividadFormComponent implements OnInit {
  @Input() actividad: Actividad | null = null;
  @Output() guardar = new EventEmitter<Actividad>();
  @Output() cerrar = new EventEmitter<void>();
  actividadForm: FormGroup;
  estados = ['activo', 'inactivo'];

  constructor(private fb: FormBuilder) {
    this.actividadForm = this.fb.group({
      id_punto_turistico: ['', Validators.required],
      actividad: ['', Validators.required],
      precio: [null],
      estado: ['', Validators.required],
      creado_por: [''],
      editado_por: [''],
      fecha_creacion: [''],
      fecha_ultima_edicion: [''],
      tipo: [''],
    });
  }

  ngOnInit(): void {
    if (this.actividad) {
      this.actividadForm.patchValue(this.actividad);
    } else {
      this.actividadForm.patchValue({
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16),
      });
    }
  }

  onSubmit(): void {
    if (this.actividadForm.valid) {
      const actividadAGuardar: Actividad = {
        ...this.actividadForm.value,
        id: this.actividad?.id,
      };
      this.guardar.emit(actividadAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}