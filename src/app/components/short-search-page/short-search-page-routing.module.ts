import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShortSearchPageComponent } from './short-search-page.component';

const routes: Routes = [
    {
        path: '',
        component: ShortSearchPageComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class ShortSearchPageRoutingModule {}
