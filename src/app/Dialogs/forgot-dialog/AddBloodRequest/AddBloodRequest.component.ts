import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';
import * as SideNavAction from '../../../store/Actions/sideNavAction';
import * as DashboardActions from '../../../store/Actions/dashboardActions';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-AddBloodRequest',
  templateUrl: './AddBloodRequest.component.html',
  styleUrls: ['./AddBloodRequest.component.css'],
})
export class AddBloodRequestComponent implements OnInit, OnDestroy {
  bloodReqForm: FormGroup;
  isLinear = false;
  showWholeBlood = true;
  showBlodComp = false;
  bloodGroupList$: Observable<any>;
  bloodGroupList = [];
  bloodGroupListSub: Subscription;
  bloodCompList$: Observable<any>;
  bloodCompList = [];
  bloodCompListSub: Subscription;
  bloodGroupcount = 0;
  showBloodGrupAddBtn = true;
  showBldGrpCountBtn = false;
  selectedBldCom = [];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<AddBloodRequestComponent>,
    private store: Store<AppState>
  ) {
    this.bloodCompList$ = this.store.select(
      (state) => state.SidNavSlice.bloodCompList
    );
    this.bloodGroupList$ = this.store.select(
      (state) => state.SidNavSlice.bloodGroupTypes
    );
  }

  ngOnInit() {
    this.store.dispatch(new SideNavAction.GetBloodGroupList());

    this.bloodReqForm = new FormGroup({
      priority: new FormControl('', [Validators.required]),
      patientName: new FormControl('', [Validators.required]),
      bloodGroup: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      nameOfRequester: new FormControl('', [Validators.required]),
      realtionWithPatient: new FormControl('', [Validators.required]),
      dateOfRequriement: new FormControl('', [Validators.required]),
      purpose: new FormControl('', [Validators.required]),
      hospitalName: new FormControl('', [Validators.required]),
      hospitalAddress: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      patientAddress: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
    });
    this.bloodCompListSub = this.bloodCompList$.subscribe((response) => {
      if (response) {
        response.data?.types.forEach((x) => {
          this.bloodCompList.push({
            list: x,
            count: 0,
            showAddBtn: true,
            showCountBtn: false,
            select: false,
          });
        });
        console.log(this.bloodCompList);
      }
    });

    this.bloodGroupListSub = this.bloodGroupList$.subscribe((response) => {
      if (response) {
        response.data?.types.forEach((x) => {
          this.bloodGroupList.push({
            type: x,
            count: 0,
            showAddBtn: true,
            showCountBtn: false,
          });
        });
      }
    });
  }

  radioChnage(value) {
    if (value.value == 1) {
      this.showWholeBlood = true;
      this.showBlodComp = false;
      this.selectedBldCom = [];
      this.bloodCompList = [];
    } else if (value.value == 2) {
      this.showBlodComp = true;
      this.showWholeBlood = false;
      this.bloodGroupcount = 0;
      this.showBloodGrupAddBtn = true;
      this.showBldGrpCountBtn = false;
      this.store.dispatch(new SideNavAction.GetBloodCompList());
    } else if (value.value == 3) {
      this.showBlodComp = true;
      this.showWholeBlood = true;
      this.store.dispatch(new SideNavAction.GetBloodCompList());
    }
  }

  removeBloodGroupCount() {
    this.bloodGroupcount--;
  }

  addBloodGroupCount() {
    this.bloodGroupcount++;
  }

  removeBloodComCount(data, index) {
    if (data.count <= 0) {
      this.bloodCompList[index].count = 0;
    } else {
      this.bloodCompList[index].count = data.count - 1;
    }
  }
  addBloodcomCount(data, index) {
    this.bloodCompList[index].count = data.count + 1;
  }
  bldGropAddBtn() {
    this.showBldGrpCountBtn = true;
    this.showBloodGrupAddBtn = false;
  }

  bldCompAddBtn(event, index) {
    event.stopPropagation();
    this.bloodCompList[index].showAddBtn = false;
    this.bloodCompList[index].showCountBtn = true;
  }

  onBlodComCardClick(blodCom, index) {
    this.bloodCompList[index].select = !blodCom.select;
    console.log(this.bloodCompList[index]);
    this.selectedBldCom = this.bloodCompList.filter((x) => x.select === true);
    if (!this.bloodCompList[index].select) {
      this.bloodCompList[index].count = 0;
      this.bloodCompList[index].showAddBtn = true;
      this.bloodCompList[index].showCountBtn = false;
    }
  }

  onReset() {
    this.bloodReqForm.reset();
    this.selectedBldCom = [];
    this.bloodGroupcount = 0;
    this.showBloodGrupAddBtn = true;
    this.showBldGrpCountBtn = false;
  }
  onSubmit() {
    if (this.bloodReqForm.valid) {
      const form = this.bloodReqForm.value;
      let bloodComp = [];
      let reqUnits = [];
      let bldReqType;
      if (this.showWholeBlood && this.showBlodComp) {
        bloodComp = this.selectedBldCom.map((x) => x.list);
        bloodComp.unshift('Whole blood');
        reqUnits = this.selectedBldCom.map((x) => x.count);
        reqUnits.unshift(this.bloodGroupcount);
        bldReqType = 'Whole Blood and Blood Component Both';
      } else if (this.showWholeBlood && !this.showBlodComp) {
        bloodComp.push('Whole blood'), reqUnits.push(this.bloodGroupcount);
        bldReqType = 'Whole Blood';
      } else if (!this.showWholeBlood && this.showBlodComp) {
        bloodComp = this.selectedBldCom.map((x) => x.list);
        reqUnits = this.selectedBldCom.map((x) => x.count);
        bldReqType = 'Blood Component';
      }
      const payload = {
        patName: form.patientName,
        age: form.age,
        gender: form.gender,
        location: form.location,
        patAddr: form.patientAddress,
        hospitalName: form.hospitalName,
        hospitalAddr: form.hospitalAddress,
        reqDate: form.dateOfRequriement,
        reqstrName: form.nameOfRequester,
        reqstrRel: form.realtionWithPatient,
        contact: form.contactNo,
        purpose: form.purpose,
        priority: form.priority,
        bldgrp: form.bloodGroup,
        bldComponent: bloodComp,
        requiredUnit: reqUnits,
        bldReqType: bldReqType,
      };
      this.store.dispatch(new DashboardActions.CreateBloodReq(payload));
      this.dialogRef.close();
    }
  }

  ngOnDestroy() {
    this.dialogRef.close();
  }
}
