import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalEtiquetaListaComponent } from './local-etiqueta-lista.component';

describe('LocalEtiquetaListaComponent', () => {
  let component: LocalEtiquetaListaComponent;
  let fixture: ComponentFixture<LocalEtiquetaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalEtiquetaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalEtiquetaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
