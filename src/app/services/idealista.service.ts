import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdealistaService {

  constructor(private http: HttpClient) { }

  getOAuthToken() :Observable<any>{
    //return this.http.get('${}/getToken', { withCredentials: true })
    return this.http.post(`${environment.SocketURL}getToken`, { withCredentials: true })
 }

 searchProperties(propertyType: string, city: string, maxPrice:string, operation:string,country:string,apiKey:string,center:string,distance:number) {
   const data = {propertyType, city, maxPrice, operation, country,apiKey,center,distance};
   return this.http.post(`${environment.SocketURL}searchProperties?propertyType=${propertyType}&
   city=${city}&maxPrice=${maxPrice}&operation=${operation}&country=${country}&apiKey=${apiKey}
   &center=${center}&distance=${distance}`,data);
 }

}
