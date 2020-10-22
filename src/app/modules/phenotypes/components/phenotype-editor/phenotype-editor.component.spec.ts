import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenotypeEditorComponent } from './phenotype-editor.component';

describe('PhenotypeEditorComponent', () => {
  let component: PhenotypeEditorComponent;
  let fixture: ComponentFixture<PhenotypeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenotypeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
