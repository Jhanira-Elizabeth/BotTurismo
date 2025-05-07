import { Routes } from '@angular/router';
import { LocalesListaComponent } from './locales-lista/locales-lista.component'; // Asegúrate de crear este componente
import { PuntosTuristicosListaComponent } from './puntos-turisticos-lista/puntos-turisticos-lista.component';
import { EtiquetasTuristicasListaComponent } from './etiquetas-turisticas-lista/etiquetas-turisticas-lista.component';
import { LocalEtiquetaListaComponent } from './local-etiqueta-lista/local-etiqueta-lista.component';
import { ActividadListaComponent } from './actividad-lista/actividad-lista.component';
import { ServiciosListaComponent } from './servicios-lista/servicios-lista.component';
import { DuenosLocalesListaComponent } from './duenos-locales-lista/duenos-locales-lista.component';
import { ParroquiasListaComponent } from './parroquias-lista/parroquias-lista.component';
import { HorariosAtencionListaComponent } from './horarios-atencion-lista/horarios-atencion-lista.component';

export const routes: Routes = [
  { path: 'locales-turisticos', component: LocalesListaComponent },
  { path: 'puntos-turisticos', component: PuntosTuristicosListaComponent },
  { path: 'etiquetas-turisticas', component: EtiquetasTuristicasListaComponent },
  { path: 'local-etiqueta', component: LocalEtiquetaListaComponent },
  { path: 'actividades', component: ActividadListaComponent },
  { path: 'servicios', component: ServiciosListaComponent },
  { path: 'duenos', component: DuenosLocalesListaComponent },
  { path: 'parroquias', component: ParroquiasListaComponent },
  { path: 'horarios-atencion', component: HorariosAtencionListaComponent },
  { path: '', redirectTo: '/locales-turisticos', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/locales-turisticos' }, // Ruta para cualquier otra cosa
];