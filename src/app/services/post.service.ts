import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  AddPost(body:any): Observable<any>{
    return this.http.post(`${environment.BASEURL}/post/add-post`, body,  { withCredentials: true })
  }
  GetAllPots(): Observable<any>{
    return this.http.get(`${environment.BASEURL}/posts`,   { withCredentials: true })
  }
  AddLike(body:any): Observable<any>{
    return this.http.post(`${environment.BASEURL}/post/add-like`,body,   { withCredentials: true })
  }

  AddFaovrite(body:any): Observable<any>{
    return this.http.post(`${environment.BASEURL}/post/add-favorite`,body,   { withCredentials: true })
  }
  DeleteFaovrite(id:any): Observable<any>{
    return this.http.delete(`${environment.BASEURL}/post/delete-favorite/${id}`,   { withCredentials: true })
  }

  AddComment(postId:any, comment: any): Observable<any>{
    return this.http.post(`${environment.BASEURL}/post/add-comments`,{postId, comment},   { withCredentials: true })
  }

  GetPost(id:any): Observable<any>{
    return this.http.get(`${environment.BASEURL}/post/${id}`,   { withCredentials: true })
  }
  EditPost(body:any): Observable<any>{
    return this.http.put(`${environment.BASEURL}/post/edit-post`, body,  { withCredentials: true })
  }

  DeletePost(id:any):Observable <any>{
    return this.http.delete(`${environment.BASEURL}/post/delete-post/${id}`, { withCredentials: true })
  }
}
