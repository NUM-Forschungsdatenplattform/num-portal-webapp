import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { CanDeactivateSearchGuard } from './can-deactivate-search.guard'

describe('CanDeactivateSearchGuard', () => {
  let guard: CanDeactivateSearchGuard

  const mockPatientFilterService = {
    resetCurrentProject: jest.fn(),
  } as unknown as PatientFilterService

  beforeEach(() => {
    jest.spyOn(mockPatientFilterService, 'resetCurrentProject')
    guard = new CanDeactivateSearchGuard(mockPatientFilterService)
  })

  it('should reset the current project on path leave', () => {
    guard.canDeactivate('')
    expect(mockPatientFilterService.resetCurrentProject).toHaveBeenCalledTimes(1)
  })
})
