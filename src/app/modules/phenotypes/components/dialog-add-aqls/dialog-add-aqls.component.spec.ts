import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAqlsComponent } from './dialog-add-aqls.component';

describe('DialogAddAqlsComponent', () => {
  let component: DialogAddAqlsComponent;
  let fixture: ComponentFixture<DialogAddAqlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddAqlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAqlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
