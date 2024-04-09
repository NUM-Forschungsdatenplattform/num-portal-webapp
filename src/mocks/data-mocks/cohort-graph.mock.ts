import { ICohortPreviewApi } from 'src/app/shared/models/cohort-preview.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'

export const mockInstitutionGraphData: IDictionary<string, number> = {
  'Test clinic 1': 300,
  'Test clinic 2': 842,
  'Test clinic 3': 123,
  'Test clinic 4': 742,
}

export const mockAgeGraphData: IDictionary<string, number> = {
  '20-30': 361,
  '30-40': 471,
  '40-50': 841,
  '50-60': 162,
  '60-70': 462,
  '70-80': 127,
  '80-90': 12,
}

export const mockCohortPreviewData: ICohortPreviewApi = {
  ages: mockAgeGraphData,
  count: 123,
  hospitals: mockInstitutionGraphData,
}
