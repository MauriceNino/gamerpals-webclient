import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateActiveSearchComponent } from './create-active-search.component';

const routes: Routes = [
  {
    path: '',
    component: CreateActiveSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateActiveSearchRoutingModule { }
