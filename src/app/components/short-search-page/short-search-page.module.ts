import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ShortSearchPageRoutingModule } from './short-search-page-routing.module';
import { ShortSearchPageComponent } from './short-search-page.component';

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
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule
    ]
})
export class ShortSearchPageModule {}
