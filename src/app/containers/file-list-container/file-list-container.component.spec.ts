import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListContainerComponent } from './file-list-container.component';

describe('FileListContainerComponent', () => {
  let component: FileListContainerComponent;
  let fixture: ComponentFixture<FileListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
