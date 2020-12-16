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
    this.dialogRef.close(undefined)
  }
}
