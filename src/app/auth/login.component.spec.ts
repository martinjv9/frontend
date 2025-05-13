import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: any;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [LoginComponent, MatSnackBarModule],
      providers: [
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should call AuthService.login on valid for submission (success)', () => {
    const loginResult = {
      success: true,
      message: '',
      token: '',
      role: 'Admin',
    };
    authServiceSpy.login.and.returnValue(of(loginResult));

    component.form.setValue({ userName: 'admin', password: 'Passw0rd!' });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show snackbar on failed login', () => {
    const loginResult = { success: false, message: '', token: '', role: '' };
    authServiceSpy.login.and.returnValue(of(loginResult));

    component.form.setValue({ userName: 'admin', password: 'wrong' });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalled();
  });

  it('should show error snackbar if login request fails', () => {
    authServiceSpy.login.and.returnValue(
      throwError(() => new Error('Network Error'))
    );

    component.form.setValue({ userName: 'admin', password: '123' });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalled();
  });
});
