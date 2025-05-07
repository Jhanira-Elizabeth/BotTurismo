import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocalTuristico {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  id_dueno?: number | null;
  direccion?: string | null;
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
export class LocalesService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/locales'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient) {}

  getAllLocales(): Observable<LocalTuristico[]> {
    return this.http.get<LocalTuristico[]>(this.apiUrl);
  }

  getLocalById(id: number): Observable<LocalTuristico> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<LocalTuristico>(url);
  }

  createLocal(local: Omit<LocalTuristico, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<LocalTuristico> {
    return this.http.post<LocalTuristico>(this.apiUrl, local);
  }

  updateLocal(id: number, local: Omit<LocalTuristico, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion' | 'creado_por'>): Observable<LocalTuristico> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<LocalTuristico>(url, local);
  }

  deleteLocal(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}