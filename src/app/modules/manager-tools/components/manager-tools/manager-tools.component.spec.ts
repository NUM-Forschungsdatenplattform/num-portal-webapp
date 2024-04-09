import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ManagerToolsComponent } from './manager-tools.component'

describe('ManagerToolsComponent', () => {
  let component: ManagerToolsComponent
  let fixture: ComponentFixture<ManagerToolsComponent>

  @Component({ selector: 'num-manager-charts', template: '' })
  class ManagerChartsComponent {}
  @Component({ selector: 'num-pseudonym-resolver', template: '' })
  class PseudonymResolverComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerToolsComponent, ManagerChartsComponent, PseudonymResolverComponent],
      imports: [],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerToolsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
