import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { resultSetMock } from 'src/mocks/data-mocks/result-set-mock'
import { ResultTableComponent } from './result-table.component'

describe('ResultTableComponent', () => {
  let component: ResultTableComponent
  let fixture: ComponentFixture<ResultTableComponent>

  const aqlService = ({
    getResultSet: () => of(resultSetMock),
  } as unknown) as AqlService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultTableComponent, ButtonComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        PipesModule,
        FontAwesomeTestingModule,
      ],
      providers: [
        {
          provide: AqlService,
          useValue: aqlService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(ResultTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the get records button is clicked', () => {
    let getRecordsButton
    beforeEach(() => {
      const nativeElement = fixture.debugElement.nativeElement
      getRecordsButton = nativeElement.querySelector('#get-records-button')
      component = fixture.componentInstance
      fixture.detectChanges()
    })
    it('should set the result set as table data source', () => {
      getRecordsButton.querySelector('button').click()
      // TO DO: Add more tests
    })
  })
})
