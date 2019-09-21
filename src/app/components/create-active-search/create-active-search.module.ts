import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateActiveSearchRoutingModule } from './create-active-search-routing.module';
import { CreateActiveSearchComponent } from './create-active-search.component';

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
export class CreateActiveSearchModule {}
