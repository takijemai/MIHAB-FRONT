import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SearchPage } from './search.page';
import { MapsComponent } from '../components/maps/maps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    ReactiveFormsModule,
    SwiperModule,

  ],
  declarations: [SearchPage, MapsComponent]
})
export class SearchPageModule {}
