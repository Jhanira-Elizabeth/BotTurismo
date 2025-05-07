import { TestBed } from '@angular/core/testing';

import { ServiciosLocalesService } from './servicios-locales.service';

describe('ServiciosLocalesService', () => {
  let service: ServiciosLocalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosLocalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
