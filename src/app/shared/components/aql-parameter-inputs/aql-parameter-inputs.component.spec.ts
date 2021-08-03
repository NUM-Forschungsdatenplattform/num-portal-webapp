import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlParameterValueType } from '../../models/aql/aql-parameter-value-type.enum'

import { AqlParameterInputsComponent } from './aql-parameter-inputs.component'

describe('AqlParameterInputsComponent', () => {
  let component: AqlParameterInputsComponent
  let fixture: ComponentFixture<AqlParameterInputsComponent>

  @Component({ selector: 'num-time-input', template: '' })
  class TimeInputStubComponent {
    @Input() date: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlParameterInputsComponent, TimeInputStubComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlParameterInputsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    component.item = {
      name: 'test',
      valueType: AqlParameterValueType.DateTime,
      value: new Date(2019, 11, 1, 12, 0, 0),
    }
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('For each value type', () => {
    const testCases = [
      {
        inputSelector: 'aql-parameter-inputs__boolean-value__selector',
        item: {
          name: 'test',
          valueType: AqlParameterValueType.Boolean,
          value: true,
        },
      },
      {
        inputSelector: 'aql-parameter-inputs__datepicker-input',
        item: {
          name: 'test',
          valueType: AqlParameterValueType.Date,
          value: new Date(2019, 11, 1, 12, 0, 0),
        },
      },
      {
        inputSelector: 'aql-parameter-inputs__datepicker-input',
        item: {
          name: 'test',
          valueType: AqlParameterValueType.DateTime,
          value: new Date(2019, 11, 1, 12, 0, 0),
        },
      },
      {
        inputSelector: 'aql-parameter-inputs__time-value-input',
        item: {
          name: 'test',
          valueType: AqlParameterValueType.DateTime,
          value: new Date(2019, 11, 1, 12, 0, 0),
        },
      },
      {
        inputSelector: 'aql-parameter-inputs__time-value-input',
        item: {
          name: 'test',
          valueType: AqlParameterValueType.Time,
          value: new Date(2019, 11, 1, 12, 0, 0),
        },
      },
      {
        inputSelector: 'aql-parameter-inputs__value-input',
        item: {
          name: 'test',
          valueType: AqlParameterValueType.Double,
          value: 1.23,
        },
      },
      {
        inputSelector: 'aql-parameter-inputs__value-input',
        item: {
          name: 'test',
          valueType: AqlParameterValueType.Number,
          value: 123,
        },
      },
      {
        inputSelector: 'aql-parameter-inputs__value-input',
        item: {
          name: 'test',
          valueType: AqlParameterValueType.String,
          value: 'testValue',
        },
      },
    ]

    test.each(testCases)('it should show the correct input field', (testCase) => {
      component.item = testCase.item
      fixture.detectChanges()

      const element = fixture.nativeElement.querySelector(`[data-test="${testCase.inputSelector}"]`)
      expect(element).toBeTruthy()
    })

    test.each(testCases)('it emits value changes for input fields', (testCase) => {
      jest.spyOn(component.valueChange, 'emit')
      component.item = testCase.item
      fixture.detectChanges()

      const element = fixture.nativeElement.querySelector(`[data-test="${testCase.inputSelector}"]`)
      let shouldEmit

      switch (testCase.item.valueType) {
        case AqlParameterValueType.Boolean:
          element.value = false
          shouldEmit = false
          break
        case AqlParameterValueType.Date:
        case AqlParameterValueType.DateTime:
        case AqlParameterValueType.Time:
          element.value = new Date(2021, 3, 6, 19, 9, 3)
          shouldEmit = false
          break
        case AqlParameterValueType.Double:
          element.value = 4.56
          shouldEmit = true
          break
        case AqlParameterValueType.Number:
          element.value = 456
          shouldEmit = true
          break
        case AqlParameterValueType.String:
          element.value = 'hello world!'
          shouldEmit = true
          break
      }

      element.dispatchEvent(new Event('input'))
      if (shouldEmit) {
        expect(component.valueChange.emit).toHaveBeenCalledTimes(1)
      } else {
        expect(component.valueChange.emit).toHaveBeenCalledTimes(0)
      }
    })

    test.each([testCases[5], testCases[6]])(
      'checks number-typed inputs for validity',
      (testCase) => {
        component.item = testCase.item
        fixture.detectChanges()

        const element = fixture.nativeElement.querySelector(
          `[data-test="${testCase.inputSelector}"]`
        )

        element.value = '4.56'
        element.dispatchEvent(new Event('input'))
        expect(element.value).toEqual(testCase.item.value)
      }
    )

    test.each([null, new Date(2012, 8, 24, 8, 30, 0)])(
      'keeps the time part on date change',
      (testCase) => {
        component.item = testCases[2].item
        fixture.detectChanges()
        const event: MatDatepickerInputEvent<Date, any> = {
          value: testCase,
          target: null,
          targetElement: null,
        }
        component.datePickerChange(event)
        expect(component.item.value.getHours()).toEqual(12)
        expect(component.item.value.getMinutes()).toEqual(0)
        expect(component.item.value.getSeconds()).toEqual(0)
      }
    )
  })
})
