import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-active-search',
  templateUrl: './create-active-search.component.html',
  styleUrls: ['./create-active-search.component.scss']
})
export class CreateActiveSearchComponent implements OnInit {
  public dataModel;
  public textColor = 'white';
  constructor() { }

  ngOnInit() {
    this.textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
    console.log();
  }

  getInitData() {
    return {
      plugins: 'lists advlist',
      toolbar: 'undo redo | bold italic | bullist numlist outdent indent',
      theme : 'silver',
      skin : 'oxide-dark',
      content_style : `html { color: ${this.textColor}; }`
    };
  }

}
