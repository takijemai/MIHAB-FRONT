import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }



  SendMessage(senderId:any,receiverId:any,receiverName:any,message:any):Observable <any>{
    return this.http.post(`${environment.BASEURL}/chat-message/${senderId}/${receiverId}`,{
      receiverId,receiverName,message
    }, { withCredentials: true })
  }

  GetAllMessages(senderId:any,receiverId:any):Observable <any>{
    return this.http.get(`${environment.BASEURL}/chat-message/${senderId}/${receiverId}`,{ withCredentials: true })
  }

  MarkMessages(sender:any,receiver:any):Observable <any>{
    return this.http.get(`${environment.BASEURL}/receiver-messages/${sender}/${receiver}`,{ withCredentials: true })
  }
  MarkAllMessages():Observable <any>{
    return this.http.get(`${environment.BASEURL}/mark-all-messages`,{ withCredentials: true })
  }
}
