import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenotypeAqlConnectorComponent } from './phenotype-aql-connector.component';

describe('PhenotypeAqlConnectorComponent', () => {
  let component: PhenotypeAqlConnectorComponent;
  let fixture: ComponentFixture<PhenotypeAqlConnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenotypeAqlConnectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeAqlConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
