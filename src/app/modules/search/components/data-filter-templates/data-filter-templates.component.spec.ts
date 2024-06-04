import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { LayoutModule } from 'src/app/layout/layout.module'
import { IProjectTemplateInfoApi } from 'src/app/shared/models/project/project-template-info-api.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { SharedModule } from 'src/app/shared/shared.module'

import { DataFilterTemplatesComponent } from './data-filter-templates.component'

describe('DataFilterTemplatesComponent', () => {
  let component: DataFilterTemplatesComponent
  let fixture: ComponentFixture<DataFilterTemplatesComponent>

  const afterClosedSubject$ = new Subject<IProjectTemplateInfoApi[] | undefined>()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  @Component({
    selector: 'num-add-templates',
    template: '',
  })
  class AddTemplatesStubComponent {
    @Input() project: ProjectUiModel
    @Input() isDisabled: boolean
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFilterTemplatesComponent, AddTemplatesStubComponent],
      imports: [
        NoopAnimationsModule,
        FontAwesomeModule,
        LayoutModule,
        SharedModule,
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: DialogService, useValue: mockDialogService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFilterTemplatesComponent)
    component = fixture.componentInstance
    component.project = new ProjectUiModel()

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
