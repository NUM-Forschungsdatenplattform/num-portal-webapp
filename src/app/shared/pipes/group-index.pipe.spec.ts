import { GroupIndexPipe } from './group-index.pipe'

describe('GroupIndexPipe', () => {
  let pipe: GroupIndexPipe

  beforeEach(() => {
    pipe = new GroupIndexPipe()
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should join array members with a dot', () => {
    const input = [1, 2, 3]
    const result = pipe.transform(input)
    expect(result).toEqual('1.2.3')
  })
})
