import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosTuristicosFormComponent } from './puntos-turisticos-form.component';

describe('PuntosTuristicosFormComponent', () => {
  let component: PuntosTuristicosFormComponent;
  let fixture: ComponentFixture<PuntosTuristicosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntosTuristicosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntosTuristicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
