import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('https://free-to-play-games-database.p.rapidapi.com/api'))
      request = request.clone({
                  headers: request.headers.set('X-RapidAPI-Key', '836d7e7980msh3bbc47dc0399fc2p18224ajsnaa3965323738')
                  .set('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com')
                })
    return next.handle(request);
  }
}
