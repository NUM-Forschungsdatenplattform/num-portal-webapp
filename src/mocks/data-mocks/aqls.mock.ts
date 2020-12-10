import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'

export const mockAql1: IAqlApi = {
  id: 1,
  name: 'name1',
  query: 'quer1',
}

export const mockAql2: IAqlApi = {
  id: 2,
  name: 'name2',
  query: 'quer2',
}

export const mockAql3: IAqlApi = {
  id: 3,
  name: 'name3 with parame',
  query: 'quer3 has this $parameter and also $this',
}

export const mockAql4: IAqlApi = {
  id: 4,
  name: 'name4 with parameter',
  query: 'quer4 has just this $parameter',
}

export const mockAqls: IAqlApi[] = [mockAql1, mockAql2]
