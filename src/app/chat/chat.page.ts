import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client';
import { MessageService } from '../services/message.service';
import * as _ from 'lodash'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent)content!: IonContent;
  user:any
username:any
message!: string
toggled: boolean = false;
socket: any
socketHost=environment.SocketURL
receiverName:any
receiverdata:any
msgArray:any=[]
isTyping= false
Online = false
typingMessage:any
  constructor(private router:Router
    ,private tokenservice: TokenService,
    private route: ActivatedRoute,
    private userservice: UserService,private messageservice: MessageService) {
      this.socket= io(this.socketHost)
this.receiverName=this.route.snapshot.paramMap.get('username')
this.getusername()
    }

  ngOnInit() {
    this.tokenservice.getPayolad().then(value=>{
      this.user= value._id
this.getuser()
this.getallmessages(this.user,this.receiverdata._id)

const val= {
  room:'global',
  user: this.username
}
this.socket.emit('online', val)

const params= {
  room1: this.username,
  room2:this.receiverName
}
this.socket.emit('join chat', params)
    })

    this.socket.on('refreshPage',(data:any)=>{
      this.getuser()
      this.getallmessages(this.user,this.receiverdata._id)
    })
    this.listening()
  }
   ionViewDidEnter(){
    const params= {
      room1: this.username,
      room2:this.receiverName
    }
    this.socket.emit('join chat', params)
   }
getuser(){
  this.userservice.GetUserid(this.user).subscribe(data=>{
//console.log(data)
this.username= data.result.username

  })
}

getusername(){
  this.userservice.GetUsername(this.receiverName).subscribe(data=>{
    this.receiverdata= data.result
    console.log(this.receiverdata);
    this.getallmessages(this.user,this.receiverdata._id)
  })
}

sendmessage(){
this.messageservice.SendMessage(this.user, this.receiverdata._id, this.receiverName, this.message).subscribe(data=>{
  console.log(data);
  this.socket.emit('resfresh',{})
  this.message= ''

})
}

getallmessages(senderId:any, receiverId:any){
  this.messageservice.GetAllMessages(senderId, receiverId).subscribe(data=>{
    //console.log(data);

this.msgArray= data.messages.message
console.log(this.msgArray);


  })
}

listening(){
  this.socket.on('is_typing' , (data:any)=>{
    if(data.sender === this.receiverName){
      this.isTyping= true
    }
  })
  this.socket.on('has_stop_typing' , (data:any)=>{
    if(data.sender === this.receiverName){
      this.isTyping= false
    }
  })
  this.socket.on('usersOnline',(data:any)=>{
    const result = _.indexOf(data,this.receiverName)
    console.log(result)
     if(result > -1){
    this.Online= true

     }else{
       this.Online= false
    }
  })
}

istyping(){
  this.socket.emit('start_typing',{
    sender: this.username,
    receiver: this.receiverName
  })
if(this.typingMessage){
  clearTimeout(this.typingMessage)
}
this.typingMessage= setTimeout(()=>{
  this.socket.emit('stop_typing', {
    sender: this.username,
    receiver: this.receiverName
  })
}, 500)
}
}
