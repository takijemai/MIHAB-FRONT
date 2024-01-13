import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
uploadimage:any
user:any
username: any
imgId:any
imgVersion:any
socket: any
socketHost= environment.SocketURL
  constructor(private userservice: UserService, private tokenservice: TokenService,
    private toastctrl: ToastController,
    private router:Router,private storage: Storage,
    private alertctrl: AlertController) {
      this.socket= io(this.socketHost)
     }

  ngOnInit() {
    this.tokenservice.getPayolad().then(value=>{
      this.user= value._id
      this.getuser()
      this.socket.on('refreshPage', (data:any)=>{
        this.getuser()
            })
    })
  }
 getuser(){
  this.userservice.GetUserid(this.user).subscribe(data=>{
    this.username= data.result.username
    this.imgId=data.result.picId
    this.imgVersion=data.result.picVersion
  })
 }


 async  takePhoto(){
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source: CameraSource.Prompt,
  });
 this.uploadimage = 'data:image/png;base64,' + image.base64String;

  }


  async uploadPicture(){
this.userservice.AddImage(this.uploadimage).subscribe(data=>{
  console.log(data);
this.presenttoast('Image added correctly')
})
  }

  async presenttoast(message: string){
    const toast= await this.toastctrl.create({
      message: message ,
      duration : 2000,
      position: 'bottom'
    })

    toast.present()
  }



  async valorate() {
    const alert = await this.alertctrl.create({
      header: '¿ Like the  app?',
      message: ` ¡Help us to improve! ¿Would you mind rating it? `,
      cssClass: 'rating-alert',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'yes-button',
          handler: () => {
            this.userservice.valorate(true).subscribe(async data=>{
              this.toast()
            },err =>{
              console.log(err)
            })
          }
        },
        {
          text: 'No',
          cssClass: 'no-button',

          handler: () => {
            this.userservice.valorate(false).subscribe(data=>{
              this.toast()
            },err =>{
              console.log(err)
            })
          }
        }],
      animated: true,
      mode: 'md',
    });

    await alert.present();
  }

async share(){
  const toast= await this.toastctrl.create({
    message:'Share application',
    duration: 2000,
    position: 'bottom'
  })
  toast.present()
  await Share.share({
    title: 'Share App',
    text: 'share it if you like it',
    url: 'MiHAB',
    dialogTitle: 'SHare APP',
  });
}



async toast(){
  const toast = await this.toastctrl.create({
    message: 'Thank you for you valoration...',
    duration: 1000,
    position: 'bottom',
  });

  toast.present();

}

logout(){
  this.storage.remove('auth-token').then(()=>{
    this.router.navigateByUrl('home')
  })
}


}


