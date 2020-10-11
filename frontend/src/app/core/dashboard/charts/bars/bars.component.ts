import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

enum MonthEnum {
  JAN = 'Jan',
  FEV = 'Fev',
  MAR = 'Mar',
  APR = 'Apr',
  MAY = 'May',
  JUN = 'Jun',
  JUL = 'Jul',
  AUG = 'Aug',
  SEP = 'Sep',
  OCT = 'Oct',
  NOV = 'Nov',
  DEC = 'Dec'
}

interface Month {
  name: MonthEnum,
  client_quantity: number
}

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss']
})
export class BarsComponent implements OnInit {
  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType
  public barChartLegend: boolean
  public barChartPlugins: any[]
  public barChartData: ChartDataSets[]
  public months: Month[]

  ngOnInit(): void {
    this.months = [
      {
        name: MonthEnum.JAN,
        client_quantity: null
      },
      {
        name: MonthEnum.FEV,
        client_quantity: null
      },
      {
        name: MonthEnum.MAR,
        client_quantity: null
      },
      {
        name: MonthEnum.APR,
        client_quantity: null
      },
      {
        name: MonthEnum.MAY,
        client_quantity: null
      },
      {
        name: MonthEnum.JUN,
        client_quantity: null
      },
      {
        name: MonthEnum.JUL,
        client_quantity: null
      },
      {
        name: MonthEnum.AUG,
        client_quantity: null
      },
      {
        name: MonthEnum.SEP,
        client_quantity: null
      },
      {
        name: MonthEnum.OCT,
        client_quantity: null
      },
      {
        name: MonthEnum.NOV,
        client_quantity: null
      },
      {
        name: MonthEnum.DEC,
        client_quantity: null
      },
    ]
    this.barChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    this.barChartLabels = this.months.map(o => o.name)
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [pluginDataLabels];
    this.barChartData = [
      { 
        data: this.months.map(o => o.client_quantity), 
        label: 'Quantity of clients' 
      }
    ];
  }
}
