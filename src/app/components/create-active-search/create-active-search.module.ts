import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActiveSearchComponent } from './create-active-search.component';
import { FormsModule } from '@angular/forms';
import { CreateActiveSearchRoutingModule } from './create-active-search-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    CreateActiveSearchComponent
  ],
  imports: [
    CommonModule,
    CreateActiveSearchRoutingModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule
  ]
})
export class CreateActiveSearchModule { }
