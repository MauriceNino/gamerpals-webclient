import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {
    public static progressBarVisible: boolean = false;
    public static progressBarMode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'indeterminate';

    constructor() { }
}
