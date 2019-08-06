import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ok-dialog',
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.scss']
})
export class OkDialogComponent implements OnInit {
  public title = '';
  public ok = 'Ok';

  constructor(public dialogRef: MatDialogRef<OkDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IOkDialogData) {
    this.title = this.data.title;
    this.ok = this.data.ok;
  }

  ngOnInit() {
  }

  onOkClick() {
    this.dialogRef.close();
  }
}

export interface IOkDialogData {
  title: string;
  ok: string;
}
