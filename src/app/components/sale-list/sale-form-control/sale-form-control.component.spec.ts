import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleFormControlComponent } from './sale-form-control.component';

describe('SaleFormControlComponent', () => {
  let component: SaleFormControlComponent;
  let fixture: ComponentFixture<SaleFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
