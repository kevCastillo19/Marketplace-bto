import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiBolsaUserComponent } from './mi-bolsa-user.component';

describe('MiBolsaUserComponent', () => {
  let component: MiBolsaUserComponent;
  let fixture: ComponentFixture<MiBolsaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiBolsaUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiBolsaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
