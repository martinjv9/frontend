import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CarCompany } from '../car-company';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-car-company',
  imports: [NgFor, MatCardModule],
  templateUrl: './car-company.component.html',
  styleUrl: './car-company.component.scss',
})
export class CarCompanyComponent implements OnInit {
  companies: CarCompany[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<CarCompany[]>(`${environment.baseUrl}api/carcompanies`)
      .subscribe({
        next: (data) => (this.companies = data),
        error: (err) => console.error('Failed to fetch companies:', err),
      });
  }
}
