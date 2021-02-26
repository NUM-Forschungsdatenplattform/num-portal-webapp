import { IUser } from '../user/user.interface'

export interface IAqlApi {
  id: number
  name: string
  query: string
  purpose: string
  use: string
  publicAql: boolean
  createDate?: string
  modifiedDate?: string
  organizationId?: string
  owner?: IUser
}
