import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PuntoTuristico {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  latitud?: number | null;
  longitud?: number | null;
  id_parroquia?: number | null;
  estado: 'activo' | 'inactivo';
  creado_por?: string | null;
  editado_por?: string | null;
  fecha_creacion?: string | null;
  fecha_ultima_edicion?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class PuntosTuristicosService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/puntos'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient) {}

  getAllPuntosTuristicos(): Observable<PuntoTuristico[]> {
    return this.http.get<PuntoTuristico[]>(this.apiUrl);
  }

  getPuntoTuristicoById(id: number): Observable<PuntoTuristico> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PuntoTuristico>(url);
  }

  createPuntoTuristico(punto: Omit<PuntoTuristico, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<PuntoTuristico> {
    return this.http.post<PuntoTuristico>(this.apiUrl, punto);
  }

  updatePuntoTuristico(id: number, punto: Omit<PuntoTuristico, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion' | 'creado_por'>): Observable<PuntoTuristico> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<PuntoTuristico>(url, punto);
  }

  deletePuntoTuristico(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}