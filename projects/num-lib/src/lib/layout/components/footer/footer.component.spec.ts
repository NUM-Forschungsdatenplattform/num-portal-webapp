/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { IAppConfig } from '../../../../config/app-config.model'
import { AppConfigService } from '../../../../config/app-config.service'
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
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
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
