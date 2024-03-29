import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  ValidatorFn,
} from '@angular/forms';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as dashboardActions from '../../store/Actions/dashboardActions';
import * as AuthAction from '../../store/Actions/auth.action';
import { Observable, Subscription } from 'rxjs';
import { getOrgTypes } from './../../store/Selectors/dashboardSelector';
import { OrgFormField, OrgFormModel } from './../../models/orgFormModel';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-addEntity',
  templateUrl: './addEntity.component.html',
  styleUrls: ['./addEntity.component.css'],
})
export class AddEntityComponent implements OnInit, OnDestroy {
  addNewEntityForm: FormGroup;
  organizationFiles = [];
  acceptOnlyPDF = '';
  entityCategories$: Observable<any>;
  entityCategories: any;
  entityCateogoriesSub: Subscription;
  addNewEntity$: Observable<OrgFormModel>;
  addNewEntity: OrgFormModel;
  addNewEntitySub: Subscription;
  categoryDetails$: Observable<any>;
  categoryDetails: any;
  categoryDetailsSub: Subscription;
  selectedYear: number;
  years: number[] = [];
  orgFormFields: OrgFormField[] = [];
  selectedIndex: number = 0;
  states = [
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland	',
    'Odisha',
    'Punjab	',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
  categories: any;
  orgType = '';
  routerUrl = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.entityCategories$ = this.store.select(
      (state) => state.DashboardSlice.entityCategories
    );
    this.categoryDetails$ = this.store.select(
      (state) => state.AuthSlice.categoryDetails
    );
    this.addNewEntity$ = this.store.select(
      (state) => state.DashboardSlice.addNewEntity
    );
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 2000; year--) {
      this.years.push(year);
    }

    this.addNewEntityForm = new FormGroup({
      categoryName: new FormControl('Blood Bank', [Validators.required]),
      catgry: new FormControl('', [Validators.required]),
      prnthsptlName: new FormControl('', [Validators.required]),
      bldbnkName: new FormControl('', [Validators.required]),
      compName: new FormControl('', [Validators.required]),
      typeOfEntity: new FormControl('', [Validators.required]),
      regNumber: new FormControl('', [Validators.required]),
      addLine1: new FormControl('', [Validators.required]),
      licnsValid: new FormControl('', [Validators.required]),
      licnsNmbr: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required]),
      regYear: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      addLine2: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      namePointCont: new FormControl(''),
      designPointCont: new FormControl(''),
      web: new FormControl(''),
      comFacility: new FormControl('', [Validators.required]),
      apFacility: new FormControl('', [Validators.required]),
      googleMapCrd: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((param) => {
      this.routerUrl = +param.get('id');
    });
    this.store.dispatch(new AuthAction.GetCategory('Blood Bank'));
    this.store.dispatch(new dashboardActions.GetEntityCategories());
    this.categoryDetailsSub = this.categoryDetails$.subscribe((data) => {
      if (data) {
        this.categoryDetails = data.data.fields;
        this.orgType = data.data.categoryName;
        this.categories = this.categoryDetails.filter(
          (x) => x.key === 'catgry'
        )[0].values;
      }
    });
    this.entityCateogoriesSub = this.entityCategories$.subscribe((data) => {
      if (data) {
        this.entityCategories = data.data;
      }
    });

    this.addNewEntitySub = this.addNewEntity$.subscribe((data) => {
      if (data) {
        this.addNewEntity = data;
      }
    });
  }

  getValidators(control): ValidatorFn {
    if (control.key === 'email' && control.mandatory) {
      return (
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        Validators.required
      );
    }
    if (control.key === 'contact' && control.mandatory) {
      return (
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.required
      );
    }
    if (control.mandatory) {
      return Validators.required;
    }
  }

  //ORGANIZATION FORM UPLOAD
  onOrgFileUpload(event) {
    this.acceptOnlyPDF = '';
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type == 'application/pdf') {
        this.organizationFiles.push(event.target.files[i]);
      } else {
        this.acceptOnlyPDF = 'Accept only PDF File';
      }
    }
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  public nextStep() {
    this.selectedIndex += 1;
  }

  public previousStep() {
    this.selectedIndex -= 1;
  }

  //REMOVING ORGANIZATION FILE
  onDeleteFile(index) {
    this.organizationFiles = this.organizationFiles.filter(
      (x, i) => i !== index
    );
  }

  //RESETING THE ORGANIZATION FORM
  onResetOrgForm(event) {
    event.stopPropagation();
    this.addNewEntityForm.reset();
  }

  //SUBMITING THE FORM
  onSubmit() {
    const formValues = this.addNewEntityForm.value;
    let formData = new FormData();
    Object.keys(this.addNewEntityForm.controls).forEach((key) => {
      if (key !== 'docs' && key !== 'organizationType') {
        formData.append(key, formValues[key]);
      }
    });
    for (var i = 0; i < this.organizationFiles.length; i++) {
      formData.append('docs', this.organizationFiles[i]);
    }
    this.store.dispatch(new dashboardActions.AddNewEntity(formData));
  }

  //On Organisation Type select
  onOrgTypSelect(category) {
    this.orgType = category;
    if (category) {
      this.store.dispatch(new AuthAction.GetCategory(category));
    }
  }

  onCheckBox(event, control) {
    // this.addNewEntityForm.controls[control].setValue(event.checked);
  }

  ngOnDestroy() {
    this.entityCateogoriesSub.unsubscribe();
    this.addNewEntitySub.unsubscribe();
    localStorage.removeItem('orgForm');
  }
  navigate() {
    this.router.navigate(['/dashboard/allMessages'], {
      queryParams: { id: this.routerUrl },
    });
  }
}
