import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as AuthAction from '../../store/Actions/auth.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setPasswordDialog',
  templateUrl: './setPasswordDialog.component.html',
  styleUrls: ['./setPasswordDialog.component.css'],
})
export class SetPasswordDialogComponent implements OnInit {
  passwordForm: FormGroup;
  type: string = '';
  setPasswordSuccess$: Observable<any>;
  setPasswordSuccess: any;
  setPasswordSub: Subscription;
  pswdMissMatch;
  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SetPasswordDialogComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dialogRef.disableClose = true;
    this.pswdMissMatch = '';
    this.setPasswordSuccess$ = this.store.select(
      (state) => state.AuthSlice.setPasswordSuccess
    );
    this.type = data.type;
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    this.setPasswordSub = this.setPasswordSuccess$.subscribe((data) => {
      if (data) {
        this.setPasswordSuccess = data;
        if (
          this.setPasswordSuccess.code === 200 &&
          this.setPasswordSuccess.status == 'Success'
        ) {
          this.snackBar.open(this.setPasswordSuccess.data.message, 'ok', {
            duration: 3000,
          });
          this.dialogRef.close();
          this.router.navigate(['/dashboard']);
        } else {
          this.snackBar.open(this.setPasswordSuccess.msg, 'ok', {
            duration: 3000,
          });
        }
      }
    });
  }

  onSave() {
    const form = this.passwordForm.value;
    if (form.password !== form.confirmPassword) {
      this.pswdMissMatch = "Confirm Password dosen't match";
    } else if (this.passwordForm.valid) {
      const form = this.passwordForm.value;
      const payload = {
        pwd: form.password,
        confPwd: form.confirmPassword,
      };
      this.store.dispatch(new AuthAction.SetPassword(payload));
    }
  }
}
