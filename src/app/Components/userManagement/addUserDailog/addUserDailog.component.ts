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
  isEdit: boolean;
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
    this.editUserData = data.formData;
    this.isEdit = data.isEdit;

    if (this.isEdit) {
      this.isOrg = false;
      this.isEntity = false;
    }

    this.userRoleSub = this.userRole$.subscribe((data) => {
      if (data) {
        this.userRole = data.data;
      }
    });

    this.entitiesSub = this.entities$.subscribe((data) => {
      if (data) {
        this.entities = data.data.details;
      }
    });

    this.entitySub = this.entity$.subscribe((data) => {
      if (data) {
        this.entity = data.data;
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new DashboardAction.GetEntityDetails());
    if (this.isEdit) {
      this.store.dispatch(
        new SideNavAction.GetUserRole(this.editUserData?.userType)
      );
    } else {
      this.store.dispatch(new SideNavAction.GetUserRole(2));
    }

    this.orgForm = new FormGroup({
      userName: new FormControl(
        this.editUserData?.userType === 2 ? this.editUserData.userName : '',
        [Validators.required]
      ),
      email: new FormControl(
        this.editUserData?.userType === 2 ? this.editUserData.email : '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]
      ),
      contactNo: new FormControl(
        this.editUserData?.userType === 2 ? this.editUserData.contact : '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ),
      address: new FormControl(
        this.editUserData?.userType === 2 ? this.editUserData.addr : ''
      ),
      role: new FormControl(
        this.editUserData?.userType === 2 ? this.editUserData.role : '',
        [Validators.required]
      ),
      status: new FormControl(
        this.editUserData?.userType === 2
          ? this.editUserData.sts.toString()
          : '',
        [Validators.required]
      ),
      city: new FormControl(
        this.editUserData?.userType === 2 ? this.editUserData.city : '',
        [Validators.required]
      ),
      state: new FormControl(
        this.editUserData?.userType === 2 ? this.editUserData.state : '',
        [Validators.required]
      ),
      pincode: new FormControl(
        this.editUserData?.userType === 2 ? this.editUserData.pincode : '',
        [Validators.required]
      ),
    });

    this.entityForm = new FormGroup({
      entity: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.entName : '',
        [Validators.required]
      ),
      userName: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.userName : '',
        [Validators.required]
      ),
      email: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.email : '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]
      ),
      contactNo: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.contact : '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ),
      address: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.addr : ''
      ),
      role: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.role : '',
        [Validators.required]
      ),
      status: new FormControl(
        this.editUserData?.userType === 3
          ? this.editUserData.sts.toString()
          : '',
        [Validators.required]
      ),
      city: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.city : '',
        [Validators.required]
      ),
      state: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.state : '',
        [Validators.required]
      ),
      pincode: new FormControl(
        this.editUserData?.userType === 3 ? this.editUserData.pincode : '',
        [Validators.required]
      ),
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
      contact: orgFormValues.contactNo,
      addr: orgFormValues.address,
      sts: orgFormValues.status,
      city: orgFormValues.city,
      state: orgFormValues.state,
      pincode: orgFormValues.pincode,
      userType: 2,
      role: role,
    };
    if (this.isEdit) {
      payload['userId'] = this.editUserData?.userId;
      this.store.dispatch(new SideNavAction.EditUser(payload));
    } else {
      this.store.dispatch(new SideNavAction.AddUser(payload));
    }
    this.dialogRef.close();
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
      contact: entityFormValues.contactNo,
      addr: entityFormValues.address,
      sts: Number(entityFormValues.status),
      userType: 3,
      role: role,
      city: entityFormValues.city,
      state: entityFormValues.state,
      pincode: entityFormValues.pincode,
    };
    if (this.isEdit) {
      payload['userId'] = this.editUserData?.userId;
      this.store.dispatch(new SideNavAction.EditUser(payload));
    } else {
      this.store.dispatch(new SideNavAction.AddUser(payload));
    }

    this.dialogRef.close();
  }

  radioChnage(event) {
    if (event.value !== 'org') {
      this.isOrg = false;
      this.isEntity = true;
      // this.orgForm.reset();
      this.store.dispatch(new SideNavAction.GetUserRole(3));
    } else {
      this.store.dispatch(new SideNavAction.GetUserRole(2));
      this.isEntity = false;
      this.isOrg = true;
      // this.entityForm.reset();
    }
  }

  ngOnDestory() {
    this.userRoleSub.unsubscribe();
    this.entitySub.unsubscribe();
    this.entitiesSub.unsubscribe();
  }
}
