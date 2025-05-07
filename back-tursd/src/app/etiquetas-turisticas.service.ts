import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EtiquetaTuristica {
  id: number;
  nombre: string;
  descripcion: string | null;
  estado: 'activo' | 'inactivo';
  creado_por: string;
  editado_por: string | null;
  fecha_creacion: string;
  fecha_ultima_edicion: string;
}

@Injectable({
  providedIn: 'root',
})
export class EtiquetasTuristicasService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/etiquetas'; // Ajusta la URL si es diferente

  constructor(private http: HttpClient) {}

  getAllEtiquetas(): Observable<EtiquetaTuristica[]> {
    return this.http.get<EtiquetaTuristica[]>(this.apiUrl);
  }

  getEtiquetaById(id: number): Observable<EtiquetaTuristica> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EtiquetaTuristica>(url);
  }

  createEtiqueta(etiqueta: Omit<EtiquetaTuristica, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<EtiquetaTuristica> {
    return this.http.post<EtiquetaTuristica>(this.apiUrl, etiqueta);
  }

  updateEtiqueta(id: number, etiqueta: Omit<EtiquetaTuristica, 'id' | 'fecha_creacion' | 'fecha_ultima_edicion' | 'creado_por'>): Observable<EtiquetaTuristica> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<EtiquetaTuristica>(url, etiqueta);
  }

  deleteEtiqueta(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}