import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdealistaPageRoutingModule } from './idealista-routing.module';

import { IdealistaPage } from './idealista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdealistaPageRoutingModule
  ],
  declarations: [IdealistaPage]
})
export class IdealistaPageModule {}
