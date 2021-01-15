import { IContainmentNodeField } from 'src/app/shared/models/archetype-query-builder/template/containment-node-field.interface'

export interface IContainmentTreeNode extends Partial<IContainmentNodeField> {
  archetypeId?: string
  parentArchetypeId?: string
  displayName: string
  children?: IContainmentTreeNode[]
}
