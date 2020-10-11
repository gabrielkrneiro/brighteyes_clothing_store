import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardService } from './dashboard.service'
import { ClothesAvailabilityMetrics, StatisticsResponse, MonthEnum, Month } from './dashboard.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics$: Observable<StatisticsResponse>
  statistics: StatisticsResponse
  clothesAvailability: { labels: string[][], values: number[] }
  clientRegisterMetrics: { label: string, data: Month[] }

  constructor(
    private dashboardService: DashboardService
  ) { }

  async ngOnInit(): Promise<void> {

    this.statistics$ = this.dashboardService.getStatistics()
    const response = await this.statistics$.toPromise()
    this.clothesAvailability = {
      labels: response.clothes_availability_quantity.map(o => [o.status]),
      values: response.clothes_availability_quantity.map(o => o.quantity)
    } 

    this.clientRegisterMetrics = {
      label: 'Quantity of clients',
      data: response.client_availability_quantity.data
    }
  }
}
