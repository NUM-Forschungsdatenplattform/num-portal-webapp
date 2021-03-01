import { AvailableRoles } from '../models/available-roles.enum'
import { AvailableRolesPipe } from './available-roles.pipe'

describe('AvailableRolesPipe', () => {
  let pipe: AvailableRolesPipe

  beforeEach(() => {
    pipe = new AvailableRolesPipe()
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should filter roles not included in AvailableRoles', () => {
    const input = [AvailableRoles.SuperAdmin, 'some-not-included-role']
    const result = pipe.transform(input)
    expect(result).toEqual([AvailableRoles.SuperAdmin])
  })
})
