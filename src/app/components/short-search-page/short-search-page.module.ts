import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortSearchPageRoutingModule } from './short-search-page-routing.module';
import { ShortSearchPageComponent } from './short-search-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ShortSearchPageComponent
  ],
  imports: [
    CommonModule,
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
