import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenotypeEditorConnectorGroupComponent } from './phenotype-editor-connector-group.component';

describe('PhenotypeEditorConnectorGroupComponent', () => {
  let component: PhenotypeEditorConnectorGroupComponent;
  let fixture: ComponentFixture<PhenotypeEditorConnectorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenotypeEditorConnectorGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorConnectorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
