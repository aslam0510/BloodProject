import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';
import * as SideNavAction from '../../../store/Actions/sideNavAction';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-AddBloodRequest',
  templateUrl: './AddBloodRequest.component.html',
  styleUrls: ['./AddBloodRequest.component.css'],
})
export class AddBloodRequestComponent implements OnInit {
  organizationFiles: any;
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
  bloodCompCount = 0;

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
    this.bloodCompListSub = this.bloodCompList$.subscribe((response) => {
      if (response) {
        response.data?.types.forEach((x) => {
          this.bloodCompList.push({
            list: x,
            count: 0,
            showAddBtn: true,
            showCountBtn: false,
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

  onOrgFileUpload($event) {}

  radioChnage(value) {
    if (value.value == 1) {
      this.showWholeBlood = true;
      this.showBlodComp = false;
      this.store.dispatch(new SideNavAction.GetBloodGroupList());
    } else if (value.value == 2) {
      this.showBlodComp = true;
      this.showWholeBlood = false;
      this.store.dispatch(new SideNavAction.GetBloodCompList());
    } else if (value.value == 3) {
      this.showBlodComp = true;
      this.showWholeBlood = true;
    }
  }

  removeBloodGroupCount(data, index) {
    if (data.count <= 0) {
      this.bloodGroupList[index].count = 0;
    } else {
      this.bloodGroupList[index].count = data.count - 1;
    }
  }

  addBloodGroupCount(group, index) {
    this.bloodGroupList[index].count = group.count + 1;
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
  bldGropAddBtn(index) {
    this.bloodGroupList[index].showAddBtn = false;
    this.bloodGroupList[index].showCountBtn = true;
  }

  bldCompAddBtn(index) {
    this.bloodCompList[index].showAddBtn = false;
    this.bloodCompList[index].showCountBtn = true;
  }
}
