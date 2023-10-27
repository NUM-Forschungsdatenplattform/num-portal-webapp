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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ADD_RESEARCHERS_DIALOG_CONFIG } from './constants'
import { DialogAddResearchersComponent } from '../dialog-add-researchers/dialog-add-researchers.component'
import { MatTableDataSource } from '@angular/material/table'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { IUser } from '../../../../shared/models/user/user.interface'

@Component({
  selector: 'num-project-editor-researchers',
  templateUrl: './project-editor-researchers.component.html',
  styleUrls: ['./projet-editor-researchers.component.scss'],
})
export class ProjectEditorResearchersComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  dataSource = new MatTableDataSource<IUser>()
  displayedColumns: string[] = ['user', 'icon']

  @Input() isDisabled: boolean
  @Input() isLoadingComplete: boolean

  researchersValue: IUser[] = []
  @Output() researchersChange = new EventEmitter<IUser[]>()
  @Input()
  get researchers(): IUser[] {
    return this.researchersValue
  }
  set researchers(researchers: IUser[]) {
    this.researchersValue = researchers
    this.dataSource.data = researchers
    this.researchersChange.emit(researchers)
  }

  ngOnInit(): void {
    this.dataSource.data = this.researchers
  }

  addResearchers(): void {
    const dialogConfig: DialogConfig = {
      ...ADD_RESEARCHERS_DIALOG_CONFIG,
      dialogContentComponent: DialogAddResearchersComponent,
      dialogContentPayload: this.dataSource.data,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IUser[] | undefined) => {
      if (Array.isArray(confirmResult)) {
        this.dataSource.data = confirmResult
        this.researchers = confirmResult
      }
    })
  }

  deleteResearcher(researcherId: string): void {
    this.dataSource.data = this.dataSource.data.filter((researcher: IUser) => {
      return researcher.id !== researcherId
    })
    this.researchers = this.dataSource.data
  }
}
