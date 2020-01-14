import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyEnterComponent } from './easy-enter.component';

describe('EasyEnterComponent', () => {
  let component: EasyEnterComponent;
  let fixture: ComponentFixture<EasyEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
