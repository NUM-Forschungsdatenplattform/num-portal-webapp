import { ObjectToArrayPipe } from './object-to-array.pipe'

describe('ObjectToArrayPipe', () => {
  let pipe: ObjectToArrayPipe

  beforeEach(() => {
    pipe = new ObjectToArrayPipe()
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })
})
