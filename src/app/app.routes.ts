import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { NavBarComponent } from './navbar/navbar.component';
import { CarComponent } from './car/car.component';
import { CarCompanyComponent } from './car-company/car-company.component';
import { LoginComponent } from './auth/login.component';
import { AddCarComponent } from './add-car/add-car.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'weather',
    component: WeatherComponent,
  },
  {
    path: 'navbar',
    component: NavBarComponent,
  },
  {
    path: 'cars',
    component: CarComponent,
  },
  {
    path: 'carCompanies',
    component: CarCompanyComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'add-car',
    component: AddCarComponent,
    canActivate: [AdminGuard],
  },
  {
    path: '',
    component: WeatherComponent,
    pathMatch: 'full',
  },
];
