import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListchatPageRoutingModule } from './listchat-routing.module';

import { ListchatPage } from './listchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListchatPageRoutingModule
  ],
  declarations: [ListchatPage]
})
export class ListchatPageModule {}
