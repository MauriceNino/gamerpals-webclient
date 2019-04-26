import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { ProfileButtonComponent } from './components/header/profile-button/profile-button.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ShortSearchPageComponent } from './components/short-search-page/short-search-page.component';
import { LongSearchPageComponent } from './components/long-search-page/long-search-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ElectronControllsComponent } from './components/electron-controlls/electron-controlls.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    ProfileButtonComponent,
    HomePageComponent,
    ShortSearchPageComponent,
    LongSearchPageComponent,
    LoginPageComponent,
    ElectronControllsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
