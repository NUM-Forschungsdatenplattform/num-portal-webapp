import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogConfigData } from '../../models/dialog-config-data.interface'
import { DialogConfig } from '../../models/dialog-config.interface'

@Component({
  selector: 'num-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
})
export class GenericDialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dialogContent', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef
  componentRef: ComponentRef<any>

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public dialogConfigData: DialogConfigData
  ) {}

  ngAfterViewInit(): void {
    const componentFactory = this.resolver.resolveComponentFactory(
      this.dialogConfigData.dialogContentComponent
    )
    this.componentRef = this.viewContainerRef.createComponent(componentFactory)
    this.changeDetectorRef.detectChanges()
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy()
    }
  }
}
