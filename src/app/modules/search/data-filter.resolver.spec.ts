import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { DataFilterResolver } from './data-filter.resolver'

describe('AqlsResolver', () => {
  let resolver: DataFilterResolver

  const patientFilterService = {
    getCurrentProject: jest.fn(),
  } as unknown as PatientFilterService

  const mockRouter = {
    navigate: jest.fn(),
  } as unknown as Router

  beforeEach(() => {
    jest.clearAllMocks()
    resolver = new DataFilterResolver(mockRouter, patientFilterService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  it('should resolve with the current project if its present', (done) => {
    jest
      .spyOn(patientFilterService, 'getCurrentProject')
      .mockImplementation(() => of(new ProjectUiModel()))
    resolver.resolve().subscribe((project) => {
      expect(project).toBeInstanceOf(ProjectUiModel)
      done()
    })
  })

  it('should redirect to the search page if there is no current projec', (done) => {
    jest
      .spyOn(patientFilterService, 'getCurrentProject')
      .mockImplementation(() => throwError('Nope'))

    resolver
      .resolve()
      .toPromise()
      .then((_) => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['search'])
        done()
      })
  })
})
