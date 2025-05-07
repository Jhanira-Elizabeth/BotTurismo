import { TestBed } from '@angular/core/testing';

import { PuntosTuristicosService } from './puntos-turisticos.service';

describe('PuntosTuristicosService', () => {
  let service: PuntosTuristicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntosTuristicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
