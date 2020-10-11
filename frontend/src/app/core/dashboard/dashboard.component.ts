import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardService } from './dashboard.service'
import { ClothesAvailabilityMetrics, StatisticsResponse } from './dashboard.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics$: Observable<StatisticsResponse>
  statistics: StatisticsResponse
  clothesAvailability: { labels: string[][], values: number[] }

  constructor(
    private dashboardService: DashboardService
  ) { }

  async ngOnInit(): Promise<void> {
    // this.clothesAvailability.labels = [["123"], ["555"]]
    // this.clothesAvailability = { labels: [["asdf"], ["12312"]], values: [1,8] }
    this.statistics$ = this.dashboardService.getStatistics()
    // this.statistics$.subscribe(
    //   observer => {
    //     this.statistics = observer
    //   }
    // )
    const response = await this.statistics$.toPromise()
    console.log(response.clothes_availability_quantity)
    this.clothesAvailability = {
      labels: response.clothes_availability_quantity.map(o => [o.status]),
      values: response.clothes_availability_quantity.map(o => o.quantity)
    }
    
  }

  clothesAvailabilityValues(data: ClothesAvailabilityMetrics[]) {

    // this.clothesAvailability.labels = data.map(o => [o.status])
    // this.clothesAvailability.values = data.map(o => o.quantity)
  }

}
