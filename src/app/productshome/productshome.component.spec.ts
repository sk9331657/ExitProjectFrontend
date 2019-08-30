import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductshomeComponent } from './productshome.component';

describe('ProductshomeComponent', () => {
  let component: ProductshomeComponent;
  let fixture: ComponentFixture<ProductshomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductshomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
