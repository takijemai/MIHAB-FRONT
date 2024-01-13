
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  voirprofile!:string
  userlist:any=[]
  images: any=[]
  user:any
  username:any
  headerimage:any
socket:any
socketHost= environment.SocketURL
  constructor(private tokenservice: TokenService, private userservice: UserService,
    private sanitzer: DomSanitizer) {
     this.socket= io (this.socketHost)
     this.voirprofile= 'posts'
    }

  ngOnInit() {
    this.tokenservice.getPayolad().then(value=>{
      this.user= value._id
      this.getuser(this.user)
    })
   this.socket.on('refreshPage' , (data:any)=>{
    this.tokenservice.getPayolad().then(value=>{
      this.user= value._id
      this.getuser(this.user)
    })
   })
  }
  ionViewDidLoad(){
    this.userimage()
  }
getuser(id:any){
  this.userservice.GetUserid(id).subscribe(data=>{
    console.log(data);
    this.userlist= data.result
    this.username= data.result.username
    this.images= data.result.images


  })
}



userimage(){
  const imageUrl =`http://res.cloudinary.com/dq1utqamt/image/upload/v${this.userlist.picVersion}/${this.userlist.picId}`;
  this.headerimage=this.sanitzer.bypassSecurityTrustStyle(`url(${imageUrl})`)


}
}
