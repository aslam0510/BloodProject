import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appErrorDialog',
  templateUrl: './appErrorDialog.component.html',
  styleUrls: ['./appErrorDialog.component.css'],
})
export class AppErrorDialogComponent implements OnInit {
  errors = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AppErrorDialogComponent>
  ) {
    console.log(data);
    if (data && data.errors) {
      this.errors.push(data.errors);
    }
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}
