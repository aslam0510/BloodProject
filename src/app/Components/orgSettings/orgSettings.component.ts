import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddEntityComponent } from '../addEntity/addEntity.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as DashboardAction from '../../store/Actions/dashboardActions';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orgSettings',
  templateUrl: './orgSettings.component.html',
  styleUrls: ['./orgSettings.component.css'],
})
export class OrgSettingsComponent implements OnInit {
  organizationDetails$: Observable<any>;
  organizationDetails: any;
  organizationDetailsSub: Subscription;
  entityDetails$: Observable<any>;
  entityDetails: any;
  entityDetailsSub: Subscription;
  editForm: FormGroup;
  isEdit: boolean = true;
  orgEnityObject: any;
  entity$: Observable<any>;
  entity: any;
  entitySub: Subscription;
  isControlDisable = true;
  isOrgInfo: boolean;
  docs = [];
  updateOrgInfo$: Observable<any>;
  updateOrgInfo: any;
  updateOrgInfoSub: Subscription;
  updateEntityInfo$: Observable<any>;
  updateEntityInfo: any;
  updateEntityInfoSub: Subscription;
  organizationForm: FormGroup;
  orgUploadDocuments = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.organizationDetails$ = this.store.select(
      (state) => state.DashboardSlice.organizationDetails
    );
    this.entityDetails$ = this.store.select(
      (state) => state.DashboardSlice.entititiesDetails
    );
    this.entity$ = this.store.select(
      (state) => state.DashboardSlice.entityById
    );
    this.updateEntityInfo$ = this.store.select(
      (state) => state.DashboardSlice.updateEntityInfo
    );
    this.updateOrgInfo$ = this.store.select(
      (state) => state.DashboardSlice.updateOrgInfo
    );
    this.store.dispatch(new DashboardAction.GetOrganizationDetails());
    this.store.dispatch(new DashboardAction.GetEntityDetails());
    this.isEdit = true;
    this.isOrgInfo = true;
  }

  ngOnInit() {
    this.editForm = new FormGroup({});
    this.organizationForm = new FormGroup({
      orgType: new FormControl(''),
      entityType: new FormControl(''),
      companyName: new FormControl(''),
      contactNumber: new FormControl(''),
      regNumber: new FormControl(''),
      regYear: new FormControl(''),
      emailAddress: new FormControl(''),
      website: new FormControl(''),
      nameOfContact: new FormControl(''),
      desgContact: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      district: new FormControl(''),
      state: new FormControl(''),
      pincode: new FormControl(''),
    });
    this.entityDetailsSub = this.entityDetails$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.entityDetails = data.data;
          this.orgUploadDocuments = this.entityDetails.docs;
        }
      }
    });

    this.organizationDetailsSub = this.organizationDetails$.subscribe(
      (data) => {
        if (data) {
          this.organizationDetails = data.data;
          this.setOrgFormValues(this.organizationDetails);
        }
      }
    );

    this.entitySub = this.entity$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.docs = [];
          this.entity = data.data;
          this.editForm = new FormGroup({});
          this.orgEnityObject = data.data;
          const form = data.data;
          this.docs.push(form.docs);
          for (let control in form) {
            this.editForm.addControl(
              control,
              new FormControl({
                value: `${form[control]}`,
                disabled: true,
              })
            );
          }
        }
      }
    });

    this.updateEntityInfoSub = this.updateEntityInfo$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.snackBar.open(data.payload.data.message, 'ok', {
            duration: 2500,
          });
          this.cancel();
        }
      }
    });
    this.updateOrgInfoSub = this.updateOrgInfo$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.snackBar.open(data.data.message, 'ok', {
            duration: 2500,
          });
          this.cancel();
        }
      }
    });
  }
  setOrgFormValues(formValue) {
    console.log(formValue);
    this.organizationForm.patchValue({
      orgType: formValue.categoryName,
      entityType: formValue.bldbnkName,
      companyName: formValue.prnthsptlName,
      regNumber: formValue.licnsNmbr,
      regYear: formValue.regYear,
      contactNumber: formValue.contact,
      emailAddress: formValue.email,
      website: formValue.web,
      nameOfContact: formValue.namePointCont,
      desgContact: formValue.designPointCont,
      address1: formValue.addLine1,
      address2: formValue.addLine2,
      city: formValue.city,
      district: formValue.district,
      state: formValue.state,
      pincode: formValue.pinCode,
    });
  }
  //Adding new Entity
  onAddEntitty() {
    this.router.navigate(['/addEntity']);
    // const dialogRef = this.dialog.open(AddEntityComponent, {
    //   width: '770px',
    //   height: 'auto',
    //   panelClass: 'custom-dialog-container',
    //   data: {
    //     editForm: this.organizationDetails,
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {});
  }

  onEntityInfo(entity) {
    this.isOrgInfo = false;
    this.cancel();
    this.store.dispatch(new DashboardAction.GetEntityById(entity.id));
  }

  onOrgInfo(orgInfo?: any) {
    this.editForm = new FormGroup({});
    this.isOrgInfo = true;
    this.store.dispatch(new DashboardAction.GetOrganizationDetails());
    this.cancel();
  }

  disableFields(control) {
    if (
      control === 'compName' ||
      control === 'categoryName' ||
      control === 'regNumber' ||
      control === 'email' ||
      control === 'regYear' ||
      control === 'docs' ||
      control === 'contact' ||
      control === 'orgId' ||
      control === 'entId' ||
      control === 'bldbnkName' ||
      control === 'prnthsptlName' ||
      control === 'licnsNmbr' ||
      control === 'licnsValid' ||
      control === 'regAuthority'
    ) {
      this.editForm.get(control).disable();
    } else {
      this.editForm.get(control).enable();
    }
  }

  onEdit() {
    this.isEdit = false;
    this.isControlDisable = false;
    Object.keys(this.editForm.controls).forEach((control) => {
      this.disableFields(control);
    });
  }

  cancel() {
    this.isEdit = true;
    this.editForm.disable();
  }

  save() {
    if (this.editForm.dirty && this.editForm.touched) {
      this.editForm.enable();
      const editFormValue = this.editForm.value;
      editFormValue['docs'] = this.docs;

      if (this.isOrgInfo) {
        this.store.dispatch(new DashboardAction.UpdateOrgInfo(editFormValue));
        this.editForm.disable();
      } else {
        this.store.dispatch(
          new DashboardAction.UpdateEntityInfo(editFormValue)
        );
        this.editForm.disable();
      }
      this.cancel();
    }
  }

  ngOnDestroy() {
    this.entitySub.unsubscribe();
    this.updateOrgInfoSub.unsubscribe();
    this.organizationDetailsSub.unsubscribe();
    this.entityDetailsSub.unsubscribe();
    this.updateOrgInfoSub.unsubscribe();
  }
}
