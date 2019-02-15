import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpotifyAuthService } from '../auth/spotify-auth.service';
import { TokenObject } from 'src/app/utils/typings/auth.typings';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: SpotifyAuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenObject: TokenObject = this.auth.getToken();

    if (tokenObject) {
      request = request.clone({
        setHeaders: {
          Authorization: `${tokenObject.token_type} ${tokenObject.access_token}`
        }
      });
    }

    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {

          if (event.body && event.body.error) throw (event);

        }

      }));
  }
}