import { LogicalOperator } from '../logical-operator.enum'
import { PhenotypeUiModel } from '../phenotype/phenotype-ui.model'
import { ConnectorNodeType } from '../connector-node-type.enum'
import { ConnectorGroupUiModel } from '../connector-group-ui.model'
import { ICohortGroupApi } from './cohort-group-api.interface'
import { ICohortApi } from './cohort-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'

export class CohortGroupUiModel extends ConnectorGroupUiModel {
  type: ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (CohortGroupUiModel | PhenotypeUiModel)[]
  indexInGroup: number | null = null

  constructor(cohortApi?: ICohortApi, private phenotypeService?: PhenotypeService) {
    super()
    this.type = ConnectorNodeType.Group
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
  }

  /**
   * Checks if parameters of children are configured. **Use with caution / propper changedetection!**
   */
  get areParameterConfigured(): boolean {
    return !this.children.some((child) => {
      return child.areParameterConfigured === false
    })
  }

  mapChildrenToUi = (child: ICohortGroupApi): CohortGroupUiModel | PhenotypeUiModel => {
    if (child.type === ConnectorNodeType.Group && child.operator === LogicalOperator.Not) {
      const firstChild = child.children[0]

      if (firstChild.type === ConnectorNodeType.Phenotype) {
        let model = new PhenotypeUiModel()
        model.isLoadingComplete = model.areParameterConfigured = false
        this.phenotypeService.get(child.phenotypeId).subscribe((phenotype) => {
          model = new PhenotypeUiModel(phenotype)
        })
        return model
      }
      const negatedGroup = new CohortGroupUiModel(undefined, this.phenotypeService)
      negatedGroup.convertToUi(firstChild, true)
      return negatedGroup
    }

    if (child.type === ConnectorNodeType.Phenotype) {
      let model = new PhenotypeUiModel()
      model.isLoadingComplete = model.areParameterConfigured = false
      this.phenotypeService.get(child.phenotypeId).subscribe((phenotype) => {
        model = new PhenotypeUiModel(phenotype)
      })
      return model
    }
    const newGroup = new CohortGroupUiModel(undefined, this.phenotypeService)
    newGroup.convertToUi(child, false)
    return newGroup
  }
}
