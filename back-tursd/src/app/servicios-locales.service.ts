import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define una interfaz para el tipo de dato 'ServicioLocal' (opcional, pero recomendado)
export interface ServicioLocal {
  id: number;
  id_local: number;
  servicio: string;
  precio: number;
  tipo: string;
  estado: string;
  creado_por?: string | null;
  editado_por?: string | null;
  fecha_creacion?: string | null;
  fecha_ultima_edicion?: string | null;
}

@Injectable({
  providedIn: 'root', // Esto hace que el servicio sea un singleton (una única instancia en toda la aplicación)
})
export class ServiciosLocalesService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/servicios'; // La URL base de tu API

  constructor(private http: HttpClient) {}

  getAllServicios(): Observable<ServicioLocal[]> {
    return this.http.get<ServicioLocal[]>(this.apiUrl);
  }

  getServicioById(id: number): Observable<ServicioLocal> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ServicioLocal>(url);
  }

  createServicio(servicio: Omit<ServicioLocal, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<ServicioLocal> {
    return this.http.post<ServicioLocal>(this.apiUrl, servicio);
  }

  updateServicio(id: number, servicio: Omit<ServicioLocal, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<ServicioLocal> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<ServicioLocal>(url, servicio);
  }

  deleteServicio(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}