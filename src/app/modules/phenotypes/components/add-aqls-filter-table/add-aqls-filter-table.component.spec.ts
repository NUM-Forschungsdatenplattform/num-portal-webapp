import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAqlsFilterTableComponent } from './add-aqls-filter-table.component';

describe('AddAqlsFilterTableComponent', () => {
  let component: AddAqlsFilterTableComponent;
  let fixture: ComponentFixture<AddAqlsFilterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAqlsFilterTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAqlsFilterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
