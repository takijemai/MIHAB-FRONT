import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewaddPage } from './newadd.page';

const routes: Routes = [
  {
    path: '',
    component: NewaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewaddPageRoutingModule {}
