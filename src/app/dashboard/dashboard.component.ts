import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public config: any;
  public month: string;
  public year: number;
  public optionsTransportChart: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
  };

  public optionsPaymentsChart: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 3000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
  };

  public optionsEnergyChart: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 2000,
    high: 13000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
  };

  public sustinabilityPoints: number;
  public karmaPoints: number;


  constructor(private http: HttpClient) {
  }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
    this.http.get('https://footlose-backend.azurewebsites.net/dashboard', {
      params: {
        userId: 'test11',
        month: '10',
        year: '2019'
      }
    }).subscribe((response: any) => {
      this.config = response;
      this.sustinabilityPoints = this.config.sustainabilityPoints;
      this.karmaPoints = this.config.karmaPoints;
      const transportValues = (Object as any).values(this.config.sustainabilityCharts.transport);
      const dataTransportChart: any = {
        labels: ['A', 'B', 'C', 'D'],
        series: [
          transportValues
        ]
      };
      const transportChart = new Chartist.Bar('#dailySalesChart', dataTransportChart, this.optionsTransportChart);

      this.startAnimationForLineChart(transportChart);

      const paymentsValues = (Object as any).values(this.config.sustainabilityCharts.payments);
      const dailyPaymentsChart: any = {
        labels: ['A', 'B', 'C', 'D', 'E'],
        series: [
          paymentsValues
        ]
      };
      const paymentsChart = new Chartist.Bar('#websiteViewsChart', dailyPaymentsChart, this.optionsPaymentsChart);

      this.startAnimationForLineChart(paymentsChart);

      const energyValues = (Object as any).values(this.config.sustainabilityCharts.energyConsumption);
      const dailyEnergyChart: any = {
        labels: ['Gas', 'Electricity'],
        series: [
          energyValues
        ]
      };
      const energyChart = new Chartist.Bar('#completedTasksChart', dailyEnergyChart, this.optionsEnergyChart);

      this.startAnimationForLineChart(energyChart);

    });

  }

}
