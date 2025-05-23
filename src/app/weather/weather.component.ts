import { Component } from '@angular/core';
import { WeatherForecast } from '../weather-forecast';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http
      .get<WeatherForecast[]>(`${environment.baseUrl}weatherforecast`)
      .subscribe(
        (result) => {
          this.forecasts = result;
        },
        (error) => {
          console.error('Error fetching weather forecasts:', error);
        }
      );
  }
}
