import { Router } from '@angular/router';
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
  acceptOnlyPDF = '';
  organizationFiles = [];
  selectedBldCom = [];
  constructor(private store: Store<AppState>, private router: Router) {
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
      patName: new FormControl('', [Validators.required]),
      bldgrp: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      reqstrName: new FormControl('', [Validators.required]),
      reqstrRel: new FormControl('', [Validators.required]),
      reqDate: new FormControl('', [Validators.required]),
      purpose: new FormControl('', [Validators.required]),
      hospitalName: new FormControl('', [Validators.required]),
      hospitalAddr: new FormControl('', [Validators.required]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      patAddr: new FormControl('', [Validators.required]),
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
      const formValues = this.bloodReqForm.value;
      let bloodComp = [];
      let reqUnits = [];
      let bldReqType;
      if (this.showWholeBlood && this.showBlodComp) {
        bloodComp = this.selectedBldCom.map((x) => x.list);
        bloodComp.unshift('Whole Blood');
        reqUnits = this.selectedBldCom.map((x) => x.count);
        reqUnits.unshift(this.bloodGroupcount);
        bldReqType = 'Whole Blood and Blood Component Both';
      } else if (this.showWholeBlood && !this.showBlodComp) {
        bloodComp.push('Whole Blood'), reqUnits.push(this.bloodGroupcount);
        bldReqType = 'Whole Blood';
      } else if (!this.showWholeBlood && this.showBlodComp) {
        bloodComp = this.selectedBldCom.map((x) => x.list);
        reqUnits = this.selectedBldCom.map((x) => x.count);
        bldReqType = 'Blood Component';
      }
      let formData = new FormData();
      Object.keys(this.bloodReqForm.controls).forEach((key) => {
        formData.append(key, formValues[key]);
      });
      formData.append('bldReqType', bldReqType);
      bloodComp.forEach((bldCom) => {
        formData.append('bldComponent', bldCom);
      });
      reqUnits.forEach((unit) => {
        formData.append('requiredUnit', unit);
      });
      for (var i = 0; i < this.organizationFiles.length; i++) {
        formData.append('docs', this.organizationFiles[i]);
      }

      this.store.dispatch(new DashboardActions.CreateBloodReq(formData));
    }
  }

  onOrgFileUpload(event) {
    this.acceptOnlyPDF = '';
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type == 'application/pdf') {
        this.organizationFiles.push(event.target.files[i]);
      } else {
        this.acceptOnlyPDF = 'Accept only PDF File';
      }
    }
  }

  //REMOVING ORGANIZATION FILE
  onDeleteFile(index) {
    this.organizationFiles = this.organizationFiles.filter(
      (x, i) => i !== index
    );
  }
  navigate() {
    this.router.navigate(['/dashboard']);
  }
  ngOnDestroy() {}
}
