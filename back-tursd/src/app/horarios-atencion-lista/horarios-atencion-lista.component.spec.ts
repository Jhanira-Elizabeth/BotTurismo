import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosAtencionListaComponent } from './horarios-atencion-lista.component';

describe('HorariosAtencionListaComponent', () => {
  let component: HorariosAtencionListaComponent;
  let fixture: ComponentFixture<HorariosAtencionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosAtencionListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosAtencionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
