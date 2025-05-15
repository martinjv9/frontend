import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginRequest } from './login-request';
import { AuthService } from './auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { routes } from '../app.routes';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    let loginRequest = <LoginRequest>{
      userName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value,
    };

    this.authService.login(loginRequest).subscribe({
      next: (result) => {
        if (result.success) {
          this.router.navigate(['/']);
          this.snackBar.open('✅ Login successful!', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('❌ Invalid login credentials.', 'Close', {
            duration: 3000,
          });
        }
      },
      error: (error) => {
        this.snackBar.open('❌ Login failed. Server error.', 'Close', {
          duration: 3000,
        });
        console.error(error);
      },
    });
  }
}
