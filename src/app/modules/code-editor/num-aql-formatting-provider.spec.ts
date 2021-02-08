import { NumAqlFormattingProvider } from './num-aql-formatting-provider'

describe('NumAqlFormattingProvider', () => {
  const mockModel = ({
    getValue: jest.fn(),
  } as unknown) as monaco.editor.ITextModel
  const provider = new NumAqlFormattingProvider()

  const testcases = [
    {
      input: 'SELECT one two three',
      output: 'SELECT\n  one two three',
    },
    {
      input: '         select one two three   ',
      output: 'SELECT\n  one two three',
    },
    {
      input: 'SELECT one, two, thre',
      output: 'SELECT\n  one,\n  two,\n  thre',
    },
    {
      input: 'SELECT one and two',
      output: 'SELECT\n  one\n  and two',
    },
    {
      input: 'select one or two from three',
      output: 'SELECT\n  one\n  or two\nFROM\n  three',
    },
    {
      input: 'select one and two from three contains four',
      output: 'SELECT\n  one\n  and two\nFROM\n  three\n  contains four',
    },
    {
      input: 'select one contains two and contains three',
      output: 'SELECT\n  one\n  contains two\n  and\n  contains three',
    },
  ]

  test.each(testcases)('should format as expected', (testcase) => {
    jest.spyOn(mockModel, 'getValue').mockImplementation(() => testcase.input)
    const result = provider.format(mockModel)
    const expectedResult = {
      range: {
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 100_000,
        endColumn: 100_000,
      },
      text: testcase.output,
    }
    expect(result).toEqual([expectedResult])
  })
})
