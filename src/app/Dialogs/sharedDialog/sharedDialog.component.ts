import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sharedDialog',
  templateUrl: './sharedDialog.component.html',
  styleUrls: ['./sharedDialog.component.css'],
})
export class SharedDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SharedDialogComponent>
  ) {}

  ngOnInit() {}

  done() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
