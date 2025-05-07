import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocalEtiqueta {
  id_local: number;
  id_etiqueta: number;
  estado: 'activo' | 'inactivo';
  creado_por: string;
  editado_por: string | null;
  fecha_creacion: string;
  fecha_ultima_edicion: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalEtiquetaService {
  private apiUrl = 'https://tursd.onrender.com/api/v1/local-etiqueta'; // Ajusta la URL si es diferente

  constructor(private http: HttpClient) {}

  getAllLocalEtiquetas(): Observable<LocalEtiqueta[]> {
    return this.http.get<LocalEtiqueta[]>(this.apiUrl);
  }

  getLocalEtiquetaByIds(id_local: number, id_etiqueta: number): Observable<LocalEtiqueta> {
    const url = `${this.apiUrl}/${id_local}/${id_etiqueta}`;
    return this.http.get<LocalEtiqueta>(url);
  }

  createLocalEtiqueta(localEtiqueta: Omit<LocalEtiqueta, 'fecha_creacion' | 'fecha_ultima_edicion'>): Observable<LocalEtiqueta> {
    return this.http.post<LocalEtiqueta>(this.apiUrl, localEtiqueta);
  }

  updateLocalEtiqueta(id_local: number, id_etiqueta: number, localEtiqueta: Omit<LocalEtiqueta, 'fecha_creacion' | 'fecha_ultima_edicion' | 'creado_por'>): Observable<LocalEtiqueta> {
    const url = `${this.apiUrl}/${id_local}/${id_etiqueta}`;
    return this.http.patch<LocalEtiqueta>(url, localEtiqueta);
  }

  deleteLocalEtiqueta(id_local: number, id_etiqueta: number): Observable<any> {
    const url = `${this.apiUrl}/${id_local}/${id_etiqueta}`;
    return this.http.delete(url);
  }
}