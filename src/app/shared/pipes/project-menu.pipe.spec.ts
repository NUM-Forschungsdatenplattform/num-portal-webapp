import { mockUserProfile1, mockUserProfile2 } from 'src/mocks/data-mocks/user-profile.mock'
import { AvailableRoles } from '../models/available-roles.enum'
import { IItemVisibility } from '../models/item-visibility.interface'
import { IUserProfile } from '../models/user/user-profile.interface'
import { ProjectMenuPipe } from './project-menu.pipe'

describe('ProjectMenuPipe', () => {
  let pipe: ProjectMenuPipe<IItemVisibility>

  beforeEach(() => {
    pipe = new ProjectMenuPipe()
  })

  it('should create', () => {
    expect(pipe).toBeTruthy()
  })

  test.each([true, false])('should disable the menu item based on the status', (ownerShip) => {
    const menuItem: IItemVisibility = {
      id: 'a',
      disabledUnless: ['status1', 'status2'],
      disableUnlessOwned: ownerShip,
      hiddenWhen: ['status3', 'status4'],
    }
    const result = pipe.transform([menuItem], 'status5', '1', mockUserProfile1)
    expect(result[0].isDisabled).toBeTruthy()
  })

  it('should disable the menu item based on the ownership', () => {
    const menuItem: IItemVisibility = {
      id: 'a',
      disabledUnless: ['status1', 'status2'],
      disableUnlessOwned: true,
    }
    const result = pipe.transform([menuItem], 'status2', '1', mockUserProfile2)
    expect(result[0].isDisabled).toBeTruthy()
  })

  it('should hide the menu item based on the status', () => {
    const menuItem: IItemVisibility = {
      id: 'a',
      disabledUnless: ['status1', 'status2'],
      disableUnlessOwned: true,
      hiddenWhen: ['status3', 'status4'],
    }
    const result = pipe.transform([menuItem], 'status3', '1', mockUserProfile2)
    expect(result.length).toEqual(0)
  })

  it('should should force enable the menu item based on the role', () => {
    const menuItem: IItemVisibility = {
      id: 'a',
      disabledUnless: ['status1', 'status3'],
      disableUnlessOwned: true,
      forceEnableByRole: [AvailableRoles.SuperAdmin],
    }
    const adminProfile = {
      id: '2',
      roles: [AvailableRoles.Researcher, AvailableRoles.SuperAdmin],
    } as IUserProfile

    const result = pipe.transform([menuItem], 'status3', '1', adminProfile)
    expect(result[0].isDisabled).toBeFalsy()
  })

  it('should should not force enable the menu item based on the role if the status disables the item', () => {
    const menuItem: IItemVisibility = {
      id: 'a',
      disabledUnless: ['status1', 'status2'],
      disableUnlessOwned: true,
      forceEnableByRole: [AvailableRoles.SuperAdmin],
    }
    const adminProfile = {
      id: '2',
      roles: [AvailableRoles.Researcher, AvailableRoles.SuperAdmin],
    } as IUserProfile

    const result = pipe.transform([menuItem], 'status3', '1', adminProfile)
    expect(result[0].isDisabled).not.toBeFalsy()
  })
})
