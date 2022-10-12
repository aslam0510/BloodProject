import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import * as SideNavAction from '../../store/Actions/sideNavAction';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SharedDialogComponent } from 'src/app/Dialogs/sharedDialog/sharedDialog.component';
@Component({
  selector: 'app-bldReqView',
  templateUrl: './bldReqView.component.html',
  styleUrls: ['./bldReqView.component.css'],
})
export class BldReqViewComponent implements OnInit {
  bloodReqDetail$: Observable<any>;
  bloodReqDetail: any;
  bloodReqDetailSub: Subscription;
  urlId: string;
  requirementUnits = [];
  bloodReqStatus$: Observable<any>;
  bloodReqStatus: any;
  bloodReqStatusSub: Subscription;
  bldReqForm: FormGroup;
  bldRequirementsForm: FormGroup;
  isEditBtn: boolean = true;
  bloodReqType = 0;
  disableSave = true;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.bloodReqDetail$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqDetail
    );

    this.bloodReqStatus$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqStatus
    );
  }

  ngOnInit() {
    this.bldReqForm = new FormGroup({
      bldReqId: new FormControl(''),
      patName: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      location: new FormControl(''),
      patAddr: new FormControl(''),
      hospitalName: new FormControl(''),
      hospitalAddr: new FormControl(''),
      reqDate: new FormControl(''),
      reqstrName: new FormControl(''),
      reqstrRel: new FormControl(''),
      contact: new FormControl(''),
      purpose: new FormControl(''),
      priority: new FormControl(''),
      bldgrp: new FormControl(''),
    });
    this.route.params.subscribe((param) => {
      this.urlId = param.id;
    });
    if (this.urlId) {
      this.store.dispatch(new SideNavAction.GetBldReqById(this.urlId));
      this.store.dispatch(new SideNavAction.GetBloodReqStatusList());
    }

    this.bloodReqDetailSub = this.bloodReqDetail$.subscribe((response) => {
      if (response) {
        this.bloodReqDetail = response.data;
        console.log(this.bloodReqDetail);
        this.setBldReqFormValues();
        this.bloodReqDetail?.requirements.forEach((x) => {
          this.requirementUnits.push({
            available: x.available,
            bldComponent: x.bldComponent,
            id: x.id,
            issuedUnits: Number(0),
            requiredUnit: x.requiredUnit,
            reservedUnits: Number(0),
          });
        });
      }
    });

    this.bloodReqStatusSub = this.bloodReqStatus$.subscribe((data) => {
      if (data) {
        this.bloodReqStatus = data.data;
      }
    });
  }
  setBldReqFormValues() {
    const data = this.bloodReqDetail;
    this.bldReqForm.patchValue({
      bldReqId: data.bldreqId,
      patName: data.patName,
      age: data.age,
      gender: data.gender,
      location: data.location,
      patAddr: data.patAddr,
      hospitalName: data.hospitalName,
      hospitalAddr: data.hospitalAddr,
      reqDate: moment(data.reqDate).format('MM-DD-YYYY'),
      reqstrName: data.reqstrName,
      reqstrRel: data.reqstrRel,
      contact: data.contact,
      purpose: data.purpose,
      priority: data.priority,
      bldgrp: data.bldgrp,
    });

    this.bldReqForm.disable();
  }
  onSelectReqType(type) {
    this.bloodReqType = type;
    if (type === 3 || type === 4) {
      const dailogRef = this.dialog.open(SharedDialogComponent, {
        width: '300px',
        height: 'auto',
        data: {
          content: `Do you want to ${
            type == 3 ? 'Reject' : 'Close'
          } the request`,
          cancelButton: 'Cancel',
          okButton: 'Ok',
        },
      });
      dailogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.disableSave = false;
        } else {
          this.disableSave = true;
        }
      });
    } else {
      this.disableSave = false;
    }
  }

  onResrveUnits(unit, i) {
    this.requirementUnits[i].reservedUnits = Number(unit);
  }
  onIssueUnits(unit, i) {
    console.log(unit);

    // console.log(
    //   this.requirementUnits[i].issuedUnits,
    //   this.requirementUnits[i].reservedUnits,
    //   this.requirementUnits[i].available
    // );
    // if (
    //   this.requirementUnits[i].issuedUnits >=
    //   this.requirementUnits[i].reservedUnits
    // ) {
    //   this.requirementUnits[i].issuedUnits = this.requirementUnits[i].available;
    // }
    if (this.bloodReqType == 2 || this.bloodReqType == 4) {
      this.requirementUnits[i].requiredUnit =
        this.requirementUnits[i].requiredUnit - Number(unit);
    }
    this.requirementUnits[i].issuedUnits = Number(unit);
    console.log(this.requirementUnits[i]);
  }
  cancel() {
    this.isEditBtn = true;
    this.bldReqForm.reset();
    this.bldReqForm.disable();
    this.setBldReqFormValues();
  }
  onEdit() {
    this.isEditBtn = false;
    this.bldReqForm.enable();
  }
  save() {
    console.log(this.requirementUnits);

    const payload = {
      bldReqId: this.bloodReqDetail.bldreqId,
      reqSts: this.bloodReqType,
      // subSts: 1,
      requirements: this.requirementUnits,
    };
    this.store.dispatch(new SideNavAction.UpdateBloodRequestReq(payload));
  }

  saveBlodRq() {
    const formValue = this.bldReqForm.value;
    const payload = {
      bldReqId: this.bloodReqDetail.bldreqId,
      patName: formValue.patName,
      age: formValue.age,
      gender: formValue.gender,
      location: formValue.location,
      patAddr: formValue.patAddr,
      hospitalName: formValue.hospitalName,
      hospitalAddr: formValue.hospitalAddr,
      reqDate: moment(formValue.reqDate).format('MM-DD-YYYY'),
      reqstrName: formValue.reqstrName,
      reqstrRel: formValue.reqstrRel,
      contact: formValue.contact,
      purpose: formValue.purpose,
      priority: formValue.priority,
      bldgrp: formValue.bldgrp,
      requirements: this.bloodReqDetail.requirements,
    };

    this.store.dispatch(new SideNavAction.UpdateBloodRequest(payload));
  }
}
