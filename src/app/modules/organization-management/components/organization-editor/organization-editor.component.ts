import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IOrganizationResolved } from '../../models/organization-resolved.interface'

@Component({
  selector: 'num-organization-editor',
  templateUrl: './organization-editor.component.html',
  styleUrls: ['./organization-editor.component.scss'],
})
export class OrganizationEditorComponent implements OnInit {
  resolvedData: IOrganizationResolved

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData
  }
}
