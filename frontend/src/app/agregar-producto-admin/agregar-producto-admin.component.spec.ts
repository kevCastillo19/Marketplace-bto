import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoAdminComponent } from './agregar-producto-admin.component';

describe('AgregarProductoAdminComponent', () => {
  let component: AgregarProductoAdminComponent;
  let fixture: ComponentFixture<AgregarProductoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProductoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
