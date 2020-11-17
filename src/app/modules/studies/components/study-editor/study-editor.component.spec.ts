import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyEditorComponent } from './study-editor.component';

describe('StudyEditorComponent', () => {
  let component: StudyEditorComponent;
  let fixture: ComponentFixture<StudyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
