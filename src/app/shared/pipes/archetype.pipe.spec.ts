import { ArchetypePipe } from './archetype.pipe'

describe('GroupIndexPipe', () => {
  let pipe: ArchetypePipe

  beforeEach(() => {
    pipe = new ArchetypePipe()
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })
})
