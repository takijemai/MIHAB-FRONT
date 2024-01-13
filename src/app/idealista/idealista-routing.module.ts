import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdealistaPage } from './idealista.page';

const routes: Routes = [
  {
    path: '',
    component: IdealistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdealistaPageRoutingModule {}
