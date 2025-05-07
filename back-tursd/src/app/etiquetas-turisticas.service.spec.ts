import { TestBed } from '@angular/core/testing';

import { EtiquetasTuristicasService } from './etiquetas-turisticas.service';

describe('EtiquetasTuristicasService', () => {
  let service: EtiquetasTuristicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtiquetasTuristicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
