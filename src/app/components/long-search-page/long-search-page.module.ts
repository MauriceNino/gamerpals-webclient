import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LongSearchPageRoutingModule } from './long-search-page-routing.module';
import { LongSearchPageComponent } from './long-search-page.component';

@NgModule({
    declarations: [
        LongSearchPageComponent
    ],
    imports: [
        CommonModule,
        LongSearchPageRoutingModule
    ]
})
export class LongSearchPageModule {}
