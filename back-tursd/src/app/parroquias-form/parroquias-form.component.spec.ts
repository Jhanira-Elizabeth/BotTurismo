import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParroquiasFormComponent } from './parroquias-form.component';

describe('ParroquiasFormComponent', () => {
  let component: ParroquiasFormComponent;
  let fixture: ComponentFixture<ParroquiasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParroquiasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParroquiasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
