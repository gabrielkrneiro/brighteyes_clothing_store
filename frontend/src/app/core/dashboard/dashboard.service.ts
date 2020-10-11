import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  StatisticsResponse
} from './dashboard.interface'
import { environment } from './../../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getStatistics(): Observable<StatisticsResponse> {
    return this.httpClient.get<{ data: StatisticsResponse }>(`http://${environment.BACKEND_ADDRESS}/statistics`)
      .pipe(map(
        (response: { data: StatisticsResponse }) => response.data
      ))
  }
}
