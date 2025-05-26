import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {
  MatTree,
  MatTreeNestedDataSource,
  MatTreeNodeDef,
  MatNestedTreeNode,
  MatTreeNodeToggle,
  MatTreeNodeOutlet,
} from '@angular/material/tree'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IContainmentNodeField } from 'src/app/shared/models/archetype-query-builder/template/containment-node-field.interface'
import { IContainmentNode } from 'src/app/shared/models/archetype-query-builder/template/containment-node.interface'
import { IAqbSelectClick } from '../../../../shared/models/aqb/aqb-select-click.interface'
import { AqbSelectDestination } from '../../../../shared/models/aqb/aqb-select-destination.enum'
import { IContainmentTreeNode } from '../../models/containment-tree-node.interface'
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion'
import { MatIconButton } from '@angular/material/button'
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatProgressBar } from '@angular/material/progress-bar'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-aql-builder-template-tree',
  templateUrl: './aql-builder-template-tree.component.html',
  styleUrls: ['./aql-builder-template-tree.component.scss'],
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatTree,
    MatTreeNodeDef,
    MatNestedTreeNode,
    MatTreeNodeToggle,
    MatIconButton,
    NgClass,
    ExtendedModule,
    FaIconComponent,
    MatTreeNodeOutlet,
    MatProgressBar,
    TranslatePipe,
  ],
})
export class AqlBuilderTemplateTreeComponent implements OnInit {
  constructor(
    private aqlEditorService: AqlEditorService,
    private changeDetector: ChangeDetectorRef
  ) {}
  Mode = AqlBuilderDialogMode
  Destination = AqbSelectDestination

  @Input()
  templateId: string

  @Input()
  mode: AqlBuilderDialogMode

  @Input()
  selectDestination: AqbSelectDestination

  @Output()
  selectedItem = new EventEmitter<IAqbSelectClick>()

  @ViewChild(MatTree) tree: MatTree<IContainmentTreeNode>
  childrenAccessor = (dataNode: IContainmentTreeNode) => dataNode.children ?? []

  nestedDataSource = new MatTreeNestedDataSource<IContainmentTreeNode>()

  compositionId: string
  hasError: boolean

  hasChild(_: number, node: IContainmentTreeNode): boolean {
    return node.children != null && node.children.length > 0
  }

  ngOnInit(): void {
    this.aqlEditorService.getContainment(this.templateId).subscribe({
      next: (containment) => this.handleData(containment),
      error: () => (this.hasError = true),
    })
  }

  handleData(containment: IContainmentNode): void {
    this.compositionId = containment.archetypeId
    const firstNode = [this.convertChild(containment)]
    this.nestedDataSource.data = firstNode
    this.initialExpand()
  }

  initialExpand(): void {
    // Since the tree ViewChild is within a conditional Block it would be undefined if we did not check the View again
    this.changeDetector.detectChanges()
    this.tree.expandAll()
  }

  splitAndTitleCase(input: string): string {
    return input
      .split('_')
      .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ')
      .split('::')
      .join(' | ')
  }

  convertChild(node: IContainmentNode): IContainmentTreeNode {
    return {
      archetypeId: node.archetypeId,
      displayName: node.archetypeId.includes('EHR-COMPOSITION')
        ? this.splitAndTitleCase(this.templateId)
        : this.splitAndTitleCase(node.archetypeId.split('.')[1] || node.archetypeId),
      children: [
        ...node.fields.map((field) => this.convertField(field, node.archetypeId)),
        ...node.children.map((child) => this.convertChild(child)),
      ],
    }
  }

  convertField(field: IContainmentNodeField, parentArchetypeId: string): IContainmentTreeNode {
    return {
      ...field,
      parentArchetypeId,
      displayName: this.splitAndTitleCase(field.name),
    }
  }

  handleItemDoubleClick(item: IContainmentTreeNode): void {
    this.selectedItem.emit({
      item,
      compositionId: this.compositionId,
      templateId: this.templateId,
    })
  }
}
