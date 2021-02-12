import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditorDetermineHitsComponent } from './editor-determine-hits.component'

import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('EditorDetermineHitsComponent', () => {
  let component: EditorDetermineHitsComponent
  let fixture: ComponentFixture<EditorDetermineHitsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorDetermineHitsComponent, ButtonComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDetermineHitsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('click on Determine Hits', () => {
    it('should emit the click event', () => {
      jest.spyOn(component.determineHitsClicked, 'emit')
      component.determineHits()
      expect(component.determineHitsClicked.emit).toHaveBeenCalledTimes(1)
    })
  })
})
