import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../../../../config/app-config.service';

@Component({
  selector: 'num-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appConfig = AppConfigService.config;

  constructor() { }

  ngOnInit(): void {
  }

}
