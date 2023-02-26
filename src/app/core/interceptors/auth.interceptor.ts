import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const clonedReq = request.clone({
      url: `${request.url}/`,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(clonedReq);
  }
}
