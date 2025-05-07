import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosAtencionFormComponent } from './horarios-atencion-form.component';

describe('HorariosAtencionFormComponent', () => {
  let component: HorariosAtencionFormComponent;
  let fixture: ComponentFixture<HorariosAtencionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosAtencionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosAtencionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
