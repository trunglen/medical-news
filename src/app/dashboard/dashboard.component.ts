import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Report } from './report.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  report: Report
  constructor(
    public dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.dashboardService.getReport().subscribe(res => {
      this.report = res;
    })
  }

}
