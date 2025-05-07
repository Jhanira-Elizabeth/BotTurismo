import { TestBed } from '@angular/core/testing';

import { DuenosLocalesService } from './duenos-locales.service';

describe('DuenosLocalesService', () => {
  let service: DuenosLocalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuenosLocalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
