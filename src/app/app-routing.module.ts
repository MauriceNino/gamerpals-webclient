import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ShortSearchPageComponent } from './components/short-search-page/short-search-page.component';
import { LongSearchPageComponent } from './components/long-search-page/long-search-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./components/home-page/home-page.module').then(m => m.HomePageModule),
    data: {animation: 'home'}
  },

  {
    path: 'short-search',
    loadChildren: () => import('./components/short-search-page/short-search-page.module').then(m => m.ShortSearchPageModule),
    data: {animation: 'short-search'}
  },

  {
    path: 'long-search',
    loadChildren: () => import('./components/long-search-page/long-search-page.module').then(m => m.LongSearchPageModule),
    data: {animation: 'long-search'}
  },

  {
    path: 'friends',
    loadChildren: () => import('./components/friends-page/friends-page.module').then(m => m.FriendsPageModule),
    data: {animation: 'profile', preload: true}
  },

  {
    path: 'login',
    loadChildren: () => import('./components/login-page/login-page.module').then(m => m.LoginPageModule),
    data: {animation: 'login'}
  },

  {
    path: 'profile',
    loadChildren: () => import('./components/profile-page/profile-page.module').then(m => m.ProfilePageModule),
    data: {animation: 'profile', preload: true}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
