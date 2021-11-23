import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCompraUserComponent } from './item-compra-user.component';

describe('ItemCompraUserComponent', () => {
  let component: ItemCompraUserComponent;
  let fixture: ComponentFixture<ItemCompraUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCompraUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCompraUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
