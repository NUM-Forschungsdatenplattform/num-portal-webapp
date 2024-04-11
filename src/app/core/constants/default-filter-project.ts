import { ProjectFilterChipId } from 'src/app/shared/models/project/project-filter-chip.enum'
import { IProjectFilter } from 'src/app/shared/models/project/project-filter.interface'

export const DEFAULT_PROJECT_FILTER: IProjectFilter = {
  searchText: '',
  filterItem: [
    {
      id: ProjectFilterChipId.AllProjects,
      title: 'FILTER_CHIP.ALL',
      isSelected: true,
    },
    {
      id: ProjectFilterChipId.MyProjects,
      title: 'FILTER_CHIP.MY_PROJECTS',
      isSelected: false,
    },
    {
      id: ProjectFilterChipId.OrganizationProjects,
      title: 'FILTER_CHIP.ORGANIZATION',
      isSelected: false,
    },
    {
      id: ProjectFilterChipId.Archived,
      title: 'FILTER_CHIP.ARCHIVED',
      isSelected: false,
    },
  ],
}
