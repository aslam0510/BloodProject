import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as SideNavAction from '../../../store/Actions/sideNavAction';
import * as DashboardAction from '../../../store/Actions/dashboardActions';
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
  orgForm: FormGroup;
  entityForm: FormGroup;
  userRole$: Observable<any>;
  userRole: any;
  userRoleSub: Subscription;
  isOrg: boolean = true;
  isEntity: boolean = false;
  entities$: Observable<any>;
  entities: any;
  entitiesSub: Subscription;
  entity$: Observable<any>;
  entity: any;
  entitySub: Subscription;
  editUserData: any;
  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddUserDailogComponent>
  ) {
    this.userRole$ = this.store.select((state) => state.SidNavSlice.userRole);
    this.entities$ = this.store.select(
      (state) => state.DashboardSlice.entititiesDetails
    );
    this.entity$ = this.store.select(
      (state) => state.DashboardSlice.entityById
    );
    this.editUserData = data?.formData;
    console.log(this.editUserData);
  }

  ngOnInit() {
    this.store.dispatch(new DashboardAction.GetEntityDetails());
    this.store.dispatch(new SideNavAction.GetUserRole());

    this.orgForm = new FormGroup({
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
      role: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    this.entityForm = new FormGroup({
      entity: new FormControl('', [Validators.required]),
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
      role: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    this.userRoleSub = this.userRole$.subscribe((data) => {
      if (data) {
        this.userRole = data.data;
      }
    });

    this.entitiesSub = this.entities$.subscribe((data) => {
      if (data) {
        this.entities = data.data;
      }
    });

    this.entitySub = this.entity$.subscribe((data) => {
      if (data) {
        this.entity = data.data;
        console.log(this.entity);
      }
    });
  }

  onSelectEntity(entity) {
    this.store.dispatch(new DashboardAction.GetEntityById(entity.id));
  }

  onOrgFormSave() {
    const orgFormValues = this.orgForm.value;
    let role = [];
    role = this.userRole.filter((role) => role.name === orgFormValues.role);

    const payload = {
      userName: orgFormValues.userName,
      email: orgFormValues.email,
      contact: Number(orgFormValues.contactNo),
      addr: orgFormValues.address,
      status: Number(orgFormValues.status),
      userType: 2,
      role: role,
    };

    this.store.dispatch(new SideNavAction.AddUser(payload));
  }

  onEntityFormSave() {
    const entityFormValues = this.entityForm.value;
    let role = [];
    role = this.userRole.filter((role) => role.name === entityFormValues.role);

    const payload = {
      entName: this.entity.bldbnkName,
      entId: this.entity.entId,
      userName: entityFormValues.userName,
      email: entityFormValues.email,
      contact: Number(entityFormValues.contactNo),
      addr: entityFormValues.address,
      status: Number(entityFormValues.status),
      userType: 3,
      role: role,
    };

    this.store.dispatch(new SideNavAction.AddUser(payload));
  }

  radioChnage(event) {
    if (event.value !== 'org') {
      this.isOrg = false;
      this.isEntity = true;
      this.orgForm.reset();
    } else {
      this.isEntity = false;
      this.isOrg = true;
      this.entityForm.reset();
    }
  }
}
