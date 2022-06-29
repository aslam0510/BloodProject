import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationDialogComponent } from './../notificationDialog/notificationDialog.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as SideNavActions from '../../store/Actions/sideNavAction';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bldCompStDialog',
  templateUrl: './bldCompStDialog.component.html',
  styleUrls: ['./bldCompStDialog.component.css'],
})
export class BldCompStDialogComponent implements OnInit {
  updateBloodForm: FormGroup;
  mode = '';
  bloodCompList: any;
  bloodGroupList: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BldCompStDialogComponent>,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
    console.log(data);
    this.bloodCompList = data.bloodComp;
    this.bloodGroupList = data.bloodGrop;
  }

  ngOnInit() {
    this.updateBloodForm = new FormGroup({
      bloodComp: new FormControl('', [Validators.required]),
      bloodGroup: new FormControl('', [Validators.required]),
      availableUnit: new FormControl(200, [Validators.required]),
      newUnit: new FormControl('', [Validators.required]),
      totalUnit: new FormControl(''),
    });
  }

  totalSum(operand) {
    this.mode = '';
    const avilableUnit = this.updateBloodForm.controls['availableUnit'].value;
    const newUnit = this.updateBloodForm.controls['newUnit'].value;
    if (operand === 'add') {
      this.mode = 'ADD';
      const totalSum = Number(avilableUnit) + Number(newUnit);
      this.updateBloodForm.controls['totalUnit'].setValue(totalSum);
    } else {
      this.mode = 'MINUS';
      const totalSum = Number(avilableUnit) - Number(newUnit);
      this.updateBloodForm.controls['totalUnit'].setValue(totalSum);
    }
  }
  onSave() {
    console.log(this.updateBloodForm.value);
    if (this.updateBloodForm.valid) {
      const payload = {
        bldgrp: this.updateBloodForm.value.bloodGroup,
        bldComponent: this.updateBloodForm.value.bloodComp,
        modUnits: this.updateBloodForm.value.newUnit,
        mode: this.mode,
      };
      this.store.dispatch(new SideNavActions.UpdateBloodCompStatus(payload));
      this.dialogRef.close();
    }
    // this.snackBar.openFromComponent(NotificationDialogComponent, {
    //   data: {
    //     message: 'Success',
    //     content: "Component 'PRBC/Packed Cell' has been updated Successfully",
    //   },
    //   duration: 2000,
    //   verticalPosition: 'top',
    //   horizontalPosition: 'center',
    // });
  }
}
