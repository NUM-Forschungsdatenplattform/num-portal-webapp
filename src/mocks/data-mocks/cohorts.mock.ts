import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { ICohortApi } from 'src/app/shared/models/project/cohort-api.interface'
import { mockAql1, mockAql2 } from './aqls.mock'

export const mockCohort1: ICohortApi = {
  id: 1,
  name: 'Cohort 1',
  description: 'Test',
  projectId: 1,
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
        type: ConnectorNodeType.Aql,
        children: [],
        query: mockAql1,
      },
      {
        id: 4,
        operator: null,
        parameters: {},
        type: ConnectorNodeType.Aql,
        children: [],
        query: mockAql2,
      },
    ],
    query: null,
  },
}
