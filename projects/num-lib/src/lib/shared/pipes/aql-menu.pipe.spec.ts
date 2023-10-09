/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AqlMenuPipe } from './aql-menu.pipe'
import { IItemVisibility } from '../models/item-visibility.interface'
import {
  AqlOwner,
  MENU_ITEM_CLONE,
  MENU_ITEM_DELETE,
  MENU_ITEM_EDIT,
} from '../../modules/aqls/components/aql-table/menu-item'
import { mockUserProfile1, mockUserProfile2 } from 'src/mocks/data-mocks/user-profile.mock'
import { AvailableRoles } from '../models/available-roles.enum'
import { IUserProfile } from '../models/user/user-profile.interface'

describe('AqlMenuPipe', () => {
  let pipe: AqlMenuPipe<IItemVisibility>

  beforeEach(() => {
    pipe = new AqlMenuPipe()
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should decide and filter the actions and activate EDIT and DELETE when user own the aql', () => {
    const aqlMenu = [MENU_ITEM_EDIT, MENU_ITEM_CLONE, MENU_ITEM_DELETE] as IItemVisibility[]
    const aqlOwnerId = '1'
    const user = mockUserProfile1
    const result = pipe.transform(aqlMenu, aqlOwnerId, user)
    expect(result).toEqual([MENU_ITEM_EDIT, MENU_ITEM_DELETE])
  })

  it('should decide and filter the actions and activate CLONE and disable DELETE when user NOT own the aql', () => {
    const aqlMenu = [MENU_ITEM_EDIT, MENU_ITEM_CLONE, MENU_ITEM_DELETE] as IItemVisibility[]
    const aqlOwnerId = '1'
    const user = mockUserProfile2
    const result = pipe.transform(aqlMenu, aqlOwnerId, user)
    expect(result).toEqual([MENU_ITEM_CLONE, MENU_ITEM_DELETE])
  })

  it('should should force enable the menu item based on the role', () => {
    const menuItem: IItemVisibility = {
      id: 'a',
      forceEnableByRole: [AvailableRoles.SuperAdmin],
      disabledUnless: [AqlOwner.OtherAql],
      hiddenWhen: [],
    }
    const adminProfile = {
      id: '2',
      roles: [AvailableRoles.Researcher, AvailableRoles.SuperAdmin],
    } as IUserProfile

    const aqlOwnerId = '1'

    const result = pipe.transform([menuItem], aqlOwnerId, adminProfile)
    expect(result[0].isDisabled).toBeFalsy()
  })
})
