import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Parroquia {
  id?: number;
  nombre: string;
  fecha_fundacion: string;
  poblacion: string;
  temperatura_promedio: string;
  descripcion?: string | null;
  estado: 'activo' | 'inactivo';
  creado_por?: string | null;
  editado_por?: string | null;
  fecha_creacion?: string | null;
  fecha_ultima_edicion?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ParroquiasService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/parroquias'; // Reemplaza con tu URL de la API

  constructor(private http: HttpClient) {}

  getAllParroquias(): Observable<Parroquia[]> {
    return this.http.get<Parroquia[]>(this.apiUrl);
  }

  getParroquiaById(id: number): Observable<Parroquia> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Parroquia>(url);
  }

  createParroquia(parroquia: Omit<Parroquia, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<Parroquia> {
    return this.http.post<Parroquia>(this.apiUrl, parroquia);
  }

  updateParroquia(id: number, parroquia: Omit<Parroquia, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion' | 'creado_por'>): Observable<Parroquia> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Parroquia>(url, parroquia);
  }

  deleteParroquia(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}