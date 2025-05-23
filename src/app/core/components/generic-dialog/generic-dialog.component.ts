import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Inject,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogConfig } from '../../../shared/models/dialog/dialog-config.interface'
import { FlexModule } from '@angular/flex-layout/flex'
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { CdkScrollable } from '@angular/cdk/scrolling'
import { ButtonComponent } from '../../../shared/components/button/button.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
  imports: [
    FlexModule,
    NgClass,
    ExtendedModule,
    MatDialogTitle,
    FaIconComponent,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    ButtonComponent,
    TranslatePipe,
  ],
})
export class GenericDialogComponent implements AfterViewInit, OnDestroy {
  DialogSize = DialogSize
  @ViewChild('dialogContent', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef
  private subscriptions = new Subscription()
  componentRef: ComponentRef<any>

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public dialogConfig: DialogConfig,
    private dialogRef: MatDialogRef<GenericDialogComponent>
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.viewContainerRef.createComponent(
      this.dialogConfig.dialogContentComponent
    )
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
