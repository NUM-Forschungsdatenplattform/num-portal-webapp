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
    organizationId: 1,
    approved: true,
  },
  researchers: [],
  firstHypotheses: 'Test Hypothesis',
  status: StudyStatus.Draft,
  createDate: new Date(),
  modifiedDate: new Date(),
}

export const mockStudy2: IStudyApi = {
  id: 2,
  name: 'Test Title 2',
  description: 'Test Description 2',
  templates: [],
  cohortId: 2,
  coordinator: {
    userId: '1',
    organizationId: 1,
    approved: true,
  },
  researchers: [
    {
      userId: 'abc-1',
    },
    {
      userId: 'abc-2',
    },
  ],
  firstHypotheses: 'Test Hypothesis',
  status: StudyStatus.Pending,
  createDate: new Date(),
  modifiedDate: new Date(),
}

export const mockStudy3: IStudyApi = {
  id: 3,
  name: 'Test Title 3',
  description: 'Test Description 3',
  templates: [],
  cohortId: 3,
  coordinator: {
    userId: '1',
    organizationId: 1,
    approved: true,
  },
  researchers: [
    {
      userId: 'abc-1',
    },
    {
      userId: 'abc-2',
    },
    {
      userId: '123-456',
    },
  ],
  firstHypotheses: 'Test Hypothesis',
  status: StudyStatus.Published,
  createDate: new Date(),
  modifiedDate: new Date(),
}

export const mockStudies = [mockStudy1, mockStudy2]

export const mockStudies1 = [mockStudy1, mockStudy2, mockStudy3]
