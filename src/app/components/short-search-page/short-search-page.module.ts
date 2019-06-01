import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortSearchPageRoutingModule } from './short-search-page-routing.module';
import { ShortSearchPageComponent } from './short-search-page.component';
import { MatFormFieldModule, MatSelectModule, MatOptionModule, MatDividerModule, MatInputModule, MatToolbarModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ShortSearchPageComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ShortSearchPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule
  ]
})
export class ShortSearchPageModule { }
