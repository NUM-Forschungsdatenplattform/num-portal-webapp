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

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { INITIATIVE_CLINICS_LOGOS, LOGOS_BASE_URL, PARTICIPANT_CLINICS_LOGOS } from './constants'
import { AvailableRoles } from 'projects/num-lib/src/lib/shared/models/available-roles.enum'
import { AuthService } from 'projects/num-lib/src/lib/core/auth/auth.service'
import { ContentService } from 'projects/num-lib/src/lib/core/services/content/content.service'
import { IDashboardCard } from 'projects/num-lib/src/lib/shared/models/content/dashboard-card.interface'
import { AppConfigService } from 'projects/num-lib/src/public-api'

@Component({
  selector: 'num-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  AvailableRoles = AvailableRoles
  constructor(
    private appConfig: AppConfigService,
    private authService: AuthService,
    private contentService: ContentService,
    private translateService: TranslateService
  ) {}

  config = this.appConfig.config
  participantLogosBaseUrl = LOGOS_BASE_URL
  participantLogos = PARTICIPANT_CLINICS_LOGOS
  initiativeLogos = INITIATIVE_CLINICS_LOGOS
  authTest: string
  cards: IDashboardCard[]
  displayLang: string
  isLoggedIn: boolean
  blocks: any[]

  @ViewChild('participantsAnchor') participantsAnchor: ElementRef

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn

    if (this.authService.isLoggedIn) {
      this.fetchContentCards()
      this.getCurrentLang()
    }

    this.blocks = this.translateService?.instant('DASHBOARD.INTRODUCTION.BLOCKS')

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((newLang) => {
        this.displayLang = newLang.lang
        this.blocks = this.translateService?.instant('DASHBOARD.INTRODUCTION.BLOCKS')
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  fetchContentCards(): void {
    this.contentService.getCards().subscribe((data) => {
      this.cards = data
    })
  }

  openCardUrl(cardUrl: string): void {
    window.open(cardUrl)
  }

  getCurrentLang(): void {
    this.displayLang = this.translateService.currentLang as 'en' | 'de'
  }

  scrollToParticipants(): void {
    const targetElement = this.participantsAnchor.nativeElement
    targetElement.scrollIntoView({ behavior: 'smooth' })
  }
}
