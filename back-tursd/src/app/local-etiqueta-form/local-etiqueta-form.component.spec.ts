import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalEtiquetaFormComponent } from './local-etiqueta-form.component';

describe('LocalEtiquetaFormComponent', () => {
  let component: LocalEtiquetaFormComponent;
  let fixture: ComponentFixture<LocalEtiquetaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalEtiquetaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalEtiquetaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
