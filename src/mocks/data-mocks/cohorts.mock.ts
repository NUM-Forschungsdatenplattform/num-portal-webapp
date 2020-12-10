import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { ICohortApi } from 'src/app/shared/models/study/cohort-api.interface'

export const mockCohort1: ICohortApi = {
  id: 1,
  name: 'Cohort 1',
  description: 'Test',
  studyId: 1,
  cohortGroup: {
    id: 2,
    operator: LogicalOperator.And,
    parameters: null,
    type: ConnectorNodeType.Group,
    children: [
      {
        id: 3,
        operator: null,
        parameters: {},
        type: ConnectorNodeType.Phenotype,
        children: [],
        phenotypeId: 1,
      },
      {
        id: 4,
        operator: null,
        parameters: {},
        type: ConnectorNodeType.Phenotype,
        children: [],
        phenotypeId: 2,
      },
    ],
    phenotypeId: null,
  },
}
