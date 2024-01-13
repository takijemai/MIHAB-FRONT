import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  GetAllUsers():Observable <any>{
    return this.http.get(`${environment.BASEURL}/users` ,{ withCredentials: true })
  }
  GetUserid(id:any):Observable <any>{
    return this.http.get(`${environment.BASEURL}/user/${id}`,{ withCredentials: true })
  }
  GetUsername(username: any):Observable <any>{
    return this.http.get(`${environment.BASEURL}/users/${username}`,{ withCredentials: true })
  }
  MarkNotification(id:any, deleteValue:any):Observable <any>{
    return this.http.post(`${environment.BASEURL}/mark/${id}`,{id,deleteValue},{ withCredentials: true })
  }

  MarkAllAsRead():Observable <any>{
    return this.http.post(`${environment.BASEURL}/mark-all`,{all:true},{ withCredentials: true })
  }

  AddImage(image:any):Observable <any>{
    return this.http.post(`${environment.BASEURL}/upload-image`,{image},{ withCredentials: true })
  }
  AddImagepost(image:any):Observable <any>{
    return this.http.post(`${environment.BASEURL}/add-image`,{image},{ withCredentials: true })
  }
  DeleteImage(imgId:string):Observable <any>{
    return this.http.delete(`${environment.BASEURL}/delete-image/${imgId}`,{ withCredentials: true })
  }
  SetDefaultImage(imageId:any,imageVersion:any):Observable <any>{
    return this.http.get(`${environment.BASEURL}/set-default-image/${imageId}/${imageVersion}`,{ withCredentials: true })
  }
  ChangePassword(body:any):Observable <any>{
    return this.http.post(`${environment.BASEURL}/change-password`,body,{ withCredentials: true })
  }
  valorate(liked: boolean):Observable <any>{
    return this.http.post(`${environment.BASEURL}/valorate`,{ liked },{ withCredentials: true })
  }
  Rate():Observable <any>{
    return this.http.get(`${environment.BASEURL}/rating`,{ withCredentials: true })
  }
  Contact(value:any):Observable <any>{
    return this.http.post(`${environment.BASEURL}/contactus`,value,{ withCredentials: true })
  }
  ResetPassword(email:string):Observable <any>{
    const body= {email:email}
    return this.http.post(`${environment.BASEURL}/reset-password`,body,{ withCredentials: true })
  }



}
