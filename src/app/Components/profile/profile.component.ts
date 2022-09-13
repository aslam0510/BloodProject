import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import * as DashboardActions from '../../store/Actions/dashboardActions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userDetails$: Observable<any>;
  userDetails: any;
  userDetailsSub: Subscription;
  userDetailsForm: FormGroup;
  addr = new FormControl('');
  city = new FormControl('');
  state = new FormControl('');
  district = new FormControl('');
  pin = new FormControl('');
  altcontact = new FormControl('');
  altemail = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  entName = new FormControl('');
  entType = new FormControl('');
  role = new FormControl('');
  orgName = new FormControl('');
  isEditBtn: boolean = true;
  actionSubcription: Subscription;
  count: number = 0;
  constructor(
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private snackBar: MatSnackBar
  ) {
    this.userDetails$ = this.store.select(
      (state) => state.DashboardSlice.userDetails
    );
    this.actionSubcription = this.actionsSubj.subscribe((data) => {
      this.handleActionSubscription(data);
    });
  }
  handleActionSubscription(data: any) {
    switch (data.type) {
      case DashboardActions.UPDATE_USER_DETAILS_SUCCESS:
        if (data.payload.code === 200) {
          this.snackBar.open('Updated Successfully', '', { duration: 2000 });

          this.store.dispatch(new DashboardActions.GetUserDetails());
        }
        break;
    }
  }
  ngOnInit() {
    this.store.dispatch(new DashboardActions.GetUserDetails());
    this.userDetailsForm = new FormGroup({
      addr: this.addr,
      city: this.city,
      state: this.state,
      district: this.district,
      pin: this.pin,
      altcontact: this.altcontact,
      altemail: this.altemail,
      firstName: this.firstName,
      lastName: this.lastName,
      entName: this.entName,
      entType: this.entType,
      orgName: this.orgName,
      role: this.role,
    });
    this.userDetailsSub = this.userDetails$.subscribe((response) => {
      if (response) {
        this.userDetails = response.data;
        this.setFormValue();
      }
    });
  }

  setFormValue() {
    console.log(this.userDetails);
    this.userDetailsForm.patchValue({
      addr: this.userDetails?.addr,
      city: this.userDetails?.city,
      state: this.userDetails?.state,
      district: this.userDetails?.district,
      pin: this.userDetails?.pin,
      altcontact: this.userDetails?.contact,
      altemail: this.userDetails?.email,
      firstName: this.userDetails?.userName,
      orgName: this.userDetails?.orgName,
      role: this.userDetails?.role,
    });
    this.userDetailsForm.disable();
  }

  onEdit() {
    this.isEditBtn = false;
    this.userDetailsForm.enable();
  }
  cancel() {
    this.isEditBtn = true;
    this.userDetailsForm.reset();
    this.userDetailsForm.disable();
    this.setFormValue();
  }

  save() {
    const formValue = this.userDetailsForm.value;
    const payload = {
      addr: formValue.addr,
      city: formValue.city,
      state: formValue.state,
      district: formValue.district,
      pin: formValue.pin,
      altcontact: formValue.contact,
      altemail: formValue.email,
      userName: formValue.firstName,
      _2fa: true,
    };
    this.store.dispatch(new DashboardActions.UpdateUserDetails(payload));
    this.isEditBtn = true;
  }

  removeCount() {
    this.count--;
  }
  addCount() {
    this.count++;
  }
}
