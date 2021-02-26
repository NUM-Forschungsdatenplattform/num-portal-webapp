import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { IAppConfig } from 'src/app/config/app-config.model'
import { AppConfigService } from 'src/app/config/app-config.service'
import { MaterialModule } from '../../material/material.module'

import { FooterComponent } from './footer.component'

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
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    appConfig = TestBed.inject(AppConfigService)
    appConfig.config = ({} as unknown) as IAppConfig
    appConfig.config.legal = {
      copyrightOwner: 'Test',
      version: '1.0.0',
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
