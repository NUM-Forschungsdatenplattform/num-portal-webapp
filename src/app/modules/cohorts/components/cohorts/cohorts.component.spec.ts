import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortsComponent } from './cohorts.component';

describe('CohortsComponent', () => {
  let component: CohortsComponent;
  let fixture: ComponentFixture<CohortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CohortsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
