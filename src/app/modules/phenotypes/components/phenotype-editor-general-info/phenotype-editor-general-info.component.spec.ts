import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenotypeGeneralInfoComponent } from './phenotype-editor-general-info.component';

describe('PhenotypeGeneralInfoComponent', () => {
  let component: PhenotypeGeneralInfoComponent;
  let fixture: ComponentFixture<PhenotypeGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenotypeGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
