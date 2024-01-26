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

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogConfig } from '../../../shared/models/dialog/dialog-config.interface'

@Component({
  selector: 'num-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
})
export class GenericDialogComponent implements AfterViewInit, OnDestroy {
  DialogSize = DialogSize
  @ViewChild('dialogContent', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef
  private subscriptions = new Subscription()
  componentRef: ComponentRef<any>

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public dialogConfig: DialogConfig,
    private dialogRef: MatDialogRef<GenericDialogComponent>
  ) {}

  ngAfterViewInit(): void {
    const componentFactory = this.resolver.resolveComponentFactory(
      this.dialogConfig.dialogContentComponent
    )

    this.componentRef = this.viewContainerRef.createComponent(componentFactory)
    this.componentRef.instance.dialogInput = this.dialogConfig.dialogContentPayload

    this.subscriptions.add(
      this.componentRef.instance.closeDialog.subscribe((value) => {
        this.dialogRef.close(value)
      })
    )
    this.changeDetectorRef.detectChanges()
  }

  ngOnDestroy(): void {
    this.componentRef.destroy()
  }

  handleDialogConfirm(): void {
    this.componentRef.instance.handleDialogConfirm()
  }

  handleDialogCancel(): void {
    this.componentRef.instance.handleDialogCancel()
  }

  handleDialogClose(): void {
    this.dialogRef.close()
  }
}
