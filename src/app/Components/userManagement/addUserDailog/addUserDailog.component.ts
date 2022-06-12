import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as SideNavAction from '../../../store/Actions/sideNavAction';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addUserDailog',
  templateUrl: './addUserDailog.component.html',
  styleUrls: ['./addUserDailog.component.css'],
})
export class AddUserDailogComponent implements OnInit {
  addUserForm: FormGroup;
  userRole$: Observable<any>;
  userRole: any;
  userRoleSub: Subscription;
  entityCategories$: Observable<any>;
  entityCategories: any;
  entityCategoriesSub: Subscription;

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddUserDailogComponent>
  ) {
    this.userRole$ = this.store.select((state) => state.SidNavSlice.userRole);
    this.entityCategories$ = this.store.select(
      (state) => state.SidNavSlice.userEntityCategories
    );
  }

  ngOnInit() {
    this.store.dispatch(new SideNavAction.GetUserRole());
    this.store.dispatch(new SideNavAction.GetEntityCategories());
    this.addUserForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      address: new FormControl(''),
      typeOfEntity: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    this.userRoleSub = this.userRole$.subscribe((data) => {
      if (data) {
        this.userRole = data.data;
      }
    });

    this.entityCategoriesSub = this.entityCategories$.subscribe((data) => {
      if (data) {
        this.entityCategories = data.data;
      }
    });
  }

  save() {
    const addUserFormValues = this.addUserForm.value;
    let role = [];
    role = this.userRole.filter((role) => role.name === addUserFormValues.role);
    console.log(role);

    const payload = {
      userName: addUserFormValues.userName,
      email: addUserFormValues.email,
      contact: Number(addUserFormValues.contactNo),
      addr: addUserFormValues.address,
      status: Number(addUserFormValues.status),
      userType: addUserFormValues.typeOfEntity,
      role: role,
    };

    this.store.dispatch(new SideNavAction.AddUser(payload));
  }
}
