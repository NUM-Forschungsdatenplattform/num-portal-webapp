import { AqlItemVisibilityPipe } from './aql-item-visibility.pipe'
import { IItemVisibility } from '../models/item-visibility.interface'
import {
  MENU_ITEM_CLONE,
  MENU_ITEM_DELETE,
  MENU_ITEM_EDIT,
} from '../../modules/aqls/components/aql-table/menu-item'

describe('AqlItemVisibilityPipe', () => {
  let pipe: AqlItemVisibilityPipe<IItemVisibility>

  beforeEach(() => {
    pipe = new AqlItemVisibilityPipe()
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should decide and filter the actions and activate EDIT and DELETE when user own the aql', () => {
    const aqlItemVisibility = [
      MENU_ITEM_EDIT,
      MENU_ITEM_CLONE,
      MENU_ITEM_DELETE,
    ] as IItemVisibility[]
    const aqlOwnerId = '1'
    const userId = '1'
    const result = pipe.transform(aqlItemVisibility, aqlOwnerId, userId)
    expect(result).toEqual([MENU_ITEM_EDIT, MENU_ITEM_DELETE])
  })

  it('should decide and filter the actions and activate CLONE and disable DELETE when user NOT own the aql', () => {
    const aqlItemVisibility = [
      MENU_ITEM_EDIT,
      MENU_ITEM_CLONE,
      MENU_ITEM_DELETE,
    ] as IItemVisibility[]
    const aqlOwnerId = '1'
    const userId = '2'
    const result = pipe.transform(aqlItemVisibility, aqlOwnerId, userId)
    expect(result).toEqual([MENU_ITEM_CLONE, MENU_ITEM_DELETE])
  })
})
