import { Component, OnInit } from '@angular/core'
import { AqlService } from 'src/app/core/services/aql.service'

@Component({
  selector: 'num-aqls',
  templateUrl: './aqls.component.html',
  styleUrls: ['./aqls.component.scss'],
})
export class AqlsComponent implements OnInit {
  constructor(private aqlService: AqlService) {}

  ngOnInit(): void {
    this.aqlService.getAll().subscribe()
  }
}
