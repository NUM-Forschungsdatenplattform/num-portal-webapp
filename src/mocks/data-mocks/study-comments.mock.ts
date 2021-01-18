import { IStudyComment } from 'src/app/shared/models/study/study-comment.interface'
import { mockUser } from './admin.mock'

export const studyCommentMock1: IStudyComment = {
  text: 'This is mock no. 1',
  id: 1,
  studyId: 1,
  createDate: '2021-01-18T17:15:39.848884+01:00',
  author: mockUser,
}

export const studyCommentMock2: IStudyComment = {
  text: 'This is mock no. 1',
  id: 2,
  studyId: 1,
  createDate: '2021-01-18T17:15:39.848884+01:00',
  author: mockUser,
}

export const studyCommentMocks = [studyCommentMock1, studyCommentMock2]
