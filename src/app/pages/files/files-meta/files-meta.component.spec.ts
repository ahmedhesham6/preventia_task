import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMetaComponent } from './files-meta.component';

describe('FileMetaComponent', () => {
  let component: FileMetaComponent;
  let fixture: ComponentFixture<FileMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileMetaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
