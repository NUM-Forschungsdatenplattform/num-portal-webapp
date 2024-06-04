import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { DialogEditCategoryDetailsComponent } from './dialog-edit-category-details.component'

describe('DialogEditCategoryDetailsComponent', () => {
  let component: DialogEditCategoryDetailsComponent
  let fixture: ComponentFixture<DialogEditCategoryDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditCategoryDetailsComponent],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditCategoryDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When creating a new category', () => {
    beforeEach(() => {
      component.ngOnInit()
      jest.spyOn(component.closeDialog, 'emit')
    })

    it('should set empty strings as default values', () => {
      expect(component.categoryForm.get('nameDe').value).toBe('')
      expect(component.categoryForm.get('nameEn').value).toBe('')
    })

    it('should emit the new entered values to close handler', () => {
      component.categoryForm.setValue({ nameDe: 'Neue Kategorie', nameEn: 'New Category' })
      component.handleDialogConfirm()
      expect(component.closeDialog.emit).toHaveBeenCalledWith({
        name: {
          de: 'Neue Kategorie',
          en: 'New Category',
        },
      })
    })

    it('should not emit a value if an input field is invalid', () => {
      component.categoryForm.patchValue({ nameDe: 'Test Category' })
      component.handleDialogConfirm()
      expect(component.categoryForm.get('nameEn').invalid).toBe(true)
      expect(component.closeDialog.emit).not.toHaveBeenCalled()
    })
  })

  describe('When updating an existing category', () => {
    beforeEach(() => {
      jest.spyOn(component.closeDialog, 'emit')
      component.dialogInput = {
        aqlCategory: {
          name: {
            de: 'Alter Name',
            en: 'Old name',
          },
        },
      }
      component.ngOnInit()
    })

    it('should emit the new values on confirm', () => {
      component.categoryForm.patchValue({ nameDe: 'Neuer Name' })
      component.handleDialogConfirm()
      expect(component.closeDialog.emit).toHaveBeenCalledWith({
        name: {
          de: 'Neuer Name',
          en: 'Old name',
        },
      })
    })

    it('Should not emit if an input field is invalid', () => {
      component.categoryForm.patchValue({ nameDe: '' })
      component.handleDialogConfirm()
      expect(component.closeDialog.emit).not.toHaveBeenCalled()
    })
  })

  describe('When canceling the dialog', () => {
    beforeEach(() => {
      component.ngOnInit()
      component.categoryForm.setValue({
        nameDe: 'Test Kategorie',
        nameEn: 'Test Category',
      })
      jest.spyOn(component.closeDialog, 'emit')
    })

    it('should emit with empty value', () => {
      component.handleDialogCancel()
      expect(component.closeDialog.emit).toHaveBeenCalledWith()
    })
  })
})
