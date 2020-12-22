import { NestedTreeControl } from '@angular/cdk/tree'
import { Component, Input, OnInit } from '@angular/core'
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { AqlEditorService } from 'src/app/core/services/aql-editor.service'
import { IContainmentNodeField } from 'src/app/shared/models/archetype-query-builder/template/containment-node-field.interface'
import { IContainmentNode } from 'src/app/shared/models/archetype-query-builder/template/containment-node.interface'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { IContainmentTreeNode } from '../../models/containment-tree-node.interface'

@Component({
  selector: 'num-aql-builder-template-tree',
  templateUrl: './aql-builder-template-tree.component.html',
  styleUrls: ['./aql-builder-template-tree.component.scss'],
})
export class AqlBuilderTemplateTreeComponent implements OnInit {
  constructor(private aqlEditorService: AqlEditorService) {}

  @Input()
  template: IEhrbaseTemplate

  nestedTreeControl = new NestedTreeControl<IContainmentTreeNode>((node) => node.children)
  nestedDataSource = new MatTreeNestedDataSource<IContainmentTreeNode>()

  containmentArchetypeId: string

  hasChild(_: number, node: IContainmentTreeNode): boolean {
    return node.children != null && node.children.length > 0
  }

  ngOnInit(): void {
    this.aqlEditorService
      .getContainment(this.template.templateId)
      .subscribe((containment) => this.handleData(containment))
  }

  handleData(containment: IContainmentNode): void {
    this.nestedDataSource.data = this.convertChild(containment).children
    this.containmentArchetypeId = containment.archetypeId
  }

  splitAndTitleCase(input: string): string {
    return input
      .split('_')
      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ')
      .split('::')
      .join(' | ')
  }

  convertChild(node: IContainmentNode): IContainmentTreeNode {
    return {
      archetypeId: node.archetypeId,
      displayName: this.splitAndTitleCase(node.archetypeId.split('.')[1] || node.archetypeId),
      children: [
        ...node.fields.map((field) => this.convertField(field)),
        ...node.children.map((child) => this.convertChild(child)),
      ],
    }
  }

  convertField(field: IContainmentNodeField): IContainmentTreeNode {
    return {
      ...field,
      displayName: this.splitAndTitleCase(field.name),
    }
  }

  handleItemDoubleClick(item: IContainmentTreeNode): void {
    // TODO: Handle Item
    console.log(item)
  }
}
