import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadListaComponent } from './actividad-lista.component';

describe('ActividadListaComponent', () => {
  let component: ActividadListaComponent;
  let fixture: ComponentFixture<ActividadListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
