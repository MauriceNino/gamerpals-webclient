import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsPageComponent } from './friends-page.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsPageRoutingModule { }
