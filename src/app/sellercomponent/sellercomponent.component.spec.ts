import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellercomponentComponent } from './sellercomponent.component';

describe('SellercomponentComponent', () => {
  let component: SellercomponentComponent;
  let fixture: ComponentFixture<SellercomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellercomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
