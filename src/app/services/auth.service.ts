import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

RegitserUser(value:any): Observable<any>{
  return this.http.post(`${environment.BASEURL}/register`, value)
}

LoginUser(email:string, password:string): Observable<any>{
  return this.http.post(`${environment.BASEURL}/login`, {email, password})
}

}
