import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HorarioAtencion } from '../horario-atencion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horarios-atencion-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './horarios-atencion-form.component.html',
  styleUrls: ['./horarios-atencion-form.component.scss'],
})
export class HorariosAtencionFormComponent implements OnInit {
  @Input() horario: HorarioAtencion | null = null;
  @Output() guardar = new EventEmitter<HorarioAtencion>();
  @Output() cerrar = new EventEmitter<void>();
  horarioForm: FormGroup;
  diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  estados = ['activo', 'inactivo'];

  constructor(private fb: FormBuilder) {
    this.horarioForm = this.fb.group({
      id_local: ['', Validators.required],
      dia_semana: ['', Validators.required],
      hora_inicio: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      hora_fin: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      estado: ['', Validators.required],
      creado_por: [''],
      editado_por: [''],
      fecha_creacion: [''],
      fecha_ultima_edicion: [''],
    });
  }

  ngOnInit(): void {
    if (this.horario) {
      this.horarioForm.patchValue(this.horario);
    } else {
      this.horarioForm.patchValue({
        fecha_creacion: new Date().toISOString().slice(0, 16),
        fecha_ultima_edicion: new Date().toISOString().slice(0, 16),
      });
    }
  }

  onSubmit(): void {
    if (this.horarioForm.valid) {
      const horarioAGuardar: HorarioAtencion = {
        ...this.horarioForm.value,
        id: this.horario?.id,
      };
      this.guardar.emit(horarioAGuardar);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }
}