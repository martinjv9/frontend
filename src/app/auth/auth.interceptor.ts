import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let accessToken = localStorage.getItem("accessToken");
  if(accessToken){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
  }
  return next(req).pipe(catchError(error => {
    if(error instanceof HttpErrorResponse && error.status === 401){
      router.navigate(['/login']);
    }
    return throwError(() => error);
  }));
};
