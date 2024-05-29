export const json1 = {
  _type: 'ComparisonOperator',
  statement: { _type: 'IdentifiedPath', path: 'path', root: 'o1' },
  symbol: 'EQ',
  value: { _type: 'DV_TEXT', value: ' ' },
}

export const json2 = {
  _type: 'LogicalOperator',
  symbol: 'AND',
  values: [
    {
      _type: 'ComparisonOperator',
      statement: {
        _type: 'IdentifiedPath',
        path: 'path',
        root: 'o1',
      },
      symbol: 'EQ',
      value: {
        _type: 'DV_TEXT',
        value: ' ',
      },
    },
    {
      _type: 'ComparisonOperator',
      statement: {
        _type: 'IdentifiedPath',
        path: 'path',
        root: 'o2',
      },
      symbol: 'EQ',
      value: {
        _type: 'DV_BOOLEAN',
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
      statement: { _type: 'IdentifiedPath', path: 'path', root: 'o1' },
      symbol: 'EQ',
      value: { _type: 'DV_TEXT', value: ' ' },
    },
    {
      _type: 'LogicalOperator',
      symbol: 'AND',
      values: [
        {
          _type: 'ComparisonOperator',
          statement: { _type: 'IdentifiedPath', path: 'path', root: 'o2' },
          symbol: 'EQ',
          value: { _type: 'DV_BOOLEAN', value: true },
        },
        {
          _type: 'ComparisonOperator',
          statement: { _type: 'IdentifiedPath', path: 'path', root: 'o3' },
          symbol: 'EQ',
          value: { _type: 'Long', value: 0 },
        },
      ],
    },
  ],
}
