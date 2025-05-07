import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenosLocalesListaComponent } from './duenos-locales-lista.component';

describe('DuenosLocalesListaComponent', () => {
  let component: DuenosLocalesListaComponent;
  let fixture: ComponentFixture<DuenosLocalesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuenosLocalesListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuenosLocalesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
