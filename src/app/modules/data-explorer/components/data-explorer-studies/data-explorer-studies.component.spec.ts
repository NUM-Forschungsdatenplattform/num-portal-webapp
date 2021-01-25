import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { StudyService } from 'src/app/core/services/study/study.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { DataExplorerStudiesComponent } from './data-explorer-studies.component'

describe('DataExplorerStudiesComponent', () => {
  let component: DataExplorerStudiesComponent
  let fixture: ComponentFixture<DataExplorerStudiesComponent>

  @Component({ selector: 'num-data-explorer-studies-table', template: '' })
  class DataExplorerStudiesTableStubComponent {}

  const studyService = ({
    getAll: () => of(),
  } as unknown) as StudyService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExplorerStudiesComponent, DataExplorerStudiesTableStubComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: StudyService,
          useValue: studyService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExplorerStudiesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
