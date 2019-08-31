import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashboardproductsComponent } from './admindashboardproducts.component';

describe('AdmindashboardproductsComponent', () => {
  let component: AdmindashboardproductsComponent;
  let fixture: ComponentFixture<AdmindashboardproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindashboardproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashboardproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
