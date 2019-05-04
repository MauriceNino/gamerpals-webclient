import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamerPalsHelperMethodService {

  constructor() { }

  public callWhenPropertyAvailable(name: string, callback: Function): void {
    var interval = 10;

    window.setTimeout(() => {
      if (window[name]) {
        callback(window[name]);
      } else {
        window.setTimeout(() => this.callWhenPropertyAvailable(name, callback), interval);
      }
    }, interval);
  }

  public callWhenObjectAvailable(obj: Object, callback: Function): void {
    var interval = 10;
    
    window.setTimeout(() => {
      if (obj != undefined) {
        callback();
      } else {
        window.setTimeout(() => this.callWhenObjectAvailable(obj, callback), interval);
      }
    }, interval);
  }
}
