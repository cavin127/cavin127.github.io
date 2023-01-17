import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NbaInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authHeaders = request.clone({
      headers: request.headers
        .set(
          'X-RapidAPI-Key',
          '828143929dmsh68f0b8aca4de4aap122d95jsnc1463b93b0f1'
        )
        .set('X-RapidAPI-Host', 'free-nba.p.rapidapi.com'),
    });
    return next.handle(authHeaders);
  }
}
