import { IProjectComment } from 'src/app/shared/models/project/project-comment.interface'
import { mockUser } from './admin.mock'

export const projectCommentMock1: IProjectComment = {
  text: 'This is mock no. 1',
  id: 1,
  projectId: 1,
  createDate: '2021-01-18T17:15:39.848884+01:00',
  author: mockUser,
}

export const projectCommentMock2: IProjectComment = {
  text: 'This is mock no. 1',
  id: 2,
  projectId: 1,
  createDate: '2021-01-18T17:15:39.848884+01:00',
  author: mockUser,
}

export const projectCommentMocks = [projectCommentMock1, projectCommentMock2]
