import { ListchatPage } from './../listchat/listchat.page';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PostService } from '../services/post.service';
import { Loader } from '@googlemaps/js-api-loader';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newadd',
  templateUrl: './newadd.page.html',
  styleUrls: ['./newadd.page.scss'],
})
export class NewaddPage implements OnInit {
  googleapikey='AIzaSyCILLQGfTCZ-AoOrJ23f0KkChYhnz5x8-I'
  images: any = [];
  photo!: SafeResourceUrl;
  user:any
  newpost!:string
  address!:string
  price!: number
  city!:string
  superfice!: number
  lat!:number
  lng!:number
@ViewChild('mapElement' , {static:false}) mapRef!: ElementRef
map!: google.maps.Map
  constructor(private sanitizer: DomSanitizer, private postservice: PostService,
    private toastctrl: ToastController, private router: Router) {}

  ngOnInit() {
  }

  ionViewDidEnter(){
   this.loadamp()
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });
    const imageData = 'data:image/png;base64,' + image.base64String;
    this.images.push(imageData);
    this.photo = this.sanitizer.bypassSecurityTrustUrl(
      'data:image/png;base64,' + image.base64String
    );
  }


  async Submitpost() {
    if (!this.newpost) {
      const toast = await this.toastctrl.create({
        message: 'Please fill out all the information ',
        duration: 2000,
        position: 'bottom',
        mode: 'ios',
      });
      toast.present();

      return;
    }
    try {
      const apiKey = this.googleapikey;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=${apiKey}`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.results.length > 0) {
        const lat = jsonData.results[0].geometry.location.lat;
        const lng = jsonData.results[0].geometry.location.lng;

        let body;
        if (!this.images) {
          body = {
            post: this.newpost,
            precio: this.price,
            address: this.address,
            city: this.city,
            superfice: this.superfice,
            lat: lat,
            lng: lng,
          };
        } else {
          body = {
            post: this.newpost,
            images: this.images,
            price: this.price,
            address: this.address,
            city: this.city,
            superfice: this.superfice,
            lat: lat,
            lng: lng,
          };
        }

        console.log(body);
        this.postservice.AddPost(body).subscribe((data) => {
          console.log(data)
          this.newpost = '';
          this.price = 0;
          this.address = '';
          this.city = '';
          this.superfice = 0;
          this.images = [];
          this.router.navigate(['search']);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

async loadamp(){
  const lat= 53.4794892
  const lng= -2.2451148

  const loader= new Loader({
    apiKey: this.googleapikey,
    version:'weekly'
  })

  loader.load().then(async ()=>{
    this.map= new google.maps.Map(this.mapRef.nativeElement ,{
      center: {lat: lat, lng: lng},
      zoom: 15
    })

    const marker= new google.maps.Marker({
      map: this.map,
      title: this.address,
      position : {lat: lat, lng: lng}
    })
     const infowindow = new google.maps.InfoWindow({
      content:` <div>  <strong> ${this.address}</strong> </div> <div><strong> ${this.city}</strong></div>`
     })
     marker.addListener('click', ()=>{
infowindow.open(this.map, marker)
     })
     this.map.setCenter({lat: lat, lng: lng})
  })
}


async onAddressChange(event: any) {
  try {
    const apiKey = this.googleapikey;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${this.address}&key=${apiKey}`
    );
    const jsonData = await response.json();
    if (jsonData.results.length > 0) {
      const lat = jsonData.results[0].geometry.location.lat;
      const lng = jsonData.results[0].geometry.location.lng;
      const marker = new google.maps.Marker({
        map: this.map,
        position: { lat, lng },
        title: this.address,
      });
      this.map.setCenter({ lat, lng });
      this.map.setZoom(15);
      const infoWindow = new google.maps.InfoWindow({
        content: `<div><strong>${this.address}</strong></div><div>${this.city}</div>`,
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  } catch (err) {
    console.error(err);
  }
  this.address = event.target.value;
}
}
