import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { DialogConfig } from '../../models/dialog/dialog-config.interface'
import { DialogSize } from '../../models/dialog/dialog-size.enum'

import { DialogAddAttachmentsComponent } from './dialog-add-attachments.component'

describe('DialogAddAttachmentsComponent', () => {
  let component: DialogAddAttachmentsComponent
  let fixture: ComponentFixture<DialogAddAttachmentsComponent>

  const dialogStubData = {
    dialogContentComponent: DialogAddAttachmentsComponent,
    dialogSize: DialogSize.Medium,
    title: 'Add attachment',
  } as DialogConfig

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddAttachmentsComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogStubData,
        },
      ],
      imports: [
        CommonModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DialogAddAttachmentsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
