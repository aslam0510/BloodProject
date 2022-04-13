import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-forgot-dialog',
  templateUrl: './forgot-dialog.component.html',
  styleUrls: ['./forgot-dialog.component.css'],
})
export class ForgotDialogComponent implements OnInit {
  forgotPassForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ForgotDialogComponent>
  ) {
    this.forgotPassForm = new FormGroup({
      emailAddress: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onSend() {
    console.log(this.forgotPassForm);
  }
}
