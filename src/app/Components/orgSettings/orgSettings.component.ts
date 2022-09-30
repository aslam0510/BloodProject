import { ForgetPassword } from './../../store/Actions/auth.action';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
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
  entityDocs = [];
  updateOrgInfo$: Observable<any>;
  updateOrgInfo: any;
  updateOrgInfoSub: Subscription;
  updateEntityInfo$: Observable<any>;
  updateEntityInfo: any;
  updateEntityInfoSub: Subscription;
  organizationForm: FormGroup;
  entityDetailForm: FormGroup;
  orgUploadDocuments = [];
  showOrg = true;
  showEntity = false;
  currentRouter: any;
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouter = event.url;
      }
    });
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
    this.entityDetailForm = new FormGroup({
      orgType: new FormControl(''),
      bldBankName: new FormControl(''),
      parentHptName: new FormControl(''),
      category: new FormControl(''),
      contactNumber: new FormControl(''),
      regNumber: new FormControl(''),
      regYear: new FormControl(''),
      licenseNum: new FormControl(''),
      licenseValid: new FormControl(''),
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
      comFacility: new FormControl(''),
      apFacility: new FormControl(''),
    });
    this.entityDetailsSub = this.entityDetails$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.entityDetails = data.data.details;
        }
      }
    });

    this.organizationDetailsSub = this.organizationDetails$.subscribe(
      (data) => {
        if (data) {
          this.organizationDetails = data.data;
          this.orgUploadDocuments = data.data.docs;
          this.setOrgFormValues(this.organizationDetails);
        }
      }
    );

    this.entitySub = this.entity$.subscribe((data) => {
      if (data) {
        this.entityDocs = [];
        this.entity = data.data;
        this.entityDocs = data.data.docs
        this.entityFormSetValues(this.entity);
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
    this.organizationForm.patchValue({
      orgType: formValue.categoryName,
      entityType: formValue.typeOfEntity,
      companyName: formValue.compName,
      regNumber: formValue.regNumber,
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

    this.organizationForm.disable();
  }

  entityFormSetValues(formValue) {
    this.entityDetailForm.patchValue({
      orgType: formValue.categoryName,
      bldBankName: formValue.bldbnkName,
      parentHptName: formValue.prnthsptlName,
      regNumber: formValue.regNumber,
      regYear: formValue.regYear,
      contactNumber: formValue.contact,
      emailAddress: formValue.email,
      website: formValue.web,
      nameOfContact: formValue.namePointCont,
      desgContact: formValue.designPointCont,
      address1: formValue.addLine1,
      address2: formValue.addLine2,
      licenseValid: formValue.licnsValid,
      licenseNum: formValue.licnsNmbr,
      city: formValue.city,
      district: formValue.district,
      state: formValue.state,
      pincode: formValue.pinCode,
      apFacility: formValue.apFacility,
      comFacility: formValue.compFacility,
    });
    this.entityDocs = formValue.docs;
    this.entityDetailForm.disable();
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
    this.showEntity = true;
    this.showOrg = false;
    this.cancel();
    this.store.dispatch(new DashboardAction.GetEntityById(entity.id));
  }

  onOrgInfo(orgInfo?: any) {
    this.showEntity = false;
    this.showOrg = true;
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
      this.showOrg
        ? this.organizationForm.get(control).disable()
        : this.entityDetailForm.get(control).disable();
    } else {
      this.showOrg
        ? this.organizationForm.get(control).enable()
        : this.entityDetailForm.get(control).enable();
    }
  }

  onEdit() {
    this.isEdit = false;
    if (this.showEntity) {
      Object.keys(this.entityDetailForm.controls).forEach((control) => {
        this.disableFields(control);
      });
    }
    if (this.showOrg) {
      Object.keys(this.organizationForm.controls).forEach((control) => {
        this.disableFields(control);
      });
    }
  }

  cancel() {
    this.isEdit = true;
    this.showOrg
      ? this.organizationForm.disable()
      : this.entityDetailForm.disable();
  }

  save() {
    if (this.showOrg) {
      const orgFormValues = this.organizationForm.value;
      this.store.dispatch(new DashboardAction.UpdateOrgInfo(orgFormValues));
    }
    if (this.showEntity) {
      this.editForm.enable();
      const entityFormValue = this.entityDetailForm.value;
      this.store.dispatch(
        new DashboardAction.UpdateEntityInfo(entityFormValue)
      );
    }
    this.cancel();
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.entitySub.unsubscribe();
    this.updateOrgInfoSub.unsubscribe();
    this.organizationDetailsSub.unsubscribe();
    this.entityDetailsSub.unsubscribe();
    this.updateOrgInfoSub.unsubscribe();
  }
}
