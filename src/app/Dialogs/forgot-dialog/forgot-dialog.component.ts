import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState } from 'src/app/app.state';
import * as AuthActions from '../../store/Actions/auth.action';
@Component({
  selector: 'app-forgot-dialog',
  templateUrl: './forgot-dialog.component.html',
  styleUrls: ['./forgot-dialog.component.css'],
})
export class ForgotDialogComponent implements OnInit {
  forgotPassForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ForgotDialogComponent>,
    private store: Store<AppState>
  ) {
    this.forgotPassForm = new FormGroup({
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
    });
  }

  ngOnInit() {}

  onSend() {
    if (this.forgotPassForm.valid) {
      const payload = {
        userId: this.forgotPassForm.value.emailAddress,
      };
      this.store.dispatch(new AuthActions.ForgetPassword(payload));
      this.dialogRef.close();
    }
  }
}
