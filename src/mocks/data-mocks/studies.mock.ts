import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'

export const mockStudy1: IStudyApi = {
  id: 1,
  name: 'Test Title',
  description: 'Test Description',
  templates: [],
  cohortId: 1,
  coordinator: {
    userId: '1',
    organizationId: '1',
    approved: true,
  },
  researchers: [],
  firstHypotheses: 'Test Hypothesis',
  status: StudyStatus.Draft,
  createDate: new Date(),
  modifiedDate: new Date(),
}
