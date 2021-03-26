import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

export interface IProjectResolved {
  error: string
  project: ProjectUiModel
}
