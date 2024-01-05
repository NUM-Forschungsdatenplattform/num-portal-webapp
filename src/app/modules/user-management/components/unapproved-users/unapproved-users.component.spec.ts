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

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { Component } from '@angular/core'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { UnapprovedUsersComponent } from './unapproved-users.component'

describe('UnapprovedUsersComponent', () => {
  let component: UnapprovedUsersComponent
  let fixture: ComponentFixture<UnapprovedUsersComponent>

  const approvedUsersSubject$ = new Subject<IUser[]>()
  const unapprovedUsersSubject$ = new Subject<IUser[]>()
  const adminService = {
    approvedUsersObservable$: approvedUsersSubject$.asObservable(),
    unapprovedUsersObservable$: unapprovedUsersSubject$.asObservable(),
  } as AdminService

  @Component({ selector: 'num-unapproved-users-table', template: '' })
  class UserTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnapprovedUsersComponent, UserTableStubComponent],
      imports: [MaterialModule, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedUsersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
