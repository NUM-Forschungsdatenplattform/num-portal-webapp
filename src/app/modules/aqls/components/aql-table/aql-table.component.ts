import { Component, OnInit } from '@angular/core'
import { AqlService } from 'src/app/core/services/aql.service'

@Component({
  selector: 'num-aql-table',
  templateUrl: './aql-table.component.html',
  styleUrls: ['./aql-table.component.scss'],
})
export class AqlTableComponent implements OnInit {
  constructor(private aqlService: AqlService) {}

  displayedColumns: string[] = ['id', 'name']
  dataSource = this.aqlService.aqlsObservable$

  ngOnInit(): void {}
}
