import { Component, Input, SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { DialogService } from 'src/app/core/services/dialog.service'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'
import { GroupIndexPipe } from 'src/app/shared/pipes/group-index.pipe'
import {
  mockPhenotype1,
  mockPhenotype2,
  mockPhenotype3,
  mockPhenotype4,
} from 'src/mocks/data-mocks/phenotypes.mock'
import { DialogAddPhenotypesComponent } from '../dialog-add-phenotypes/dialog-add-phenotypes.component'
import { DialogEditPhenotypeComponent } from '../dialog-edit-phenotype/dialog-edit-phenotype.component'
import { ADD_DIALOG_CONFIG, EDIT_DIALOG_CONFIG } from './constants'
import { StudyEditorConnectorGroupComponent } from './study-editor-connector-group.component'

describe('StudyEditorConnectorGroupComponent', () => {
  let component: StudyEditorConnectorGroupComponent
  let fixture: ComponentFixture<StudyEditorConnectorGroupComponent>

  let dialogCallParameter: DialogConfig
  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((callParameter: any) => {
      dialogCallParameter = callParameter
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  // const openDialogMock = mockDialogService.openDialog as jest.Mock<any, any>
  // const openDialogMockCalls = openDialogMock.mock.calls

  @Component({ selector: 'num-study-editor-connector-phenotype', template: '' })
  class PhenotypeStubComponent {
    @Input() phenotype: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StudyEditorConnectorGroupComponent,
        PhenotypeStubComponent,
        GroupIndexPipe,
        ButtonComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
      ],
      providers: [{ provide: DialogService, useValue: mockDialogService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorConnectorGroupComponent)
    component = fixture.componentInstance
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  describe('When the group components gets initialised with a cohortGroup', () => {
    it('should be the main group if indexInGroup is not specified', () => {
      component.cohortGroup = new CohortGroupUiModel()
      fixture.detectChanges()
      expect(component.groupType).toEqual(ConnectorGroupType.Main)
    })

    it('should not be a sub group if indexInGroup is specified', () => {
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.indexInGroup = 1
      fixture.detectChanges()
      expect(component.groupType).toEqual(ConnectorGroupType.Sub)
    })
  })

  describe('When input values are changed', () => {
    const case1 = {
      parentGroupIndex: null,
      indexInGroup: 1,
      expectedResult: [1],
    }
    const case2 = {
      parentGroupIndex: [1, 2, 3],
      indexInGroup: 1,
      expectedResult: [1, 2, 3, 1],
    }

    const case3 = {
      parentGroupIndex: null,
      indexInGroup: null,
      expectedResult: [],
    }
    test.each([case1, case2, case3])('should reevaluate the groupIndex', (testcase) => {
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.indexInGroup = testcase.indexInGroup
      component.parentGroupIndex = testcase.parentGroupIndex

      const change = new SimpleChange(undefined, component.parentGroupIndex, false)
      component.ngOnChanges({ parentGroupIndex: change })
      fixture.detectChanges()

      expect(component.groupIndex).toEqual(testcase.expectedResult)
    })
  })

  describe('When a query is supposed to be edited', () => {
    const dialogConfig: DialogConfig = {
      ...EDIT_DIALOG_CONFIG,
      dialogContentComponent: DialogEditPhenotypeComponent,
      dialogContentPayload: new PhenotypeUiModel(mockPhenotype1),
    }
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.children = [
        new PhenotypeUiModel(mockPhenotype1),
        new PhenotypeUiModel(mockPhenotype2),
      ]
      fixture.detectChanges()
    })

    it('should call the dialog service with the dialogConfig to open the edit dialog', () => {
      component.editPhenotype(0)

      expect(mockDialogService.openDialog).toHaveBeenCalledTimes(1)
      expect(dialogCallParameter.dialogContentComponent).toEqual(DialogEditPhenotypeComponent)
      expect(dialogCallParameter.dialogContentPayload).toBeInstanceOf(PhenotypeUiModel)
      expect(dialogCallParameter.dialogContentPayload.id).toEqual(mockPhenotype1.id)
    })

    it('should replace the edited phenotype in the list if its submitted in the afterClosed event', () => {
      const editedPhenotype = new PhenotypeUiModel(mockPhenotype1)
      editedPhenotype.id = 123
      component.editPhenotype(0)
      afterClosedSubject$.next(editedPhenotype)

      expect(mockDialogService.openDialog).toHaveBeenCalledTimes(1)
      expect(component.cohortGroup.children[0]).toEqual(editedPhenotype)
    })

    it('should delete the edited phenotype from the list when the confirmResult is false', () => {
      component.editPhenotype(0)
      afterClosedSubject$.next(false)
      expect(mockDialogService.openDialog).toHaveBeenCalledTimes(1)
      expect(component.cohortGroup.children[0]).not.toEqual(new PhenotypeUiModel(mockPhenotype1))
    })

    it('should ignore unknown confirmResults', () => {
      component.editPhenotype(0)
      afterClosedSubject$.next(true)
      expect(mockDialogService.openDialog).toHaveBeenCalledTimes(1)

      const firstCohortChild = component.cohortGroup.children[0] as PhenotypeUiModel
      expect(firstCohortChild).toBeInstanceOf(PhenotypeUiModel)
      expect(firstCohortChild.id).toEqual(mockPhenotype1.id)
    })
  })

  describe('When phenotypes are supposed to be added to the group', () => {
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddPhenotypesComponent,
      dialogContentPayload: [
        new PhenotypeUiModel(mockPhenotype1),
        new PhenotypeUiModel(mockPhenotype2),
      ],
    }
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.children = [
        new CohortGroupUiModel(),
        new PhenotypeUiModel(mockPhenotype1),
        new CohortGroupUiModel(),
        new PhenotypeUiModel(mockPhenotype2),
        new CohortGroupUiModel(),
      ]
      fixture.detectChanges()
    })

    it('should open the dialog with the config including existing phenotypes in the group', () => {
      component.addPhenotype()
      expect(mockDialogService.openDialog).toHaveBeenCalledTimes(1)
      expect(dialogCallParameter.dialogContentComponent).toEqual(
        dialogConfig.dialogContentComponent
      )
      expect(dialogCallParameter.dialogContentPayload.length).toEqual(2)
      expect(dialogCallParameter.dialogContentPayload[0].id).toEqual(mockPhenotype1.id)
      expect(dialogCallParameter.dialogContentPayload[1].id).toEqual(mockPhenotype2.id)
    })

    it('should set the selected phenotypes to the groups', () => {
      const selectedPhenotypes = [
        new PhenotypeUiModel(mockPhenotype3),
        new PhenotypeUiModel(mockPhenotype4),
      ]
      component.addPhenotype()
      afterClosedSubject$.next(selectedPhenotypes)
      expect((component.cohortGroup.children[0] as PhenotypeUiModel).id).toEqual(
        selectedPhenotypes[0].id
      )
      expect((component.cohortGroup.children[1] as PhenotypeUiModel).id).toEqual(
        selectedPhenotypes[1].id
      )
    })

    it('should ignore the confirmResult if its not an array', () => {
      component.addPhenotype()
      afterClosedSubject$.next(false)
      expect(component.cohortGroup.children[0]).toBeInstanceOf(CohortGroupUiModel)
      expect(component.cohortGroup.children[1]).toBeInstanceOf(PhenotypeUiModel)
      expect(component.cohortGroup.children.length).toEqual(5)
    })
  })

  describe('When a new group is supposed to be added', () => {
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.children = [
        new CohortGroupUiModel(),
        new PhenotypeUiModel(mockPhenotype1),
        new CohortGroupUiModel(),
        new PhenotypeUiModel(mockPhenotype2),
      ]
      fixture.detectChanges()
    })

    it('should add the new group to the children', () => {
      component.addGroup()
      expect(component.cohortGroup.children.length).toEqual(5)
    })

    it('should enumerate the groups again', () => {
      component.addGroup()
      const children = component.cohortGroup.children
      const lastItem = children[children.length - 1] as CohortGroupUiModel
      expect(lastItem.indexInGroup).toEqual(3)
    })
  })

  describe('When a group is supposed to be deleted', () => {
    beforeEach(() => {
      jest.spyOn(component.delete, 'emit').mockImplementation()
      component.cohortGroup = new CohortGroupUiModel()
      component.index = 123
      fixture.detectChanges()
    })

    it('should emit its index to the parent group', () => {
      component.deleteSelf()
      expect(component.delete.emit).toHaveBeenCalledWith(123)
    })
  })

  describe('When an item in the group gets deleted', () => {
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.children = [
        new CohortGroupUiModel(),
        new PhenotypeUiModel(mockPhenotype1),
        new CohortGroupUiModel(),
        new PhenotypeUiModel(mockPhenotype2),
      ]
      fixture.detectChanges()
    })

    it('should enumerate the groups again', () => {
      component.deleteChild(0)
      const firstGroupAfterDeletion = component.cohortGroup.children[1] as CohortGroupUiModel
      expect(component.cohortGroup.children.length).toEqual(3)
      expect(component.cohortGroup.children[0]).toBeInstanceOf(PhenotypeUiModel)
      expect(firstGroupAfterDeletion.indexInGroup).toEqual(1)
    })
  })
})
