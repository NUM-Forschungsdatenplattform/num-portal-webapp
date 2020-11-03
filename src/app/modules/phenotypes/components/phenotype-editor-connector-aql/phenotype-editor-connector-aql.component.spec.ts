import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenotypeEditorConnectorAqlComponent } from './phenotype-editor-connector-aql.component';

describe('PhenotypeEditorConnectorAqlComponent', () => {
  let component: PhenotypeEditorConnectorAqlComponent;
  let fixture: ComponentFixture<PhenotypeEditorConnectorAqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenotypeEditorConnectorAqlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorConnectorAqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
