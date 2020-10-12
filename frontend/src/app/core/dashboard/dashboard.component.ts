import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardService } from './dashboard.service'
import { ClothesAvailabilityMetrics, StatisticsResponse, MonthEnum, Month, ClientAvailability } from './dashboard.interface'
import { ClientStatusEnum } from 'src/app/client/client.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics$: Observable<StatisticsResponse>
  statistics: StatisticsResponse
  clothesAvailability: { labels: string[][], values: number[] }
  clientAvailabilityMetrics: { labels: string[][], values: number[] }
  clientRegisterMetrics: { label: string, data: Month[] }
  shoppingCarCreatedInCurrentMonth: number
  clientCreatedInCurrentMonth: number

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

    this.clientAvailabilityMetrics = {
      labels: response.client_availability_quantity.map(o => [o.status]),
      values: response.client_availability_quantity.map(o => o.quantity)
    }

    this.shoppingCarCreatedInCurrentMonth = response.number_of_shopping_carts_created_current_month
    this.clientCreatedInCurrentMonth = response.quantity_of_clients_registered_in_current_month

    this.clientRegisterMetrics = {
      label: 'Quantity of clients',
      data: response.client_registered_current_year_by_month.data
    }

  }
}
