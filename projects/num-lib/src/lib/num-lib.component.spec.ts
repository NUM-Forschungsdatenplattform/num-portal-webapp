import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumLibComponent } from './num-lib.component';

describe('NumLibComponent', () => {
  let component: NumLibComponent;
  let fixture: ComponentFixture<NumLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
