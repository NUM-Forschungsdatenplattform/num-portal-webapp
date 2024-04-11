import { IAqlCategoryApi } from '../../app/shared/models/aql/category/aql-category.interface'

export const mockAqlCategory1: IAqlCategoryApi = {
  id: 1,
  name: {
    de: 'Demografisch',
    en: 'Demographic',
  },
}

export const mockAqlCategory2: IAqlCategoryApi = {
  id: 2,
  name: {
    de: 'Medizinisch',
    en: 'Medical',
  },
}

export const mockAqlCategory3: IAqlCategoryApi = {
  id: 3,
  name: {
    de: 'Sozial',
    en: 'Social',
  },
}

export const mockAqlCategories = [mockAqlCategory1, mockAqlCategory2, mockAqlCategory3]
