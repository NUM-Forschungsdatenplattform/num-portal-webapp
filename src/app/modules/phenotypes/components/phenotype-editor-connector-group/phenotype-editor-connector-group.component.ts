import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { LogicalOperator } from 'src/app/core/models/logical-operator.enum'
import { PhenotypeQueryType } from 'src/app/core/models/phenotype-query-type.enum'
import { IPhenotypeQueryApi } from 'src/app/core/models/phenotype-query-api.interface'
import { IPhenotypeQuery } from '../../models/phenotype-query.interface'

@Component({
  selector: 'num-phenotype-editor-connector-group',
  templateUrl: './phenotype-editor-connector-group.component.html',
  styleUrls: ['./phenotype-editor-connector-group.component.scss'],
})
export class PhenotypeEditorConnectorGroupComponent implements OnInit, OnChanges {
  phenotypeQueryType = PhenotypeQueryType
  logicalOperator = LogicalOperator
  logicalOperatorArray = [LogicalOperator.And, LogicalOperator.Or]

  @Input() phenotypeQuery: IPhenotypeQuery
  @Input() parentGroupIndex: number[]
  @Input() selfGroupIndex: number

  groupIndex: number[]
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'phenotypeQuery': {
            this.groupIndex = [...this.parentGroupIndex, this.selfGroupIndex]
            this.enumerateGroups()
          }
        }
      }
    }
  }

  enumerateGroups(): void {
    console.log('Enum')
    let counter = 1
    for (let i = 0; i < this.phenotypeQuery.children.length; i++) {
      const query = this.phenotypeQuery.children[i]
      if (query.type === PhenotypeQueryType.Group) {
        this.phenotypeQuery.children[i].indexInGroup = counter
        counter++
      }
    }
  }

  addQuery(): void {
    const aql = this.generateAql()
    const copy = JSON.parse(JSON.stringify(this.phenotypeQuery.children))
    copy.push(aql)
    this.phenotypeQuery.children = copy
  }

  generateAql(): IPhenotypeQuery {
    return {
      isNegated: false,
      type: PhenotypeQueryType.Aql,
      aql: {
        id: new Date().getSeconds(),
        name: 'test',
        query: 'test-query',
      },
    }
  }

  addGroup(): void {
    const group: IPhenotypeQuery = {
      isNegated: false,
      type: PhenotypeQueryType.Group,
      operator: LogicalOperator.And,
      children: [this.generateAql()],
    }
    const copy = JSON.parse(JSON.stringify(this.phenotypeQuery.children))
    copy.push(group)
    this.phenotypeQuery.children = copy
    this.enumerateGroups()
  }
}
