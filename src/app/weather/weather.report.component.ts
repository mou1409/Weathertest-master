import { Component } from '@angular/core';
import { HTTPSerivce } from '../httpServices/http.service'
import * as $ from 'jquery/dist/jquery.min.js';
@Component({
  selector: 'weather-report',
  templateUrl: './weather.report.component.html',
  styleUrls: ['./weather.report.component.css']
})
export class WeatherReport {
  search: string = '';
  weatherReports = [];
  inCorrectCity = false;
  title: string = '';
  chartData = [];

  constructor(private httpService: HTTPSerivce) {
  }

  getWeatherDetails() {
    let url = 'http://localhost:3000/api/byCity?city=' + this.search;
    this.httpService.getRequest(url).subscribe(data => {
      if (data.length > 0) {
        url = 'http://localhost:3000/api/byCode?code=' + data[0].woeid + '/';
        this.httpService.getRequest(url).subscribe(reports => {
          this.weatherReports = reports['consolidated_weather'];
          this.title = reports.title;
          this.weatherReports.forEach((report) => {
            this.chartData.push({
              date: new Date(report.applicable_date),
              value: report.the_temp
            })
          })
        });
      } else {
        this.inCorrectCity = true;
        this.weatherReports = [];
      }
    });
  }

}
