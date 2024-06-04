import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { mockAql3 } from 'src/mocks/data-mocks/aqls.mock'
import { DialogAqlInfoComponent } from './dialog-aql-info.component'

describe('DialogAqlInfoComponent', () => {
  let component: DialogAqlInfoComponent
  let fixture: ComponentFixture<DialogAqlInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAqlInfoComponent],
      imports: [MaterialModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAqlInfoComponent)
    component = fixture.componentInstance
    component.dialogInput = new AqlUiModel(mockAql3)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the input aql contains parameters', () => {
    beforeEach(() => {
      component.dialogInput = new AqlUiModel(mockAql3)
      fixture.detectChanges()
    })
    it('should provide the highlighted query string with markup', () => {
      expect(component.queryHighlighted).toContain('<span class="mark--name">')
      expect(component.queryHighlighted).toContain('<span class="mark--operator">')
    })
  })

  describe('When the confirm handler is triggered', () => {
    it('should emit closing of the dialog', () => {
      jest.spyOn(component.closeDialog, 'emit')
      component.handleDialogConfirm()
      expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the cancle handler is triggered', () => {
    it('should emit closing of the dialog', () => {
      jest.spyOn(component.closeDialog, 'emit')
      component.handleDialogCancel()
      expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
    })
  })
})
