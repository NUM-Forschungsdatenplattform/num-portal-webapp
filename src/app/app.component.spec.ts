import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { AppLayoutComponent } from './layout/components/app-layout/app-layout.component'

describe('AppComponent', () => {
  @Component({ selector: 'num-app-layout', template: '' })
  class AppLayoutStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLayoutStubComponent, AppComponent],
    })
      .overrideComponent(AppComponent, {
        remove: {
          imports: [AppLayoutComponent],
        },
        add: {
          imports: [AppLayoutStubComponent],
        },
      })
      .compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'num-portal-webapp'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('num-portal-webapp')
  })
})
