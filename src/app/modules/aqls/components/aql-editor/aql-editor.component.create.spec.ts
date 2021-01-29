import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { AqlEditorUiModel } from 'src/app/shared/models/aql/aql-editor-ui.model'
import { IAqlResolved } from '../../models/aql-resolved.interface'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from 'src/app/core/auth/auth.service'

import { AqlEditorComponent } from './aql-editor.component'
import { of, Subject } from 'rxjs'
import { mockAql1 } from '../../../../../mocks/data-mocks/aqls.mock'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'

describe('AqlEditorComponent', () => {
  let component: AqlEditorComponent
  let fixture: ComponentFixture<AqlEditorComponent>

  let router: Router

  const userInfoSubject$ = new Subject<IAuthUserInfo>()
  const authService = {
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const resolvedData: IAqlResolved = { aql: new AqlEditorUiModel(), error: null }
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

  const aqlService = ({
    save: jest.fn(),
    update: jest.fn(),
  } as unknown) as AqlService

  @Component({ selector: 'num-aql-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
  }

  @Component({ selector: 'num-aql-editor-creator', template: '' })
  class StubEditorCreatorComponent {
    @Input() aqlQuery: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AqlEditorComponent,
        StubGeneralInfoComponent,
        StubEditorCreatorComponent,
        ButtonComponent,
      ],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: AqlService,
          useValue: aqlService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(AqlEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(router, 'navigate').mockImplementation()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When in Create mode', () => {
    it('should set isEditMode to false', () => {
      expect(component.isEditMode).toBeFalsy()
    })

    it('should set isCurrentUserOwner to false', () => {
      expect(component.isCurrentUserOwner).toBeFalsy()
    })

    it('should have edit buttons hidden', () => {
      const nativeElement = fixture.debugElement.nativeElement
      const element = nativeElement.querySelector('.editmode-on')
      expect(element).toBeFalsy()
    })
  })

  describe('On the attempt to save the AQL', () => {
    beforeEach(() => {
      const mockAqlObservable = of(mockAql1)
      jest.spyOn(aqlService, 'save').mockImplementation(() => mockAqlObservable)
      component.resolvedData = {
        error: null,
        aql: new AqlEditorUiModel(mockAql1),
      }
    })

    it('should call the AQL save method', async (done) => {
      component.save().then(() => {
        expect(aqlService.save).toHaveBeenCalledTimes(1)
        done()
      })
    })
  })

  describe('On the attempt to update the AQL', () => {
    beforeEach(() => {
      const mockAqlObservable = of(mockAql1)
      jest.spyOn(aqlService, 'update').mockImplementation(() => mockAqlObservable)
    })

    it('should call the AQL update method', async () => {
      component.update().then(() => {
        expect(aqlService.update).toHaveBeenCalledTimes(1)
      })
    })
  })
})
