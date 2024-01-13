import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, Legend ,ChartDataset } from 'chart.js';
import 'chartjs-plugin-datalabels';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  public chartReady = false;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
         color: 'rgb(255, 99, 132)'
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 16,
        },
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels && ctx.chart.data.labels[ctx.dataIndex];
          const data = ctx.chart.data.datasets && ctx.chart.data.datasets[0].data[ctx.dataIndex];
          return `${label}: ${data}`;
        },

      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  public pieChartLabels= ["Liked", "No liked"];
  public pieChartDatasets: ChartDataset[] = [
    {
      data: [0, 0],
      backgroundColor: ['rgb(229, 29, 236)', '#F46C23'],
      borderColor: ['rgb(0,0,0)', 'rgb(0,0,0)'],
    },
  ];
  public pieChartType: ChartType = "doughnut";
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor( private userservice: UserService) { }

  ngOnInit() {
    this.chartReady= true
    this.getrate()
  }


getrate(){
  this.userservice.Rate().subscribe(data=>{
    console.log(data)
    this.pieChartDatasets[0].data= [data.liked, data.disliked]
    this.pieChartLabels= ["liked", "No liked"]
  })
}

  public chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

}
