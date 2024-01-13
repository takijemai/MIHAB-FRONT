import { Loader } from '@googlemaps/js-api-loader';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Zoom } from 'swiper';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent  implements OnInit {
@ViewChild('mapElement', {static:false}) mapRef!: ElementRef
map!: google.maps.Map
@Input() item:any
lat:any
lng: any
  constructor(private route: ActivatedRoute, private router: Router) {
    this.lat= this.route.snapshot.paramMap.get('lat')
    this.lng = this.route.snapshot.paramMap.get('lng')
   }

   ngOnInit() {}
   async ngAfterViewInit() {
     this.loadMap();
   }

   async loadMap(){

     const loader = new Loader({
       apiKey: 'AIzaSyCILLQGfTCZ-AoOrJ23f0KkChYhnz5x8-I',
       version: 'weekly',
     });

     loader.load().then(async () => {
       this.map = new google.maps.Map(this.mapRef.nativeElement, {
         center: { lat: this.lat, lng: this.lng },
         zoom: 15
       });

        const marker = new google.maps.Marker({
         map: this.map,
         position: { lat: this.lat, lng: this.lng },
       });


       this.map.setCenter({ lat: this.lat, lng: this.lng });
     });

   }

}

