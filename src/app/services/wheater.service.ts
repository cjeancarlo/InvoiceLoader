import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WheaterService {

  public weather: any;

  
  constructor(private http: HttpClient) {
    this.weather = [];  
  }

  public getWeather(coordinates: any)  {
    this.http.jsonp(
      "https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + environment.app_id + "&app_code=" + environment.app_code, "jsonpCallback")
        .pipe(
          map(result => (<any>result).dailyForecasts.forecastLocation))
        .subscribe(result => {
            this.weather = result.forecast;
        }, error => {
            console.error(error);
        });
}

}
