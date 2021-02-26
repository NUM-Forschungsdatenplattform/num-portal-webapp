import { IUser } from '../user/user.interface'

export interface IStudyComment {
  author: IUser
  createDate: string
  id: number
  studyId: number
  text: string
}
