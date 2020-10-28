import { IAql } from 'src/app/core/models/aql.interface'

export const mockAql1: IAql = {
  id: 1,
  name: 'name1',
  query: 'quer1',
}

export const mockAql2: IAql = {
  id: 2,
  name: 'name2',
  query: 'quer2',
}

export const mockAqls: IAql[] = [mockAql1, mockAql2]
