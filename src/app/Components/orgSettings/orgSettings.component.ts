import { ForgetPassword } from './../../store/Actions/auth.action';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
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
  acceptOnlyPDF = '';
  organizationDetails$: Observable<any>;
  organizationDetails: any;
  organizationDetailsSub: Subscription;
  entities$: Observable<any>;
  entities: any;
  entitiesSub: Subscription;
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
  routerUrl = 0;
  userRole;
  entityDetails$: Observable<any>;
  entityDetails: any;
  entityDetailsSub: Subscription;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.organizationDetails$ = this.store.select(
      (state) => state.DashboardSlice.organizationDetails
    );
    this.entities$ = this.store.select(
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
    this.entityDetails$ = this.store.select(
      (state) => state.DashboardSlice.entityById
    );
    this.store.dispatch(new DashboardAction.GetOrganizationDetails());
    this.userRole = localStorage.getItem('role');
    if (this.userRole === 'Organization Admin') {
      this.store.dispatch(new DashboardAction.GetEntityDetails());
    } else {
      this.store.dispatch(
        new DashboardAction.GetEntityById({
          entId: '',
          id: '',
        })
      );
    }
    this.isEdit = true;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouter = event.url;
      }
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((param) => {
      this.routerUrl = +param.get('id');
    });
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
      entId: new FormControl(''),
    });

    this.entitiesSub = this.entities$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.entities = data.data.details;
        }
      }
    });

    this.entityDetailsSub = this.entityDetails$.subscribe((data) => {
      if (data) {
        this.entities = [data.data];
        console.log(this.entities);
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
        this.entityDocs = data.data.docs;
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
      category: formValue.catgry,
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
    this.router.navigate(['/addEntity'], {
      queryParams: { id: this.routerUrl },
    });
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
    this.store.dispatch(
      new DashboardAction.GetEntityById({
        entId: entity._id,
        id: this.routerUrl,
      })
    );
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
      entityFormValue['docs'] = this.entityDocs;
      entityFormValue['entId'] = this.entity.entId;
      this.store.dispatch(
        new DashboardAction.UpdateEntityInfo(entityFormValue)
      );
    }
    this.cancel();
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.routerUrl },
    });
  }

  onDeleteFile(index, type) {
    if (type === 'entity') {
      this.entityDocs = this.entityDocs.filter((x, i) => i !== index);
    } else {
      this.orgUploadDocuments = this.entityDocs.filter((x, i) => i !== index);
    }
  }

  onOrgFileUpload(event, type) {
    this.acceptOnlyPDF = '';
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type == 'application/pdf') {
        if (type === 'entity') {
          this.entityDocs.push(event.target.files[i]);
        } else {
          this.orgUploadDocuments.push(event.target.files[i]);
        }
      } else {
        this.acceptOnlyPDF = 'Accept only PDF File';
      }
    }
  }

  downloadOrgFile(data: any) {
    const url: any = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = data.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  ngOnDestroy() {
    this.entitySub.unsubscribe();
    this.updateOrgInfoSub.unsubscribe();
    this.organizationDetailsSub.unsubscribe();
    this.entityDetailsSub.unsubscribe();
    this.updateOrgInfoSub.unsubscribe();
    this.entityDetailsSub.unsubscribe();
  }
}
