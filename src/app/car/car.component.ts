import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Car } from '../car';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car',
  imports: [NgFor, MatCardModule, MatButtonModule, RouterLink, NgIf],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  page: number = 1;
  pageSize: number = 20;
  isLastPage: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === 'Admin';
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

  deleteCar(id: number): void {
    if (!confirm('Are you sure you want to delete this car?')) return;

    this.http.delete(`${environment.baseUrl}api/cars/${id}`).subscribe({
      next: () => {
        this.cars = this.cars.filter((car) => car.id !== id);
      },
      error: (err) => console.error('Failed to delete car:', err),
    });
  }
}
