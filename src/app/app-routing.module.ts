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
    loadChildren: './components/home-page/home-page.module#HomePageModule',
    data: {animation: 'home'}
  },

  { 
    path: 'short-search',
    loadChildren: './components/short-search-page/short-search-page.module#ShortSearchPageModule',
    data: {animation: 'short-search'}
  },

  { 
    path: 'long-search',
    loadChildren: './components/long-search-page/long-search-page.module#LongSearchPageModule',
    data: {animation: 'long-search'}
  },

  { 
    path: 'login',
    loadChildren: './components/login-page/login-page.module#LoginPageModule',
    data: {animation: 'login'}
  },

  { 
    path: 'profile',
    loadChildren: './components/profile-page/profile-page.module#ProfilePageModule',
    data: {animation: 'profile', preload: true}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
