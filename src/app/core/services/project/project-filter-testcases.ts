import { ProjectFilterChipId } from 'src/app/shared/models/project/project-filter-chip.enum'
import { IProjectFilter } from 'src/app/shared/models/project/project-filter.interface'

export const projectFilterTestcases: { filter: IProjectFilter; resultLength: number }[] = [
  {
    filter: {
      filterItem: [
        {
          id: ProjectFilterChipId.Archived,
          isSelected: true,
          title: '',
        },
      ],
      searchText: '',
    },
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [
        {
          id: ProjectFilterChipId.AllProjects,
          isSelected: true,
          title: '',
        },
      ],
      searchText: '',
    },
    resultLength: 2,
  },
  {
    filter: {
      filterItem: [
        {
          id: ProjectFilterChipId.MyProjects,
          isSelected: true,
          title: '',
        },
      ],
      searchText: '',
    },
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [
        {
          id: ProjectFilterChipId.OrganizationProjects,
          isSelected: true,
          title: '',
        },
      ],
      searchText: '',
    },
    resultLength: 0,
  },
]
