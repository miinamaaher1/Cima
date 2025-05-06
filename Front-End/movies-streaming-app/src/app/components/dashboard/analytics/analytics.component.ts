import { Component } from '@angular/core';
import { MovieListServiceService } from '../../../core/services/lists/movieList/movie-list-service.service';
import { SeriesListServiceService } from '../../../core/services/lists/seriesList/series-list-service.service';
import { language } from '../../../core/utils/language.enum';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../../core/services/dasboard/dashboard.service';

@Component({
  selector: 'app-analytics',
  imports: [BaseChartDirective],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent {
  totalMediaCount = 0;
  totalMovies = 0;
  totalSeries = 0;
  totalViews = 0;

  constructor(
    private _dashboardService:DashboardService
  ) { }

  ngOnInit(): void {
    this._dashboardService.getAnalyticsCards().subscribe(counts => {
      this.totalMediaCount = counts.seriesCount + counts.moviesCount;
      this.totalMovies = counts.moviesCount;
      this.totalSeries = counts.seriesCount;
      this.totalViews  = counts.totalViews;
    });
    this._dashboardService.getMonthlyViews().subscribe(views=>{
      this.barData.labels= Object.keys(views);
      this.barData.datasets[0].data= Object.values(views);
    })

    this._dashboardService.getGenreViews().subscribe(views=>{
      this.radarData.labels= Object.keys(views);
      this.radarData.datasets[0].data= Object.values(views);
    })

    this._dashboardService.getUserStatistics().subscribe(users => {
      this.doughnutData.labels = ["Anonymous", "Authenticated" , "Subscribed"];
      this.doughnutData.datasets[0].data = [users.anonUsers,users.authUsers,users.subUsers]
    });
  }




  barData = {
    labels:[''],
    datasets: [{
      label: 'First tholth Views',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  
  radarData = {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'My Second Dataset',
      data: [28000, 4800, 40976, 19123, 9116, 20877, 10110],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };

  doughnutData = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };


}
