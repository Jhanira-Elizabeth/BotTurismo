import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HorarioAtencion {
  id: number;
  id_local: number;
  dia_semana: 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';
  hora_inicio: string; // Formato HH:mm
  hora_fin: string;   // Formato HH:mm
  estado: 'activo' | 'inactivo';
  creado_por?: string | null;
  editado_por?: string | null;
  fecha_creacion?: string | null;
  fecha_ultima_edicion?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class HorariosAtencionService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/horarios-atencion'; // Ajusta la URL si es diferente

  constructor(private http: HttpClient) {}

  getAllHorarios(): Observable<HorarioAtencion[]> {
    return this.http.get<HorarioAtencion[]>(this.apiUrl);
  }

  getHorarioById(id: number): Observable<HorarioAtencion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<HorarioAtencion>(url);
  }

  createHorario(horario: Omit<HorarioAtencion, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<HorarioAtencion> {
    return this.http.post<HorarioAtencion>(this.apiUrl, horario);
  }

  updateHorario(id: number, horario: Omit<HorarioAtencion, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<HorarioAtencion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<HorarioAtencion>(url, horario);
  }

  deleteHorario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}