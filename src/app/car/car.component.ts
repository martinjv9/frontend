import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Car } from '../car';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-car',
  imports: [NgFor, MatCardModule, MatButtonModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  page: number = 1;
  pageSize: number = 20;
  isLastPage: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.http
      .get<Car[]>(
        `${environment.baseUrl}api/cars/cars?page=${this.page}&pageSize=${this.pageSize}`
      )
      .subscribe({
        next: (data) => {
          this.cars = data;
          this.isLastPage = data.length < this.pageSize;
        },
        error: (err) => console.error('Failed to fetch cars:', err),
      });
  }

  nextPage(): void {
    this.page++;
    this.loadCars();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCars();
    }
  }
}
