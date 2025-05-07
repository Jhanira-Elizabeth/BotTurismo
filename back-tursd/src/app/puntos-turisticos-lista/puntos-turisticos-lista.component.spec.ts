import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosTuristicosListaComponent } from './puntos-turisticos-lista.component';

describe('PuntosTuristicosListaComponent', () => {
  let component: PuntosTuristicosListaComponent;
  let fixture: ComponentFixture<PuntosTuristicosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntosTuristicosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntosTuristicosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
