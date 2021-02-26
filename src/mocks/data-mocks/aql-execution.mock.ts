import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'

export const mockAqlExecution1: IAqlExecutionResponse = {
  q: 'test query',
  columns: [
    {
      path: '/test',
      name: 'test',
    },
  ],
  rows: ['test-row-1', 'test-row-2'],
}
