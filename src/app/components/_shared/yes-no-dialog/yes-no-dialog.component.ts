import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum IYesNoDialogResult {
  YES, NO
}

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {
  public title = '';
  public yes = 'Yes';
  public no = 'No';

  constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IYesNoDialogData) {
    this.title = this.data.title;
    this.yes = this.data.yes;
    this.no = this.data.no;
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close(IYesNoDialogResult.NO);
  }

  onYesClick() {
    this.dialogRef.close(IYesNoDialogResult.YES);
  }
}



export interface IYesNoDialogData {
  title: string;
  yes: string;
  no: string;
}
