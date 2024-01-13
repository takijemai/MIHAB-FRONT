import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { UserdetailsComponent } from '../components/userdetails/userdetails.component';
import { UserimagesComponent } from '../components/userimages/userimages.component';
import { UserpostsComponent } from '../components/userposts/userposts.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule
  ],
  declarations: [ProfilePage,UserdetailsComponent, UserimagesComponent, UserpostsComponent]
})
export class ProfilePageModule {}
