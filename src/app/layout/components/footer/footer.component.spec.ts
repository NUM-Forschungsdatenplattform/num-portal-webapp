import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router, RouterModule } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { IAppConfig } from 'src/app/config/app-config.model'
import { AppConfigService } from 'src/app/config/app-config.service'
import { MaterialModule } from '../../material/material.module'

import { FooterComponent } from './footer.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('FooterComponent', () => {
  let component: FooterComponent
  let fixture: ComponentFixture<FooterComponent>
  let appConfig: AppConfigService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents()
  })

  beforeEach(() => {
    TestBed.inject(Router)
    appConfig = TestBed.inject(AppConfigService)
    appConfig.config = {} as unknown as IAppConfig
    appConfig.config.legal = {
      copyrightOwner: 'Test',
    }
    fixture = TestBed.createComponent(FooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('Footer Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })
  })
})
