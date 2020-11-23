import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AddPhenotypesPreviewComponent } from './add-phenotypes-preview.component'

describe('AddPhenotypesPreviewComponent', () => {
  let component: AddPhenotypesPreviewComponent
  let fixture: ComponentFixture<AddPhenotypesPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPhenotypesPreviewComponent],
      imports: [MaterialModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhenotypesPreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
