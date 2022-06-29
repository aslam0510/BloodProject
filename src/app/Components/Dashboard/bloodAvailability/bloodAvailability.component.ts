import { UpdateBldStsDialogComponent } from './../../../Dialogs/updateBldStsDialog/updateBldStsDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { BldCompStDialogComponent } from 'src/app/Dialogs/bldCompStDialog/bldCompStDialog.component';
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';
import * as SideNavAction from '../../../store/Actions/sideNavAction';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bloodAvailability',
  templateUrl: './bloodAvailability.component.html',
  styleUrls: ['./bloodAvailability.component.css'],
})
export class BloodAvailabilityComponent implements OnInit {
  bloodCompStatus$: Observable<any>;
  bloodCompStatus: any;
  bloodCompStatusSub: Subscription;
  bloodCompList$: Observable<any>;
  bloodCompList: any;
  bloodCompListSub: Subscription;
  bloodGroupList$: Observable<any>;
  bloodGroupList: any;
  bloodGroupListSub: Subscription;
  constructor(private dialog: MatDialog, private store: Store<AppState>) {
    this.bloodCompStatus$ = this.store.select(
      (state) => state.SidNavSlice.bloodCompStatus
    );
    this.bloodCompList$ = this.store.select(
      (state) => state.SidNavSlice.bloodCompList
    );
    this.bloodGroupList$ = this.store.select(
      (state) => state.SidNavSlice.bloodGroupTypes
    );
  }

  ngOnInit() {
    this.store.dispatch(new SideNavAction.GetBloodCompStatus(''));
    this.store.dispatch(new SideNavAction.GetBloodGroupList());
    this.store.dispatch(new SideNavAction.GetBloodCompList());
    this.bloodCompStatusSub = this.bloodCompStatus$.subscribe((response) => {
      if (response) {
        this.bloodCompStatus = response.data;
      }
    });

    this.bloodCompListSub = this.bloodCompList$.subscribe((response) => {
      if (response) {
        this.bloodCompList = response.data;
      }
    });

    this.bloodGroupListSub = this.bloodGroupList$.subscribe((response) => {
      if (response) {
        this.bloodGroupList = response.data;
      }
    });
  }

  //show the edit popup dialog
  onEditBldStatus(value) {
    if (value === 'bldCompStatus') {
      const dialogRef = this.dialog.open(BldCompStDialogComponent, {
        width: '400px',
        height: 'auto',
        data: {
          page: 'bloodComp',
          bloodComp: this.bloodCompList,
          bloodGrop: this.bloodGroupList,
        },
      });
    } else {
      this.dialog.open(BldCompStDialogComponent, {
        width: '400px',
        height: 'auto',
        data: {
          page: 'BloodAvailable',
          bloodComp: null,
          bloodGrop: this.bloodGroupList,
        },
      });
    }
  }

  onItem() {}

  ngDestory() {
    this.bloodCompStatusSub.unsubscribe();
  }
}
