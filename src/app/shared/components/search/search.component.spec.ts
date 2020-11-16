import { SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { SearchComponent } from './search.component'

describe('SearchComponent', () => {
  let component: SearchComponent
  let fixture: ComponentFixture<SearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
  })

  describe('When the search text is provided on input', () => {
    beforeEach(() => {
      component.searchText = 'test'
      fixture.detectChanges()
    })

    it('should provide the search text to the form input', () => {
      const searchQuery = component.searchForm.get('query').value
      expect(searchQuery).toEqual('test')
    })
  })

  describe('When the search text is not provided on input', () => {
    beforeEach(() => {
      component.searchText = undefined
      fixture.detectChanges()
    })

    it('should provide the search text to the form input as empty string', () => {
      const searchQuery = component.searchForm.get('query').value
      expect(searchQuery).toEqual('')
    })
  })

  describe('When the search input is modified', () => {
    beforeEach(() => {
      component.searchText = undefined
      fixture.detectChanges()
    })

    it('should emit the change event', (done) => {
      const debounceTime = (component as any).debounceTime
      jest.spyOn(component.searchTextChange, 'emit').mockImplementation()
      const searchQuery = component.searchForm.get('query')
      searchQuery.patchValue('test')
      fixture.detectChanges()
      setTimeout(() => {
        expect(component.currentText).toEqual('test')
        expect(component.searchTextChange.emit).toHaveBeenCalledWith('test')
        done()
      }, debounceTime)
    })
  })

  describe('When the search input is supposed to be cleared', () => {
    beforeEach(() => {
      component.searchText = 'test'
      fixture.detectChanges()
    })

    it('should set the input to a empty string', () => {
      const searchQuery = component.searchForm.get('query').value
      expect(searchQuery).toEqual('test')
      component.clearInput()
      fixture.detectChanges()
      expect(component.searchForm.get('query').value).toEqual('')
    })
  })

  describe('When the search text input changes', () => {
    beforeEach(() => {
      component.searchText = 'initial'
      fixture.detectChanges()
    })

    it('should path the form input', () => {
      component.searchText = 'test'
      const change = new SimpleChange([], component.searchText, false)
      component.ngOnChanges({ searchText: change })
      fixture.detectChanges()
      const searchQuery = component.searchForm.get('query').value
      expect(searchQuery).toEqual('test')
    })

    it('should ignore the first change', () => {
      component.searchText = 'test'
      const change = new SimpleChange([], component.searchText, true)
      component.ngOnChanges({ searchText: change })
      fixture.detectChanges()
      const searchQuery = component.searchForm.get('query').value
      expect(searchQuery).toEqual('initial')
    })

    it('should ignore the changes with the same value as before', () => {
      component.searchText = 'test'
      const change = new SimpleChange('test', component.searchText, true)
      component.ngOnChanges({ searchText: change })
      fixture.detectChanges()
      const searchQuery = component.searchForm.get('query').value
      expect(searchQuery).toEqual('initial')
    })
  })
})
