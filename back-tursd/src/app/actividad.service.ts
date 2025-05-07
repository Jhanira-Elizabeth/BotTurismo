import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Actividad {
  id: number;
  id_punto_turistico: number;
  actividad: string;
  precio: number | null;
  estado: 'activo' | 'inactivo';
  creado_por?: string | null;
  editado_por?: string | null;
  fecha_creacion?: string | null;
  fecha_ultima_edicion?: string | null;
  tipo?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/actividades'; // Ajusta la URL si es diferente

  constructor(private http: HttpClient) {}

  getAllActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl);
  }

  getActividadById(id: number): Observable<Actividad> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Actividad>(url);
  }

  createActividad(actividad: Omit<Actividad, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<Actividad> {
    return this.http.post<Actividad>(this.apiUrl, actividad);
  }

  updateActividad(id: number, actividad: Omit<Actividad, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<Actividad> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Actividad>(url, actividad);
  }

  deleteActividad(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}