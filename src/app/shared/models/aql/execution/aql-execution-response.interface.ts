import { IAqlExecutionColumn } from './aql-execution-column.interface'

export interface IAqlExecutionResponse {
  q: string
  columns: IAqlExecutionColumn[]
  rows: any[]
}
