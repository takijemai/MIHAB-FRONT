import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'
import io from 'socket.io-client';
import * as moment from 'moment'
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-listchat',
  templateUrl: './listchat.page.html',
  styleUrls: ['./listchat.page.scss'],
})
export class ListchatPage implements OnInit {
user:any
username:any
chatlist:any=[]
socket:any
socketHost= environment.SocketURL
  constructor(private userservice: UserService, private tokenservice: TokenService,
     private messageservice: MessageService) {
      this.socket= io(this.socketHost)
      }

  ngOnInit() {
    this.tokenservice.getPayolad().then(value=>{
      this.user= value._id
      this.getuser(this.user)
    })
    this.socket.on('refreshPage',(data:any)=>{
      this.tokenservice.getPayolad().then(value=>{
        this.user= value._id
        this.getuser(this.user)
      })
    })
  }
getuser(id:any){
this.userservice.GetUserid(id).subscribe(data=>{
this.username= data.result.username
  //console.log(data);
this.chatlist= data.result.chatlist
console.log(this.chatlist);

})
}
TimeNow(time:any){
  const daynow= new Date()
  const date= new Date(time)
   const date1= moment(new Date(daynow))
   const date2= moment(new Date(date))
const timedate= date1.diff(date2,'days')
if(timedate === 0){
  return moment(time).format('LT')
}else{
  return  moment(time).format('DD/MM/YYYY')
}

}

 checklist(arr:any, name:any){
  let total= 0
  _.forEach(arr, val=>{
    if(val.isRead === false && val.receivername !== name){
      total+=1
    }
  })
  return total
 }

mark(item:any){
  this.messageservice.MarkMessages(this.username,item.receiverId.username).subscribe(data=>{
    console.log(data);
    this.socket.emit('refresh',{})

  })
}
}
