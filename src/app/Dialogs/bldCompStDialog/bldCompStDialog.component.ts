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
  bloodType: string = null;
  availableUnits: any;
  bloodComponent: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BldCompStDialogComponent>,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
    console.log(data);
    this.bloodCompList = data.bloodComp;
    this.bloodGroupList = data.bloodGrop;
    this.bloodType = data.bloodType;
  }

  ngOnInit() {
    this.updateBloodForm = new FormGroup({
      bloodGroup: new FormControl('', [Validators.required]),
      availableUnit: new FormControl('', [Validators.required]),
      newUnit: new FormControl('', [Validators.required]),
      totalUnit: new FormControl(''),
    });
    this.updateBloodForm.controls['totalUnit'].disable();
    this.updateBloodForm.controls['availableUnit'].disable();
    this.data.page === 'bloodComp'
      ? this.updateBloodForm.controls['bloodGroup'].disable()
      : this.updateBloodForm.controls['bloodGroup'].enable();

    if (this.data.page === 'bloodComp') {
      this.updateBloodForm.addControl(
        'bloodComp',
        new FormControl('', [Validators.required])
      );
    }
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
      this.mode = 'DEL';
      const totalSum = Number(avilableUnit) - Number(newUnit);
      this.updateBloodForm.controls['totalUnit'].setValue(totalSum);
    }
  }

  onBloodComp(com?) {
    this.bloodComponent = this.data.availableUnits.filter(
      (x) => x._id === com
    )[0];
    this.updateBloodForm.controls['bloodGroup'].enable();
  }

  onBloodGroup(bloodGroup) {
    if (this.data.page === 'bloodComp') {
      this.availableUnits = this.bloodComponent.availability.filter(
        (x) => x.bldgrp === bloodGroup
      );
      this.updateBloodForm.controls['availableUnit'].setValue(
        this.availableUnits[0].totalAvailable
      );
    } else {
      const group = this.data.availableUnits.filter(
        (x) => x.bldgrp === bloodGroup
      );
      this.updateBloodForm.controls['availableUnit'].setValue(
        group[0].totalAvailable
      );
    }
  }
  onSave() {
    console.log(this.updateBloodForm.value);
    if (this.updateBloodForm.valid) {
      const payload = {
        bldgrp: this.updateBloodForm.value.bloodGroup,
        bldComponent: this.bloodType
          ? this.bloodType
          : this.updateBloodForm.value.bloodComp,
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
