import { IUser } from '../user/user.interface'

export interface IAqlApi {
  id: number
  name: string
  nameTranslated: string
  query: string
  purpose: string
  purposeTranslated: string
  use: string
  useTranslated: string
  publicAql: boolean
  createDate?: string
  modifiedDate?: string
  owner?: IUser | null
  categoryId: number | null
}
