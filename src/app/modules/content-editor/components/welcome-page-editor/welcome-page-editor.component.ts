import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ContentService } from 'src/app/core/services/content/content.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { IDashboardCard } from 'src/app/shared/models/content/dashboard-card.interface'
import { CdkDragDrop } from '@angular/cdk/drag-drop'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { DEFAULT_DASHBOARD_CARD_IMAGE } from 'src/app/shared/constants'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG, SAVE_ERROR_CONFIG, SAVE_SUCCESS_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'

@Component({
  selector: 'num-welcome-page-editor',
  templateUrl: './welcome-page-editor.component.html',
  styleUrls: ['./welcome-page-editor.component.scss'],
})
export class WelcomePageEditorComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()

  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private toastMessageService: ToastMessageService,
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {}

  isLoading = true

  displayLang: string

  cards: IDashboardCard[]

  cardForm = new FormGroup({
    cardItems: this.formBuilder.array([]),
  })

  get dashboardCards(): FormArray {
    return this.cardForm.get('cardItems') as FormArray
  }

  set dashboardCards(cardItems: FormArray) {
    this.cardForm.setControl('cardItems', cardItems)
  }

  ngOnInit(): void {
    this.fetchData()
    this.displayLang = this.translateService.currentLang as 'en' | 'de'
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((newLang) => (this.displayLang = newLang.lang))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  fetchData(): void {
    this.contentService.getCards().subscribe(
      (data) => {
        this.handleData(data)
        this.isLoading = false
      },
      () => {
        this.isLoading = false
      }
    )
  }

  handleData(cards: IDashboardCard[]): void {
    this.cards = cards
    this.generateForm(cards)
  }

  generateForm(cards: IDashboardCard[]): void {
    const newCards = new FormArray([])
    cards.forEach((card) => {
      newCards.push(this.buildFormInput(card))
    })
    this.dashboardCards = newCards
  }

  buildFormInput(card?: IDashboardCard): FormGroup {
    const urlRegex = /^https?:\/\/[^\s/$.?#!<>|;'"\\@:&=_()].+\.[^\s]*[^\s.]$/
    return this.formBuilder.group({
      titleEnglish: [
        card?.en.title,
        [Validators.required, Validators.minLength(3), Validators.maxLength(65)],
      ],
      titleGerman: [
        card?.de.title,
        [Validators.required, Validators.minLength(3), Validators.maxLength(65)],
      ],
      bodyTextEnglish: [card?.en.text, [Validators.maxLength(130)]],
      bodyTextGerman: [card?.de.text, [Validators.maxLength(130)]],
      url: [card?.url, [Validators.pattern(urlRegex)]],
      imageId: [card?.imageId || DEFAULT_DASHBOARD_CARD_IMAGE, [Validators.required]],
    })
  }

  addItem(): void {
    if (this.dashboardCards.value.length >= 8) {
      return
    }
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentPayload: this.buildFormInput(),
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: FormGroup | undefined) => {
      if (confirmResult instanceof FormGroup) {
        this.dashboardCards.insert(0, confirmResult)
      }
    })
  }

  getCardsForApi(): IDashboardCard[] {
    return this.dashboardCards.controls.reduce((validCards, control) => {
      if (control.valid) {
        validCards.push({
          imageId: control.value.imageId,
          url: control.value.url,
          de: {
            title: control.value.titleGerman,
            text: control.value.bodyTextGerman,
          },
          en: {
            title: control.value.titleEnglish,
            text: control.value.bodyTextEnglish,
          },
        })
      }
      return validCards
    }, [] as IDashboardCard[])
  }

  handleSaveSuccess(dashboardCards: IDashboardCard[]): void {
    this.isLoading = false
    this.cards = dashboardCards
    this.generateForm(dashboardCards)
    this.toastMessageService.openToast(SAVE_SUCCESS_CONFIG)
  }

  handleSaveError(): void {
    this.isLoading = false
    this.toastMessageService.openToast(SAVE_ERROR_CONFIG)
  }

  save(): void {
    this.isLoading = true
    const dashboardCards = this.getCardsForApi()
    this.contentService.updateCards(dashboardCards).subscribe(
      () => this.handleSaveSuccess(dashboardCards),
      () => this.handleSaveError()
    )
  }

  discard(): void {
    this.generateForm(this.cards)
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.moveItem(event.previousIndex, event.currentIndex)
  }

  deleteItem(index: number): void {
    this.dashboardCards.removeAt(index)
  }

  moveItem(oldIndex: number, newIndex: number): void {
    const dashboardCards = this.dashboardCards
    const fromIndex = this.getValidIndex(oldIndex, dashboardCards.length)
    const toIndex = this.getValidIndex(newIndex, dashboardCards.length)

    if (fromIndex !== toIndex) {
      const toBeMoved = dashboardCards.at(oldIndex)
      dashboardCards.removeAt(oldIndex)
      dashboardCards.insert(newIndex, toBeMoved)
    }
  }

  getValidIndex(value: number, maxLength: number): number {
    return Math.max(0, Math.min(maxLength, value))
  }
}
