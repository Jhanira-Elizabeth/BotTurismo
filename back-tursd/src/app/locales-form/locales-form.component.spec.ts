import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalesFormComponent } from './locales-form.component';

describe('LocalesFormComponent', () => {
  let component: LocalesFormComponent;
  let fixture: ComponentFixture<LocalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
