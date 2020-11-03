import { LogicalOperator } from 'src/app/core/models/logical-operator.enum'
import { IPhenotypeApi } from 'src/app/core/models/phenotype-api.interface'
import { IPhenotypeQueryApi } from 'src/app/core/models/phenotype-query-api.interface'
import { PhenotypeQueryType } from 'src/app/core/models/phenotype-query-type.enum'
import { IPhenotypeQuery } from './phenotype-query.interface'

export class PhenotypeUiModel {
  id: number
  name: string
  description: string
  query: IPhenotypeQuery

  constructor(phenotypeApi?: IPhenotypeApi) {
    this.id = phenotypeApi?.id || 0
    this.name = phenotypeApi?.name || undefined
    this.description = phenotypeApi?.description || undefined
    this.query = phenotypeApi ? this.convertQueryToUi(phenotypeApi.query) : this.createEmptyGroup()
  }

  createEmptyGroup(): IPhenotypeQuery {
    return {
      isNegated: false,
      type: PhenotypeQueryType.Group,
      operator: LogicalOperator.And,
      children: [],
    }
  }

  private convertQueryToUi(apiQuery: IPhenotypeQueryApi): IPhenotypeQuery {
    if (apiQuery.type === PhenotypeQueryType.Group && apiQuery.operator === LogicalOperator.Not) {
      const firstChild = apiQuery.children[0]
      return this.convertGroupToUi(firstChild, true)
    } else {
      return this.convertGroupToUi(apiQuery, false)
    }
  }

  private mapChildrenToUi = (child: IPhenotypeQueryApi): IPhenotypeQuery => {
    let mappedChild: IPhenotypeQuery
    if (child.type === PhenotypeQueryType.Group && child.operator === LogicalOperator.Not) {
      const firstChild = child.children[0]
      if (firstChild.type === PhenotypeQueryType.Aql) {
        mappedChild = this.convertAqlToUi(firstChild, true)
      } else {
        mappedChild = this.convertGroupToUi(firstChild, true)
      }
    } else if (child.type === PhenotypeQueryType.Aql) {
      mappedChild = this.convertAqlToUi(child, false)
    } else if (child.type === PhenotypeQueryType.Group && child.operator !== LogicalOperator.Not) {
      mappedChild = this.convertGroupToUi(child, false)
    }
    return mappedChild
  }

  private convertAqlToUi(apiAql: IPhenotypeQueryApi, isNegated: boolean): IPhenotypeQuery {
    return {
      isNegated,
      type: PhenotypeQueryType.Aql,
      aql: apiAql.aql,
    }
  }

  private convertGroupToUi(apiGroup: IPhenotypeQueryApi, isNegated: boolean): IPhenotypeQuery {
    return {
      isNegated,
      type: PhenotypeQueryType.Group,
      operator:
        apiGroup.operator === LogicalOperator.And ? LogicalOperator.And : LogicalOperator.Or,
      children: apiGroup.children.map(this.mapChildrenToUi),
    }
  }

  public convertToApiInterface(): IPhenotypeApi {
    const apiModel: IPhenotypeApi = {
      description: this.description,
      id: this.id,
      name: this.name,
      query: this.query.isNegated
        ? this.convertGroupToNegatedGroup(this.query)
        : this.convertGroupToApiGroup(this.query),
    }

    return apiModel
  }

  private mapChildrentoApi = (child: IPhenotypeQuery): IPhenotypeQueryApi => {
    if (child.isNegated) {
      if (child.type === PhenotypeQueryType.Group) {
        return this.convertGroupToNegatedGroup(child)
      } else {
        return this.convertAqlToNegatedGroup(child)
      }
    } else if (child.type === PhenotypeQueryType.Aql) {
      return this.convertAqlToApiAql(child)
    } else {
      return this.convertGroupToApiGroup(child)
    }
  }

  private convertGroupToApiGroup(child: IPhenotypeQuery): IPhenotypeQueryApi {
    return {
      type: child.type,
      operator: child.operator,
      children: child.children.map(this.mapChildrentoApi),
    }
  }

  private convertAqlToApiAql(child: IPhenotypeQuery): IPhenotypeQueryApi {
    return {
      type: child.type,
      aql: child.aql,
    }
  }

  private convertGroupToNegatedGroup(negatedChild: IPhenotypeQuery): IPhenotypeQueryApi {
    return {
      type: PhenotypeQueryType.Group,
      operator: LogicalOperator.Not,
      children: [
        {
          type: negatedChild.type,
          operator: negatedChild.operator,
          children: negatedChild.children.map(this.mapChildrentoApi),
        },
      ],
    }
  }

  private convertAqlToNegatedGroup(negatedChild: IPhenotypeQuery): IPhenotypeQueryApi {
    return {
      type: PhenotypeQueryType.Group,
      operator: LogicalOperator.Not,
      children: [
        {
          type: negatedChild.type,
          aql: negatedChild.aql,
        },
      ],
    }
  }
}
