import { IContainmentTreeNode } from '../../../modules/aqls/models/containment-tree-node.interface'

export interface IAqbSelectClick {
  item: IContainmentTreeNode
  compositionId: string
  templateId: string
}
