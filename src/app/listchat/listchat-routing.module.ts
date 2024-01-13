import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListchatPage } from './listchat.page';

const routes: Routes = [
  {
    path: '',
    component: ListchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListchatPageRoutingModule {}
