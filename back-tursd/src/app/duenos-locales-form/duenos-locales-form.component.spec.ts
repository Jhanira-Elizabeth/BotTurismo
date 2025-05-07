import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenosLocalesFormComponent } from './duenos-locales-form.component';

describe('DuenosLocalesFormComponent', () => {
  let component: DuenosLocalesFormComponent;
  let fixture: ComponentFixture<DuenosLocalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuenosLocalesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuenosLocalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
