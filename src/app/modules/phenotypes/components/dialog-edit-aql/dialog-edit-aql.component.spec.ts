import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAqlComponent } from './dialog-edit-aql.component';

describe('DialogEditAqlComponent', () => {
  let component: DialogEditAqlComponent;
  let fixture: ComponentFixture<DialogEditAqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditAqlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditAqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
