import { Component, Injector, Input } from '@angular/core'
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { Observable, of } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ChartsComponent } from './charts.component'

let translations: any = { CARDS_TITLE: 'This is a test' }

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations)
  }
}

describe('ChartsComponent', () => {
  let component: ChartsComponent
  let fixture: ComponentFixture<ChartsComponent>
  let translate: TranslateService
  let injector: Injector

  const aqlService = ({
    getSofaScoreAverage: () => of({ data: [1, 2, 3], labels: ['0-4', '5-9', '10-14'] }),
    getSofaScoreGrouped: () => of({ data: [1, 2], lables: ['MHH', 'UMG'] }),
    getClinics: () => of(['MHH', 'UMG']),
  } as unknown) as AqlService

  @Component({ selector: 'num-bar-chart', template: '' })
  class BarChartStubComponent {
    @Input() chartData: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartsComponent, BarChartStubComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
        BrowserAnimationsModule,
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
    injector = getTestBed()
    translate = injector.get(TranslateService)
    fixture = TestBed.createComponent(ChartsComponent)
    component = fixture.componentInstance

    fixture.detectChanges()

    jest.spyOn(aqlService, 'getClinics')
    jest.spyOn(aqlService, 'getSofaScoreGrouped')
    jest.spyOn(aqlService, 'getSofaScoreAverage')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On init', () => {
    it('should call getSofaScoreAverage and getSofaScoreGrouped', () => {
      expect(aqlService.getSofaScoreAverage).toHaveBeenCalledTimes(1)
      expect(aqlService.getSofaScoreGrouped).toHaveBeenCalledTimes(1)
    })
    it('should set the chartSofaScore and chartSofaScoreAvg data and labels', () => {
      expect(component.chartSofaScore.data).toHaveLength(2)
      expect(component.chartSofaScoreAvg.data).toHaveLength(3)
    })
  })

  describe('On language change', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      translate.use('en')
      fixture.detectChanges()
    })

    it('should call the getSofaScoreAverage and getSofaScoreGrouped', () => {
      expect(aqlService.getSofaScoreAverage).toHaveBeenCalledTimes(1)
      expect(aqlService.getSofaScoreGrouped).toHaveBeenCalledTimes(1)
    })
  })
  describe('When a clinic is selected', () => {
    beforeEach(() => {
      component.selectedClinic = 'MHH'
      component.handleSelectClick()
    })

    it('should call the getSofaScoreGrouped with the selected clinic', () => {
      expect(aqlService.getSofaScoreGrouped).toHaveBeenCalledWith('MHH')
    })
  })
})
