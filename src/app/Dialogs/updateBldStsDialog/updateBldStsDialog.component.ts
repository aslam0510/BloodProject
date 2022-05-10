import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updateBldStsDialog',
  templateUrl: './updateBldStsDialog.component.html',
  styleUrls: ['./updateBldStsDialog.component.css'],
})
export class UpdateBldStsDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<UpdateBldStsDialogComponent>
  ) {}

  ngOnInit() {}
}
