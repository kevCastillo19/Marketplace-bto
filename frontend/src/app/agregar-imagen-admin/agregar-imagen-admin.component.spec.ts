import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarImagenAdminComponent } from './agregar-imagen-admin.component';

describe('AgregarImagenAdminComponent', () => {
  let component: AgregarImagenAdminComponent;
  let fixture: ComponentFixture<AgregarImagenAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarImagenAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarImagenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
