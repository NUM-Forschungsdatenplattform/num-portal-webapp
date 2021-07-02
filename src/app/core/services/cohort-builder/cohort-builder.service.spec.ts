import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { mockAql1 } from 'src/mocks/data-mocks/aqls.mock'
import { CohortBuilderService } from './cohort-builder.service'

describe('CohortBuilderService', () => {
  let service: CohortBuilderService

  beforeEach(() => {
    jest.clearAllMocks()
    service = new CohortBuilderService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should push the target reset event when its called', (done) => {
    service.targetResetObservable$.subscribe(() => {
      done()
    })
    service.resetTargets()
  })

  it('should push the aql item to the subscribers when its called', (done) => {
    const pushedAql = new AqlUiModel(mockAql1)
    service.itemEventObservable$.subscribe((aql) => {
      expect(aql).toEqual(pushedAql)
      done()
    })
    service.pushItemToTarget(pushedAql)
  })
})
