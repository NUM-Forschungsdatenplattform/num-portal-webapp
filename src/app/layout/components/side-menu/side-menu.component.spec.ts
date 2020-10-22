import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { SideMenuComponent } from './side-menu.component';
import { MaterialModule } from '../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    jest.spyOn(component.toggleSideMenu, 'emit');
    component.mainNavItems = [
      {
        icon: 'test',
        routeTo: '/test',
        translationKey: 'test'
      }
    ];
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.nativeElement;
    const button = nativeElement.querySelector('.menu-item');
    button.click();
    expect(component.toggleSideMenu.emit).toHaveBeenCalled();
  });
});
