import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LongSearchPageComponent } from './long-search-page.component';

const routes: Routes = [
  {
    path: '',
    component: LongSearchPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LongSearchPageRoutingModule { }
