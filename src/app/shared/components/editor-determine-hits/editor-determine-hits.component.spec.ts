import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditorDetermineHitsComponent } from './editor-determine-hits.component'

describe('EditorDetermineHitsComponent', () => {
  let component: EditorDetermineHitsComponent
  let fixture: ComponentFixture<EditorDetermineHitsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorDetermineHitsComponent],
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
})
