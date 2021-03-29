import { IUser } from '../user/user.interface'

export interface IProjectComment {
  author: IUser
  createDate: string
  id: number
  projectId: number
  text: string
}
