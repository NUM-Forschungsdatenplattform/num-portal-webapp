import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { mockUser } from './admin.mock'

export const mockAql1: IAqlApi = {
  id: 1,
  name: 'name1',
  query: 'quer1',
  purpose: '',
  use: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
}

export const mockAql2: IAqlApi = {
  id: 2,
  name: 'name2',
  query: 'quer2',
  purpose: '',
  use: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
}

export const mockAql3: IAqlApi = {
  id: 3,
  name: 'name3 with parame',
  query: 'quer3 has this $parameter and also $this',
  purpose: '',
  use: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
}

export const mockAql4: IAqlApi = {
  id: 4,
  name: 'name4 with parameter',
  query: 'quer4 has just this $parameter',
  purpose: '',
  use: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
}

export const mockAqls: IAqlApi[] = [mockAql1, mockAql2]

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
export const mockAqlsToFilter: DeepPartial<IAqlApi>[] = [
  {
    id: 1,
    name: 'aqlName1',
    owner: {
      id: '1',
      firstName: '',
      lastName: '',
      organization: {
        id: 1,
      },
    },
  },
  {
    id: 2,
    name: 'aqlName2',
    owner: {
      id: '1',
      firstName: 'firstname2',
      lastName: null,
      organization: {
        id: null,
      },
    },
  },
  {
    id: 3,
    name: 'aqlName3',
    owner: {
      id: '1',
      firstName: null,
      lastName: null,
      organization: null,
    },
  },
  {
    id: 4,
    name: null,
    owner: {
      id: '2',
      firstName: 'firstName4',
      lastName: 'lastName4',
      organization: {
        id: 2,
      },
    },
  },
  {
    id: 44,
    name: null,
    owner: {
      id: '22',
      firstName: 'firstName4',
      lastName: 'lastName4',
      organization: null,
    },
  },
]
