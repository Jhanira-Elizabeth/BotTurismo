import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetasTuristicasListaComponent } from './etiquetas-turisticas-lista.component';

describe('EtiquetasTuristicasListaComponent', () => {
  let component: EtiquetasTuristicasListaComponent;
  let fixture: ComponentFixture<EtiquetasTuristicasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetasTuristicasListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetasTuristicasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
