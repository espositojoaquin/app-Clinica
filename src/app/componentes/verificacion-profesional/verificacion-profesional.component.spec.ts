import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionProfesionalComponent } from './verificacion-profesional.component';

describe('VerificacionProfesionalComponent', () => {
  let component: VerificacionProfesionalComponent;
  let fixture: ComponentFixture<VerificacionProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificacionProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
