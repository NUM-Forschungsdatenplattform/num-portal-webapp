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

import { IItemVisibility } from '../models/item-visibility.interface'
import { ItemVisibilityPipe } from './item-visibility.pipe'

describe('ItemVisibilityPipe', () => {
  let pipe: ItemVisibilityPipe<IItemVisibility>

  beforeEach(() => {
    pipe = new ItemVisibilityPipe()
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
    const result = pipe.transform([menuItem], 'status5', '1', '1')
    expect(result[0].isDisabled).toBeTruthy()
  })

  it('should disable the menu item based on the ownership', () => {
    const menuItem: IItemVisibility = {
      id: 'a',
      disabledUnless: ['status1', 'status2'],
      disableUnlessOwned: true,
    }
    const result = pipe.transform([menuItem], 'status2', '1', '2')
    expect(result[0].isDisabled).toBeTruthy()
  })

  it('should hide the menu item based on the status', () => {
    const menuItem: IItemVisibility = {
      id: 'a',
      disabledUnless: ['status1', 'status2'],
      disableUnlessOwned: true,
      hiddenWhen: ['status3', 'status4'],
    }
    const result = pipe.transform([menuItem], 'status3', '1', '2')
    expect(result.length).toEqual(0)
  })
})
