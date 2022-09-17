import { UpdateBldStsDialogComponent } from './../../../Dialogs/updateBldStsDialog/updateBldStsDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { BldCompStDialogComponent } from 'src/app/Dialogs/bldCompStDialog/bldCompStDialog.component';
import { Store, ActionsSubject } from '@ngrx/store';
import { AppState } from './../../../app.state';
import * as SideNavAction from '../../../store/Actions/sideNavAction';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-bloodAvailability',
  templateUrl: './bloodAvailability.component.html',
  styleUrls: ['./bloodAvailability.component.css'],
})
export class BloodAvailabilityComponent implements OnInit {
  bloodCompStatus$: Observable<any>;
  bloodCompStatus: [] = [];
  bloodCompStatusSub: Subscription;
  bloodCompList$: Observable<any>;
  bloodCompList: any;
  bloodCompListSub: Subscription;
  bloodGroupList$: Observable<any>;
  bloodGroupList: any;
  bloodGroupListSub: Subscription;
  bloodAvailableStatus$: Observable<any>;
  bloodAvailableStatus: [] = [];
  bloodAvailableStatusSub: Subscription;
  bloodType: string = '';
  showBloodAvailableMsg = '';
  showBloodCompMsg = '';
  bloodCompDate: string = '';
  bloodAvailableDate: string = '';
  public bldAvailableSelectedVal: string;
  public bldCompSelectedVal: string;
  actionSubcription: Subscription;
  showOnlyYesterDay = false;
  showOnlyYesterDayCmp = false;
  calenderDate: any;
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private snackBar: MatSnackBar
  ) {
    this.actionSubcription = this.actionsSubj.subscribe((data) => {
      this.handleActionSubscription(data);
    });
    this.bloodCompStatus$ = this.store.select(
      (state) => state.SidNavSlice.bloodCompStatus
    );
    this.bloodCompList$ = this.store.select(
      (state) => state.SidNavSlice.bloodCompList
    );
    this.bloodGroupList$ = this.store.select(
      (state) => state.SidNavSlice.bloodGroupTypes
    );

    this.bloodAvailableStatus$ = this.store.select(
      (state) => state.SidNavSlice.bloodAvailabilityStatus
    );
  }

  handleActionSubscription(data: any) {
    switch (data.type) {
      case SideNavAction.UPDATE_BLOOD_COMP_STATUS_SUCCESS:
        if (data.payload.code === 200) {
          this.snackBar.open(data.payload.data.message, '', {
            duration: 2000,
          });
        }
        break;
    }
  }
  ngOnInit() {
    this.bldAvailableSelectedVal = 'Today';
    this.bldCompSelectedVal = 'Today';
    const today = moment();
    this.store.dispatch(
      new SideNavAction.GetBloodCompStatus(today.format('MM-DD-YYYY'))
    );
    this.store.dispatch(
      new SideNavAction.GetBloodAvailabilityStatus(today.format('MM-DD-YYYY'))
    );
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

    this.bloodAvailableStatusSub = this.bloodAvailableStatus$.subscribe(
      (response) => {
        if (response) {
          this.bloodAvailableStatus = response.data.details[0]?.availability;
          this.bloodType = response.data.details.map((x) => x._id);
        }
      }
    );
  }

  //show the edit popup dialog
  onEditBldStatus(value) {
    if (value === 'bldCompStatus') {
      const dialogRef = this.dialog.open(BldCompStDialogComponent, {
        width: '571px',
        height: 'auto',
        data: {
          page: 'bloodComp',
          bloodComp: this.bloodCompList,
          bloodGrop: this.bloodGroupList,
          availableUnits: this.bloodCompStatus,
          day: this.bldCompSelectedVal,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'Today') {
          this.store.dispatch(
            new SideNavAction.GetBloodCompStatus(moment().format('MM-DD-YYYY'))
          );
        } else if (result === 'Yesterday') {
          const yesterday = moment().add(-1, 'days');
          this.store.dispatch(
            new SideNavAction.GetBloodCompStatus(yesterday.format('MM-DD-YYYY'))
          );
        } else {
          this.store.dispatch(
            new SideNavAction.GetBloodCompStatus(
              moment(this.calenderDate.value).format('MM-DD-YYYY')
            )
          );
        }
      });
    } else {
      const dialogRef = this.dialog.open(BldCompStDialogComponent, {
        width: 'auto',
        height: 'auto',
        data: {
          page: 'BloodAvailable',
          bloodComp: null,
          bloodGrop: this.bloodGroupList,
          bloodType: this.bloodType[0],
          availableUnits: this.bloodAvailableStatus,
          day: this.bldAvailableSelectedVal,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'Today') {
          this.store.dispatch(
            new SideNavAction.GetBloodAvailabilityStatus(
              moment().format('MM-DD-YYYY')
            )
          );
        } else if (result === 'Yesterday') {
          const yesterday = moment().add(-1, 'days');
          this.store.dispatch(
            new SideNavAction.GetBloodAvailabilityStatus(
              yesterday.format('MM-DD-YYYY')
            )
          );
        } else {
          this.store.dispatch(
            new SideNavAction.GetBloodAvailabilityStatus(
              moment(this.calenderDate.value).format('MM-DD-YYYY')
            )
          );
        }
      });
    }
  }

  //changing blood component status button value
  public onBlodComValChange(val: string) {
    this.bldCompSelectedVal = val;
  }

  //changing blood available status button value
  public onBlodAvailableValChange(val: string) {
    this.bldAvailableSelectedVal = val;
  }

  // on blood component status buttons toggle
  onBlodCompDaySelect(day) {
    this.bloodCompDate = '';
    const today = moment();
    const yesterday = moment().add(-1, 'days');
    if (day === 'today') {
      this.showOnlyYesterDayCmp = false;
      this.store.dispatch(
        new SideNavAction.GetBloodCompStatus(today.format('MM-DD-YYYY'))
      );
    } else if (day === 'yesterday') {
      this.showOnlyYesterDayCmp = true;
      this.store.dispatch(
        new SideNavAction.GetBloodCompStatus(yesterday.format('MM-DD-YYYY'))
      );
    }
  }

  //on blood available status buttons toggle
  onBldAvailableDaySelect(day) {
    this.bloodAvailableDate = '';
    const today = moment();
    const yesterday = moment().add(-1, 'days');
    if (day === 'today') {
      this.showOnlyYesterDay = false;
      this.store.dispatch(
        new SideNavAction.GetBloodAvailabilityStatus(today.format('MM-DD-YYYY'))
      );
    } else if (day === 'yesterday') {
      this.showOnlyYesterDay = true;
      this.store.dispatch(
        new SideNavAction.GetBloodAvailabilityStatus(
          yesterday.format('MM-DD-YYYY')
        )
      );
    }
  }

  //on blood component status date select
  onBloodCompDatePicker(date) {
    this.calenderDate = date;
    this.bloodCompDate = moment(date.value).format('MM-DD-YYYY');
    this.store.dispatch(
      new SideNavAction.GetBloodCompStatus(
        moment(date.value).format('MM-DD-YYYY')
      )
    );
  }

  //on blood available status date select
  onBloodAvailableDatePick(date) {
    this.calenderDate = date;
    this.showOnlyYesterDay = false;
    this.bloodAvailableDate = moment(date.value).format('MM-DD-YYYY');
    this.store.dispatch(
      new SideNavAction.GetBloodAvailabilityStatus(
        moment(date.value).format('MM-DD-YYYY')
      )
    );
  }

  //remove date from blood component status
  onRemoveBloodComDate() {
    this.bloodCompDate = '';
  }

  //remove date from blood available status
  onRemoveBloodAvailableDate() {
    this.bloodAvailableDate = '';
  }
  ngDestory() {
    this.bloodCompStatusSub.unsubscribe();
  }
}
