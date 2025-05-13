import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarCompany } from '../car-company';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-car',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss',
})
export class AddCarComponent implements OnInit {
  form!: FormGroup;
  companies: CarCompany[] = [];
  selectedCountry: string = '';
  filteredCompanies: CarCompany[] = [];
  uniqueCountries: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      model: ['', [Validators.required, Validators.maxLength(100)]],
      year: [
        2024,
        [Validators.required, Validators.min(1900), Validators.max(2100)],
      ],
      carCompnyId: [null, Validators.required],
    });

    this.http
      .get<CarCompany[]>(`${environment.baseUrl}api/carcompanies`)
      .subscribe({
        next: (data) => {
          this.companies = data;
          const countries = new Set(data.map((c) => c.countryOrigin));
          this.uniqueCountries = Array.from(countries);
        },
        error: (err) => console.error('Failed to load companies:', err),
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.http
        .post(`${environment.baseUrl}api/cars`, this.form.value)
        .subscribe({
          next: () => {
            this.snackBar.open('✅ Car added successfully!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/cars']);
          },
          error: (err) => {
            this.snackBar.open('❌ Failed to add car.', 'Close', {
              duration: 3000,
            });
            console.error(err);
          },
        });
    }
  }

  filterCompanies() {
    this.filteredCompanies = this.companies.filter(
      (c) => c.countryOrigin === this.selectedCountry
    );
  }
}
