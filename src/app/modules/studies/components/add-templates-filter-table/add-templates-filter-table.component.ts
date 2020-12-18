import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { TemplateService } from 'src/app/core/services/template.service'
import { IStudyTemplateInfoApi } from 'src/app/shared/models/study/study-template-info-api.interface'
import { ITemplateMetaDataApi } from 'src/app/shared/models/template/template-api.interface'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'num-add-templates-filter-table',
  templateUrl: './add-templates-filter-table.component.html',
  styleUrls: ['./add-templates-filter-table.component.scss'],
})
export class AddTemplatesFilterTableComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  private subscriptions = new Subscription()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @Input() selectedTemplates: IStudyTemplateInfoApi[]
  @Output() selectedTemplatesChange = new EventEmitter<IStudyTemplateInfoApi[]>()

  constructor(private templateService: TemplateService) {}
  dataSource = new MatTableDataSource<ITemplateMetaDataApi>()
  displayedColumns: string[] = ['name', 'icon']
  lookupSelectedTemplates: { [id: number]: boolean } = {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.templateService.filteredTemplatesObservable$.subscribe((templates) =>
        this.handleData(templates)
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'selectedTemplates': {
            const changedData = changes[propName].currentValue as IStudyTemplateInfoApi[]
            const selectedTemplates: { [id: number]: boolean } = {}
            changedData.forEach(
              (selectedTemplate) => (selectedTemplates[selectedTemplate.id] = true)
            )
            this.lookupSelectedTemplates = selectedTemplates
          }
        }
      }
    }
  }

  handleData(templates: ITemplateMetaDataApi[]): void {
    this.dataSource.data = templates
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  handleSelectClick(row: ITemplateMetaDataApi): void {
    this.lookupSelectedTemplates[row.templateId] = true
    const studyTemplate: IStudyTemplateInfoApi = {
      id: row.templateId,
      name: row.name,
    }
    this.selectedTemplatesChange.emit([...this.selectedTemplates, studyTemplate])
  }

  handleDeselectClick(row: ITemplateMetaDataApi): void {
    const newSelection = this.selectedTemplates.filter(
      (selectedTemplate) => selectedTemplate.id !== row.templateId
    )
    this.lookupSelectedTemplates[row.templateId] = false
    this.selectedTemplatesChange.emit(newSelection)
  }
}
