import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'

import { WelcomePageEditorComponent } from './welcome-page-editor.component'

describe('WelcomePageEditorComponent', () => {
  let component: WelcomePageEditorComponent
  let fixture: ComponentFixture<WelcomePageEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomePageEditorComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
