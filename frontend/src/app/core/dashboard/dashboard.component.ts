import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardService } from './dashboard.service'
import { StatisticsResponse } from './dashboard.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics$: Observable<StatisticsResponse>
  statistics: StatisticsResponse

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.statistics$ = this.dashboardService.getStatistics()
    this.statistics$.subscribe(
      observer => {
        this.statistics = observer
        console.log(this.statistics)
      }
    )
  }

}
