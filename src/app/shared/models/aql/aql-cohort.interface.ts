import { IAqlApi } from './aql.interface'

export type IAqlCohortApi = Pick<IAqlApi, 'id' | 'name' | 'query'>
