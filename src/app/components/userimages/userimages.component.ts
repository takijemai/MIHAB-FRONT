import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'

@Component({
  selector: 'app-userimages',
  templateUrl: './userimages.component.html',
  styleUrls: ['./userimages.component.scss'],
})
export class UserimagesComponent  implements OnInit {
@Input() images:any
userimages:any=[]
socket:any
socketHost= environment.SocketURL

  constructor(private userservice: UserService, private alertctrl: AlertController,
    private toastctrl: ToastController) {
      this.socket= io(this.socketHost)
     }

  ngOnInit() {}
  ngOnChanges() {
    if(this.images){
      this.userimages= this.images.images
    }
    this.socket.on('refreshPage', (data:any)=>{
      if(this.images){
        this.userimages= this.images.images
      }
    })

    }


  setdefaultimage(value:any){
this.userservice.SetDefaultImage(value.imgId, value.imgVersion).subscribe(data=>{
  console.log(data);
 this.socket.emit('refresh',{})
})
  }

  async deleteimage(value:any){
const alert= await this.alertctrl.create({
header: 'Are you sure to delete this image?',
mode:'ios',
buttons: [
  {
    text: 'NO',
    role:'cancel'
  },
  {
    text:'Yes',
    handler: ()=>{
      this.userservice.DeleteImage(value.imgId).subscribe(async data=>{
const toast = await this.toastctrl.create({
  message: 'the image was deleted',
  duration: 2000,
  position:'bottom',
  mode:'ios'
})
toast.present()
this.socket.emit('refresh',{})
      })
    }
  }
]
})
await alert.present()
  }
}
