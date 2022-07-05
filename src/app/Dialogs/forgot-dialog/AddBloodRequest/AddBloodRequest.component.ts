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
  bloodGroupList: any;
  bloodGroupListSub: Subscription;
  bloodCompList$: Observable<any>;
  bloodCompList: any;
  bloodCompListSub: Subscription;
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
        this.bloodCompList = response.data;
        console.log(this.bloodCompList);
      }
    });

    this.bloodGroupListSub = this.bloodGroupList$.subscribe((response) => {
      if (response) {
        this.bloodGroupList = response.data;
        console.log(this.bloodGroupList);
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
}
