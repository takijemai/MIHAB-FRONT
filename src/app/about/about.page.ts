import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
user:any
username:any
imgId:any
  imgVersion:any
  socket:any
  socketHost= environment.SocketURL
  constructor(private userservice: UserService, private tokenservice: TokenService,
    private storage: Storage, private router: Router) {
      this.socket=io(this.socketHost)
     }

  ngOnInit() {
    this.tokenservice.getPayolad().then(value=>{
      this.user= value._id
      console.log(this.user);
      this.getuser()
    })
    this.socket.on('refreshPage' , (data:any)=>{
      this.tokenservice.getPayolad().then(value=>{
        this.user= value._id
        this.getuser()
      })
     })
  }

  getuser(){
    this.userservice.GetUserid(this.user).subscribe(data=>{
      console.log(data.result);
this.username= data.result.username
this.imgId=data.result.picId
this.imgVersion=data.result.picVersion
    })
  }

  logout(){
    this.storage.remove('auth-token').then(()=>{
this.router.navigateByUrl('home')
    })
  }

}
