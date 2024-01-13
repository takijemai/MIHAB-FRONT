import { Component, OnInit, ViewChild,  } from '@angular/core';
import { AlertController, IonModal, IonicSlides, ModalController, ToastController } from '@ionic/angular';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client'
import * as _ from 'lodash';
import * as moment from 'moment'
import { OverlayEventDetail } from '@ionic/core/components';
import { SwiperOptions } from 'swiper';
import { MapsComponent } from '../components/maps/maps.component';
import Swal from 'sweetalert2'
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  config: SwiperOptions= {
    slidesPerView:1.1,
    navigation:true,
    pagination:true,
    keyboard:true,
    autoplay:true
  }
user:any
username:any
all:any
postArr: any= []
toppost:any=[]
msgCount=0
socket: any
socketHost= environment.SocketURL
editpost:any
message =''
postValue: any
imgId:any
imgVersion:any
@ViewChild(IonModal) modal: IonModal | undefined;
@ViewChild('modal2') modal2: IonModal | undefined;
imageValue: any=[];
images: any=[];
imagearr:any=[]
picId: any;
postDetail: any;

constructor(private tokenservice: TokenService, private userservice: UserService,
    private postservice: PostService, private alertctrl: AlertController,
     private toastctrl: ToastController, private modalctrl: ModalController,
     private router: Router) {
    this.all='post'
    this.socket= io(this.socketHost)
   }

  ngOnInit() {

    this.tokenservice.getPayolad().then(value=>{
      this.user= value._id
      this.getuser()
this.getposts()
    })
    this.socket.on('refreshPage', (data:any)=>{
      this.getuser()
      this.getposts()
          })
  }
getuser(){
  this.userservice.GetUserid(this.user).subscribe(data=>{
//console.log(data);
let msgArr= []
this.username= data.result.username
_.forEach(data.result.chatlist , value=>{
  const msg = value.messageId.message
  _.forEach(msg, val=>{
    if(val.isRead === false && val.receivername === this.username){
msgArr.push(val)
this.msgCount= msgArr.length
    }
  })
})
this.socket.emit('refresh', {})
  })
}
  getposts(){
    this.postservice.GetAllPots().subscribe(data=>{
      console.log(data);
this.postArr= data.posts.reverse()
this.toppost= data.top.reverse()
this.imagearr=data.posts.images

    })
  }

  TimefromNow(time:any){
    return moment(time).fromNow()
  }

  async DeletePost(item:any){
const alert= await this.alertctrl.create({
  header: 'Confirm Delete',
  mode: 'ios',
  message: 'Are you sure to deleting this post!',
  buttons : [
    {
      text: 'No',
      role:'cancel'
    },
    {
      text: 'Yes',
      handler: ()=>{
        this.postservice.DeletePost(item).subscribe(data=>{
          console.log(data);
          this.socket.emit('refresh',{})

        })
      }
    }
  ]

})
 await alert.present()
  }

  EditPost(item:any){
this.postValue= item
  }

  cancel() {
    this.modalctrl.dismiss(null, 'cancel');
  }
  cancel2() {
    this.modal2?.dismiss(null, 'cancel');
  }


  confirm() {
     const body = {
      id: this.postValue._id,
      post: this.editpost
     }
     this.postservice.EditPost(body).subscribe(data=>{
      console.log(data);
      this.socket.emit('refresh', {})
      this.editpost= ''

     })
    this.modalctrl.dismiss(this.editpost, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  LikePost(item:any){
    this.postservice.AddLike(item).subscribe(async data=>{
      console.log(data);

      const toast = this.toastctrl.create({
      message:' You have liked the Post',
      duration:2000,
      mode: 'ios',
      position:'bottom'
      })
      ;(await toast).present()
      this.socket.emit('refresh', {})
    })
  }

openimage(item:any){
this.imageValue= item
this.images= item.images
this.picId= item.user.picId
this.imgId= item.imgId
this.imgVersion= item.imgVersion
this.postValue= item
this.postDetail= item
this.modal2?.present()
}

async openMap(){
  const modal = await this.modalctrl.create({
component:MapsComponent,
componentProps: {
  lat: this.postDetail.lat,
  lng: this.postDetail.lng
},
cssClass: 'google-maps'
  })
  await modal.present()
}

async addfavorite(item:any){
  const result= await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    heightAuto:false
  })
  if(result.isConfirmed){
    this.postservice.AddFaovrite(item).subscribe(async data=>{
      console.log(data);
      this.socket.emit('refresh', {})
      const toast= this.toastctrl.create({
        message:'post added to your favorite list',
        duration: 2000,
        position:'bottom',
        mode: 'ios'
      })
      ;(await toast).present()

    })
  }
}
async deletefavorite(item:any){
   const alert = await this.alertctrl.create({
    header:'Are you dure to delete it',
    mode:'ios',
    buttons: [
      {
        text:'No',
        role:'cancel'
      },
      {
        text: 'Yes',
        handler: ()=>{
          this.postservice.DeleteFaovrite(item).subscribe(async data=>{
            console.log(data);
            const toast= this.toastctrl.create({
              message:'the post is deleted',
              duration: 2000,
              position:'bottom',
              mode:'ios'
            })
            ;(await toast).present()
            this.socket.emit('refresh', {})

          })
        }
      }
    ]

   })
  await alert.present()
}

async share(item:any){
const BaseUrl= `http://localhost:8100/`
const postId= item._id
const postUrl= `${BaseUrl}/post/${postId}`
const toast= await this.toastctrl.create({
  message:'Share application',
  duration: 2000,
  position: 'bottom'
})
toast.present()
await Share.share({
  title: 'Share Post',
  text: `${item.post}/n/n/${postUrl}`,
  url: postUrl,
  dialogTitle: 'SHare Post',
});
}


click(){
  this.socket.on('refresh', ()=>{
    this.tokenservice.getPayolad().then(value=>{
      this.user= value._id
      this.getuser()
    })
    this.msgCount -= 1
    if(this.msgCount <=0){
      this.msgCount= 0
    }
  })
}
}
