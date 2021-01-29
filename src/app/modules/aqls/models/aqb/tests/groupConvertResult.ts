export const json1 = {
  _type: 'ComparisonOperator',
  statement: { _type: 'SelectField', aqlPath: '/path', containmentId: 2, name: 'test' },
  symbol: 'EQ',
  value: { _type: 'Simple', value: '' },
}

export const json2 = {
  _type: 'LogicalOperator',
  symbol: 'AND',
  values: [
    {
      _type: 'ComparisonOperator',
      statement: {
        _type: 'SelectField',
        aqlPath: '/path',
        containmentId: 2,
        name: 'test',
      },
      symbol: 'EQ',
      value: {
        _type: 'Simple',
        value: '',
      },
    },
    {
      _type: 'ComparisonOperator',
      statement: {
        _type: 'SelectField',
        aqlPath: '/path',
        containmentId: 4,
        name: 'test',
      },
      symbol: 'EQ',
      value: {
        _type: 'Simple',
        value: true,
      },
    },
  ],
}

export const json3 = {
  _type: 'LogicalOperator',
  symbol: 'AND',
  values: [
    {
      _type: 'ComparisonOperator',
      statement: { _type: 'SelectField', aqlPath: '/path', containmentId: 2, name: 'test' },
      symbol: 'EQ',
      value: { _type: 'Simple', value: '' },
    },
    {
      _type: 'LogicalOperator',
      symbol: 'AND',
      values: [
        {
          _type: 'ComparisonOperator',
          statement: { _type: 'SelectField', aqlPath: '/path', containmentId: 4, name: 'test' },
          symbol: 'EQ',
          value: { _type: 'Simple', value: true },
        },
        {
          _type: 'ComparisonOperator',
          statement: { _type: 'SelectField', aqlPath: '/path', containmentId: 6, name: 'test' },
          symbol: 'EQ',
          value: { _type: 'Simple', value: 0 },
        },
      ],
    },
  ],
}
