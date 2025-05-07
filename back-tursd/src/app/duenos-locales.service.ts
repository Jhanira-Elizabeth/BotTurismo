import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DuenoLocal {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  email: string;
  contrasena?: string; // Opcional para listar, requerido para crear
  estado: 'activo' | 'inactivo';
  creado_por?: string | null;
  editado_por?: string | null;
  fecha_creacion?: string | null;
  fecha_ultima_edicion?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class DuenosLocalesService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/duenos'; // Ajusta la URL si es diferente

  constructor(private http: HttpClient) {}

  getAllDuenos(): Observable<DuenoLocal[]> {
    return this.http.get<DuenoLocal[]>(this.apiUrl);
  }

  getDuenoById(id: number): Observable<DuenoLocal> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DuenoLocal>(url);
  }

  createDueno(dueno: Omit<DuenoLocal, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<DuenoLocal> {
    return this.http.post<DuenoLocal>(this.apiUrl, dueno);
  }

  updateDueno(id: number, dueno: Omit<DuenoLocal, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<DuenoLocal> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<DuenoLocal>(url, dueno);
  }

  deleteDueno(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}