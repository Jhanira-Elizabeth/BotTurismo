import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetasTuristicasFormComponent } from './etiquetas-turisticas-form.component';

describe('EtiquetasTuristicasFormComponent', () => {
  let component: EtiquetasTuristicasFormComponent;
  let fixture: ComponentFixture<EtiquetasTuristicasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetasTuristicasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetasTuristicasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
