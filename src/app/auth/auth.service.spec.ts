import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClientTesting(), AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in successfully and set token, role, and auth status', () => {
    const mockRequest: LoginRequest = {
      userName: 'testuser',
      password: 'testpass',
    };

    const mockResponse: LoginResponse = {
      success: true,
      message: 'Login successful',
      token: 'mock-token',
      role: 'Admin',
    };

    let authStatus: boolean | undefined;
    service.authStatus.subscribe((status) => (authStatus = status));

    service.login(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('accessToken')).toBe('mock-token');
      expect(localStorage.getItem('role')).toBe('Admin');
      expect(authStatus).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}api/Admin/Login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should not set token or role if login fails', () => {
    const mockRequest: LoginRequest = {
      userName: 'baduser',
      password: 'badpass',
    };

    const mockResponse: LoginResponse = {
      success: false,
      message: 'Login failed',
      token: '',
      role: '',
    };

    let authStatus: boolean | undefined;
    service.authStatus.subscribe((status) => (authStatus = status));

    service.login(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('role')).toBeNull();
      expect(authStatus).toBeFalse();
    });

    const req = httpMock.expectOne(`${environment.baseUrl}api/Admin/Login`);
    req.flush(mockResponse);
  });

  it('should clear localStorage and update authStatus on logout', () => {
    localStorage.setItem('accessToken', 'token');
    localStorage.setItem('role', 'Admin');

    let authStatus: boolean | undefined;
    service.authStatus.subscribe((status) => (authStatus = status));

    service.logout();

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(authStatus).toBeFalse();
  });

  it('should return correct authentication status', () => {
    expect(service.isAuthenticated()).toBeFalse();

    localStorage.setItem('accessToken', 'token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return correct role', () => {
    expect(service.getRole()).toBeNull();

    localStorage.setItem('role', 'Admin');
    expect(service.getRole()).toBe('Admin');
  });

  it('should return true for isAdmin() if role is Admin', () => {
    localStorage.setItem('role', 'Admin');
    expect(service.isAdmin()).toBeTrue();

    localStorage.setItem('role', 'User');
    expect(service.isAdmin()).toBeFalse();
  });
});
