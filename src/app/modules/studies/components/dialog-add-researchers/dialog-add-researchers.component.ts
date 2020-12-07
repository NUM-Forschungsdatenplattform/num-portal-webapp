import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  templateUrl: './dialog-add-researchers.component.html',
  styleUrls: ['./dialog-add-researchers.component.scss'],
})
export class DialogAddResearchersComponent implements OnInit {
  @Output() closeDialog = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  handleDialogConfirm(): void {
    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
