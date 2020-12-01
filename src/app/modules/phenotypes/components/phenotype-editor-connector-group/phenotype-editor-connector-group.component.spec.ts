import { Component, Input, SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { DialogService } from 'src/app/core/services/dialog.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { PhenotypeGroupUiModel } from 'src/app/shared/models/phenotype/phenotype-group-ui.model'
import { GroupIndexPipe } from 'src/app/shared/pipes/group-index.pipe'
import { mockAql1, mockAql2, mockAql3, mockAql4 } from 'src/mocks/data-mocks/aqls.mock'
import { DialogAddAqlsComponent } from '../dialog-add-aqls/dialog-add-aqls.component'
import { DialogEditAqlComponent } from '../dialog-edit-aql/dialog-edit-aql.component'
import { ADD_DIALOG_CONFIG, EDIT_DIALOG_CONFIG } from './constants'

import { PhenotypeEditorConnectorGroupComponent } from './phenotype-editor-connector-group.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

describe('PhenotypeEditorConnectorGroupComponent', () => {
  let component: PhenotypeEditorConnectorGroupComponent
  let fixture: ComponentFixture<PhenotypeEditorConnectorGroupComponent>

  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService
  @Component({ selector: 'num-phenotype-editor-connector-aql', template: '' })
  class AqlStubComponent {
    @Input() phenotypeAql: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PhenotypeEditorConnectorGroupComponent,
        AqlStubComponent,
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
    fixture = TestBed.createComponent(PhenotypeEditorConnectorGroupComponent)
    component = fixture.componentInstance
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  describe('When the group components gets initialised with a phenotypeGroup', () => {
    it('should be the main group if indexInGroup is not specified', () => {
      component.phenotypeGroup = new PhenotypeGroupUiModel()
      fixture.detectChanges()
      expect(component.groupType).toEqual(ConnectorGroupType.Main)
    })

    it('should not be a sub group if indexInGroup is specified', () => {
      component.phenotypeGroup = new PhenotypeGroupUiModel()
      component.phenotypeGroup.indexInGroup = 1
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
      component.phenotypeGroup = new PhenotypeGroupUiModel()
      component.phenotypeGroup.indexInGroup = testcase.indexInGroup
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
      dialogContentComponent: DialogEditAqlComponent,
      dialogContentPayload: new AqlUiModel(mockAql1),
    }
    beforeEach(() => {
      component.phenotypeGroup = new PhenotypeGroupUiModel()
      component.phenotypeGroup.children = [new AqlUiModel(mockAql1), new AqlUiModel(mockAql2)]
      fixture.detectChanges()
    })
    it('should call the dialog service with the dialogConfig to open the edit dialog', () => {
      component.editQuery(0)
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })

    it('should replace the edited aql in the list if its submitted in the afterClosed event', () => {
      const editedAql = new AqlUiModel(mockAql1)
      editedAql.id = 123
      component.editQuery(0)
      afterClosedSubject$.next(editedAql)
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
      expect(component.phenotypeGroup.children[0]).toEqual(editedAql)
    })

    it('should delete the edited aql from the list when the confirmResult is false', () => {
      component.editQuery(0)
      afterClosedSubject$.next(false)
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
      expect(component.phenotypeGroup.children[0]).not.toEqual(new AqlUiModel(mockAql1))
    })

    it('should ignore unknown confirmResults', () => {
      component.editQuery(0)
      afterClosedSubject$.next(true)
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
      expect(component.phenotypeGroup.children[0]).toEqual(new AqlUiModel(mockAql1))
    })
  })

  describe('When queries are supposed to be added to the group', () => {
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddAqlsComponent,
      dialogContentPayload: [new AqlUiModel(mockAql1), new AqlUiModel(mockAql2)],
    }
    beforeEach(() => {
      component.phenotypeGroup = new PhenotypeGroupUiModel()
      component.phenotypeGroup.children = [
        new PhenotypeGroupUiModel(),
        new AqlUiModel(mockAql1),
        new PhenotypeGroupUiModel(),
        new AqlUiModel(mockAql2),
        new PhenotypeGroupUiModel(),
      ]
      fixture.detectChanges()
    })

    it('should open the dialog with the config including existing aqls in the group', () => {
      component.addQuery()
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })

    it('should set the selected aqls to the groups', () => {
      const selectedAqls = [new AqlUiModel(mockAql3), new AqlUiModel(mockAql4)]
      component.addQuery()
      afterClosedSubject$.next(selectedAqls)
      expect(component.phenotypeGroup.children[0]).toEqual(selectedAqls[0])
      expect(component.phenotypeGroup.children[1]).toEqual(selectedAqls[1])
    })

    it('should ignore the confirmResult if its not an array', () => {
      component.addQuery()
      afterClosedSubject$.next(false)
      expect(component.phenotypeGroup.children[0]).toBeInstanceOf(PhenotypeGroupUiModel)
      expect(component.phenotypeGroup.children[1]).toBeInstanceOf(AqlUiModel)
      expect(component.phenotypeGroup.children.length).toEqual(5)
    })
  })

  describe('When a new group is supposed to be added', () => {
    beforeEach(() => {
      component.phenotypeGroup = new PhenotypeGroupUiModel()
      component.phenotypeGroup.children = [
        new PhenotypeGroupUiModel(),
        new AqlUiModel(mockAql1),
        new PhenotypeGroupUiModel(),
        new AqlUiModel(mockAql2),
      ]
      fixture.detectChanges()
    })

    it('should add the new group to the children', () => {
      component.addGroup()
      expect(component.phenotypeGroup.children.length).toEqual(5)
    })

    it('should enumerate the groups again', () => {
      component.addGroup()
      const children = component.phenotypeGroup.children
      const lastItem = children[children.length - 1] as PhenotypeGroupUiModel
      expect(lastItem.indexInGroup).toEqual(3)
    })
  })

  describe('When a group is supposed to be deleted', () => {
    beforeEach(() => {
      jest.spyOn(component.delete, 'emit').mockImplementation()
      component.phenotypeGroup = new PhenotypeGroupUiModel()
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
      component.phenotypeGroup = new PhenotypeGroupUiModel()
      component.phenotypeGroup.children = [
        new PhenotypeGroupUiModel(),
        new AqlUiModel(mockAql1),
        new PhenotypeGroupUiModel(),
        new AqlUiModel(mockAql2),
      ]
      fixture.detectChanges()
    })

    it('should enumerate the groups again', () => {
      component.deleteChild(0)
      const firstGroupAfterDeletion = component.phenotypeGroup.children[1] as PhenotypeGroupUiModel
      expect(component.phenotypeGroup.children.length).toEqual(3)
      expect(component.phenotypeGroup.children[0]).toBeInstanceOf(AqlUiModel)
      expect(firstGroupAfterDeletion.indexInGroup).toEqual(1)
    })
  })
})
