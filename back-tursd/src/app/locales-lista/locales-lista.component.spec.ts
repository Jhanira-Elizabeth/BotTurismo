import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesListaComponent } from './locales-lista.component';

describe('LocalesListaComponent', () => {
  let component: LocalesListaComponent;
  let fixture: ComponentFixture<LocalesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalesListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
