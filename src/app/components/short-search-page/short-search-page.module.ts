import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortSearchPageRoutingModule } from './short-search-page-routing.module';
import { ShortSearchPageComponent } from './short-search-page.component';

@NgModule({
  declarations: [
    ShortSearchPageComponent
  ],
  imports: [
    CommonModule,
    ShortSearchPageRoutingModule
  ]
})
export class ShortSearchPageModule { }
