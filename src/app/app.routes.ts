import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  {
    path: 'weather',
    component: WeatherComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: '',
    component: WeatherComponent,
    pathMatch: 'full',
  },
];
