import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { ResultTableComponent } from './result-table.component'

describe('ResultTableComponent', () => {
  let component: ResultTableComponent
  let fixture: ComponentFixture<ResultTableComponent>

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
      providers: [],
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
})
