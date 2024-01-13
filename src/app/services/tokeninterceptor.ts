import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { Observable, from, switchMap } from "rxjs";
@Injectable()
export class Tokeninterceptor implements HttpInterceptor {

  constructor(private token: TokenService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.token.getToken())
    .pipe(
      switchMap(token => {
        //console.log(token);

         const headers = req.headers
                  .set('Authorization', token || 'hi')
                  .append('Content-Type', 'application/json');
         const requestClone = req.clone({
           headers
          });
        return next.handle(requestClone);
      })
     );

     }
}
