import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParroquiasListaComponent } from './parroquias-lista.component';

describe('ParroquiasListaComponent', () => {
  let component: ParroquiasListaComponent;
  let fixture: ComponentFixture<ParroquiasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParroquiasListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParroquiasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
