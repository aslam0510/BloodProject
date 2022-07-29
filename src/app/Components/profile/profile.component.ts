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
  userName = new FormControl('');
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
      userName: this.userName,
    });
    this.userDetailsSub = this.userDetails$.subscribe((response) => {
      if (response) {
        this.userDetails = response.data;
        const data = response.data;
        this.setFormValue(
          data.addr,
          data.city,
          data.state,
          data.district,
          data.pin,
          data.contact,
          data.email,
          data.userName
        );
      }
    });
  }

  setFormValue(
    addr,
    city,
    state,
    district,
    pin,
    altcontact,
    altemail,
    userName
  ) {
    console.log(
      addr,
      city,
      state,
      district,
      pin,
      altcontact,
      altemail,
      userName
    );

    this.userDetailsForm.setValue({
      addr: addr,
      city: city,
      state: state,
      district: district,
      pin: pin,
      altcontact: altcontact,
      altemail: altemail,
      userName: userName,
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
      userName: formValue.userName,
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
