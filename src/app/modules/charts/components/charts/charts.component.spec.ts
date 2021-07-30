/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Injector, Input } from '@angular/core'
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { Observable, of, throwError } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ChartsComponent } from './charts.component'

const translations: any = { CARDS_TITLE: 'This is a test' }

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

  const contentService = {
    getSofaScoreAverage: () => of(),
    getSofaScoreDistribution: () => of(),
    getClinics: () => of(),
  } as unknown as ContentService

  const mockSofaAvg = { clinic1: 5.0, clinic2: 6.0, clinic3: 2.3567 }
  const mockSofaDist = { '0-4': 3, '5-9': 1, '10-14': 6, '15-19': 2, '20-24': 0 }
  const mockClinics = ['clinic1', 'clinic2']

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
          provide: ContentService,
          useValue: contentService,
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

    jest.spyOn(contentService, 'getClinics').mockImplementation(() => of(mockClinics))
    jest.spyOn(contentService, 'getSofaScoreDistribution').mockImplementation(() => of())
    jest.spyOn(contentService, 'getSofaScoreAverage').mockImplementation(() => of())
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On init', () => {
    beforeEach(() => {
      jest
        .spyOn(contentService, 'getSofaScoreDistribution')
        .mockImplementation(() => of(mockSofaDist))
      jest.spyOn(contentService, 'getSofaScoreAverage').mockImplementation(() => of(mockSofaAvg))
    })
    it('should call getSofaScoreAverage and getSofaScoreDistribution', () => {
      expect(contentService.getSofaScoreAverage).toHaveBeenCalledTimes(1)
      expect(contentService.getSofaScoreDistribution).toHaveBeenCalledTimes(1)
    })
    it('should set the chartSofaScore and chartSofaScoreAvg data and labels', () => {
      expect(component.chartSofaScore.data).toHaveLength(5)
      expect(component.chartSofaScoreAvg.data).toHaveLength(3)
    })
  })

  describe('On language change', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      translate.use('en')
      fixture.detectChanges()
    })

    it('should call the getSofaScoreAverage and getSofaScoreDistribution', () => {
      expect(contentService.getSofaScoreAverage).toHaveBeenCalledTimes(1)
      expect(contentService.getSofaScoreDistribution).toHaveBeenCalledTimes(1)
    })
  })

  describe('When a clinic is selected', () => {
    beforeEach(() => {
      component.selectedClinic = 'MHH'
      component.handleSelectClick()
    })

    it('should call the getSofaScoreDistribution with the selected clinic', () => {
      expect(contentService.getSofaScoreDistribution).toHaveBeenCalledWith('MHH')
    })
  })

  describe('When getSofaScoreAverage throws an error', () => {
    beforeEach(() => {
      jest
        .spyOn(contentService, 'getSofaScoreAverage')
        .mockImplementation(() => throwError('Error'))
      component.getSofaScoreAverage()
    })

    it('should set chartSofaScoreAvg data empty', () => {
      expect(component.chartSofaScoreAvg.data).toHaveLength(0)
    })
  })

  describe('When getSofaScoreDistribution throws an error', () => {
    beforeEach(() => {
      jest
        .spyOn(contentService, 'getSofaScoreDistribution')
        .mockImplementation(() => throwError('Error'))
      component.getSofaScoreDistribution()
    })

    it('should set chartSofaScore data to be empty', () => {
      expect(component.chartSofaScore.data).toHaveLength(0)
    })
  })
})
