import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ManagerToolsComponent } from './manager-tools.component'
import { ManagerChartsComponent } from '../manager-charts/manager-charts.component'
import { PseudonymResolverComponent } from '../pseudonym-resolver/pseudonym-resolver.component'

describe('ManagerToolsComponent', () => {
  let component: ManagerToolsComponent
  let fixture: ComponentFixture<ManagerToolsComponent>

  @Component({ selector: 'num-manager-charts', template: '' })
  class ManagerChartsStubComponent {}
  @Component({ selector: 'num-pseudonym-resolver', template: '' })
  class PseudonymResolverStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerToolsComponent, ManagerChartsStubComponent, PseudonymResolverStubComponent],
    })
      .overrideComponent(ManagerToolsComponent, {
        remove: {
          imports: [ManagerChartsComponent, PseudonymResolverComponent],
        },
        add: {
          imports: [ManagerChartsStubComponent, PseudonymResolverStubComponent],
        },
      })
      .compileComponents()
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
