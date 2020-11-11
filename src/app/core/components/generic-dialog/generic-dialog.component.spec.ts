import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Output,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'
import { GenericDialogComponent } from './generic-dialog.component'
import { of } from 'rxjs'

describe('GenericDialogComponent', () => {
  let component: GenericDialogComponent
  let fixture: ComponentFixture<GenericDialogComponent>

  @Component({ selector: 'num-test-component', template: '' })
  class StubComponent {
    @Output() closeDialog = new EventEmitter()
  }

  const dialogConfig: DialogConfig = {
    title: 'Test',
    dialogSize: DialogSize.Medium,
    dialogContentComponent: StubComponent,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericDialogComponent, StubComponent],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        ChangeDetectorRef,
        { provide: MAT_DIALOG_DATA, useValue: dialogConfig },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [StubComponent],
      },
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
