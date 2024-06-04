import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

import { NavigationEditorItemComponent } from './navigation-editor-item.component'

describe('NavigationEditorItemComponent', () => {
  let component: NavigationEditorItemComponent
  let fixture: ComponentFixture<NavigationEditorItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationEditorItemComponent, ButtonComponent],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FontAwesomeTestingModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationEditorItemComponent)
    component = fixture.componentInstance
    component.index = 1
    component.isLoading = false
    component.form = new FormGroup({
      title: new FormControl('testTitle'),
      url: new FormControl('testUrl'),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should trim the url input', () => {
    let urlInput = component.form.get('url').value
    expect(urlInput).not.toEqual('https://domain.com')
    const input = fixture.nativeElement.querySelector(
      `[data-test="content-editor__navigation__item__url-input"]`
    )
    input.value = '  https://domain.com  '
    input.dispatchEvent(new Event('input'))

    urlInput = component.form.get('url').value
    expect(urlInput).toEqual('https://domain.com')
  })

  it('should clear the input on clear button', () => {
    let urlInput = component.form.get('url').value
    let titleInput = component.form.get('title').value
    expect(urlInput).not.toEqual('')
    expect(titleInput).not.toEqual('')

    const clearButton = fixture.nativeElement
      .querySelector(`[data-test="content-editor__navigation__item__clear-button"]`)
      .querySelector('button') as HTMLElement

    clearButton.click()

    urlInput = component.form.get('url').value
    titleInput = component.form.get('title').value
    expect(urlInput).toEqual('')
    expect(titleInput).toEqual('')
  })
})
