import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleListContainerComponent } from './sale-list-container.component';

describe('SaleListContainerComponent', () => {
  let component: SaleListContainerComponent;
  let fixture: ComponentFixture<SaleListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
