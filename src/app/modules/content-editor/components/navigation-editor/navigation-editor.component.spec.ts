import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'

import { NavigationEditorComponent } from './navigation-editor.component'

describe('NavigationEditorComponent', () => {
  let component: NavigationEditorComponent
  let fixture: ComponentFixture<NavigationEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationEditorComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
