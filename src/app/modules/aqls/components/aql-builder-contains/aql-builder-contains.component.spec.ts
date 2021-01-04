import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlBuilderContainsComponent } from './aql-builder-contains.component'

describe('AqlBuilderContainsComponent', () => {
  let component: AqlBuilderContainsComponent
  let fixture: ComponentFixture<AqlBuilderContainsComponent>

  const containsGroupDeleteEmitter = new EventEmitter()
  @Component({ selector: 'num-aql-builder-contains-group', template: '' })
  class ContainsGroupStubComponent {
    @Input() group: any
    @Input() parentGroupIndex: any
    @Input() index: any
    @Output() delete = containsGroupDeleteEmitter
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderContainsComponent, ContainsGroupStubComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderContainsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
