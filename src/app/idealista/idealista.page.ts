import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { IdealistaService } from '../services/idealista.service';
import { Router } from '@angular/router';
import { SearchResult } from './search.interface';
@Component({
  selector: 'app-idealista',
  templateUrl: './idealista.page.html',
  styleUrls: ['./idealista.page.scss'],
})
export class IdealistaPage implements OnInit {
  @ViewChild('mapElement', { static: false }) mapRef!: ElementRef;
  map!: google.maps.Map;
  private apiKey = 'i8bcbphlou1ueo9b8ahue932h5s6yo7d';
  loaderkey='AIzaSyCILLQGfTCZ-AoOrJ23f0KkChYhnz5x8-I'
  searchTerm!: string;
  city='madrid'
  operation=''
  propertyType=''
  country='es'
  center =''
  distance= 10000
  list :any = []
  maxPrice='200000'
  lat= '40.4167047,-3.7035825'
  urlicon= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkyr0z3l_U8WP0jOdN96uv-QuP9L9j1oZhA&usqp=CAU'
  searchResults!: SearchResult
  constructor(private loadingCtrl:LoadingController,private userservice: UserService,
    private idealistaservice: IdealistaService,private router: Router) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.loadMap();
  }




  async loadMap() {
    const loader = new Loader({
      apiKey: this.loaderkey,
      version: 'weekly',
    });

    loader.load().then(async () => {
      this.map = new google.maps.Map(this.mapRef.nativeElement, {
        center: { lat: 40.4167047, lng: -3.7035825 },
        zoom: 15,
      });
      const loading = await this.loadingCtrl.create({
        message: `Searching rooms...`
      });
     await loading.present();

     this.idealistaservice.searchProperties('bedrooms', this.city, this.maxPrice, 'rent', this.country, this.apiKey, this.lat, this.distance)
        .subscribe(
          (data) => {


            const searchResults = data as SearchResult;
          console.log(searchResults);

            const roomList = searchResults.elementList;
            for (const room of roomList) {
              const roomMarker = new google.maps.Marker({
                map: this.map,
                title: room.title,
                position: { lat: room.latitude, lng: room.longitude },
                icon: {
                  url: this.urlicon,
                  scaledSize: new google.maps.Size(30, 30)
                }
              });

              const roomInfoWindow = new google.maps.InfoWindow({
                content: `<div><strong>${room.price}€</strong></div><div>${room.description}</div>`
              });
              roomMarker.addListener('click', () => {
                roomInfoWindow.open(this.map, roomMarker);
              });
            }

            loading.dismiss();
          },
          error => {
            console.error(error);
            loading.dismiss();
          }
        );




    });
  }

  viewidealista(item:any){
    window.open(item.url, '_blank')
  }

}
