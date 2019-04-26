import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ShortSearchPageComponent } from './components/short-search-page/short-search-page.component';
import { LongSearchPageComponent } from './components/long-search-page/long-search-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent},
  { path: 'short-search', component: ShortSearchPageComponent},
  { path: 'long-search', component: LongSearchPageComponent},
  { path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
