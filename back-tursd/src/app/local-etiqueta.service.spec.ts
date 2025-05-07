import { TestBed } from '@angular/core/testing';

import { LocalEtiquetaService } from './local-etiqueta.service';

describe('LocalEtiquetaService', () => {
  let service: LocalEtiquetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalEtiquetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
