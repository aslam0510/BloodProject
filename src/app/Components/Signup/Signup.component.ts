import { Router } from '@angular/router';
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
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as dashboardActions from '../../store/Actions/dashboardActions';
import * as AuthAction from '../../store/Actions/auth.action';
import { Observable, Subscription } from 'rxjs';
import { getOrgTypes } from './../../store/Selectors/dashboardSelector';
import { OrgFormField, OrgFormModel } from './../../models/orgFormModel';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from './../../Dialogs/appDialog/appDialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-Signup',
  templateUrl: './Signup.component.html',
  styleUrls: ['./Signup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit, OnDestroy {
  organizationForm: FormGroup;
  newEntityForm: FormGroup;
  showFile = false;
  organizationFiles = [];
  entityFiles = [];
  acceptOnlyPDF = '';
  orgCategories$: Observable<any>;
  orgCategories: any;
  orgCateogoriesSub: Subscription;
  orgForm$: Observable<OrgFormModel>;
  orgForm: OrgFormModel;
  orgFormSub: Subscription;
  categoryDetails$: Observable<any>;
  categoryDetails: any;
  categoryDetailsSub: Subscription;
  selectedYear: number;
  years: number[] = [];
  orgFormFields: OrgFormField[] = [];
  entityCateogries$: Observable<any>;
  entityCategories: any;
  isEditable = false;
  entityCategoriesSub: Subscription;
  currentDate;
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
  orgType = '';
  selectedIndex: number = 0;
  categories: any;
  callAPi = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.orgCategories$ = this.store.select(
      (state) => state.AuthSlice.categories
    );
    this.categoryDetails$ = this.store.select(
      (state) => state.AuthSlice.categoryDetails
    );
    this.orgForm$ = this.store.select((state) => state.DashboardSlice.orgForm);
    this.entityCateogries$ = this.store.select(
      (state) => state.DashboardSlice.entityCategories
    );
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 2000; year--) {
      this.years.push(year);
    }

    if (this.callAPi) {
      this.store.dispatch(new AuthAction.GetCategory('Blood Bank'));
    }
    this.store.dispatch(new AuthAction.GetAllCategories());
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

  ngOnInit() {
    this.currentDate = new Date();
    this.categoryDetailsSub = this.categoryDetails$.subscribe((data) => {
      if (data) {
        this.categoryDetails = data.data.fields;
        console.log(data);

        this.orgType = data.data.categoryName;
        this.organizationForm.get('categoryName').setValue(this.orgType);
        console.log(this.orgType);

        this.categories = this.categoryDetails.filter(
          (x) => x.key === 'catgry'
        )[0].values;
      }
    });

    // ORGANIZATION FORM
    this.organizationForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
      catgry: new FormControl('', [Validators.required]),
      prnthsptlName: new FormControl('', [Validators.maxLength(128)]),
      bldbnkName: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      regAuthority: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      addLine1: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      licnsValid: new FormControl('', [Validators.required]),
      licnsNmbr: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+/_'),
        Validators.maxLength(25),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(64),
      ]),
      state: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$'),
      ]),
      regYear: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.maxLength(64)]),
      addLine2: new FormControl('', [Validators.maxLength(128)]),
      email: new FormControl('', [
        Validators.maxLength(64),
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      namePointCont: new FormControl('', [Validators.maxLength(128)]),
      designPointCont: new FormControl('', [Validators.maxLength(128)]),
      web: new FormControl('', [Validators.maxLength(64)]),
      compFacility: new FormControl('', [Validators.required]),
      apFacility: new FormControl('', [Validators.required]),
      googleMapCrd: new FormControl(''),
    });

    this.orgCateogoriesSub = this.orgCategories$.subscribe((data) => {
      if (data) {
        this.orgCategories = data.data;
      }
    });

    this.entityCategoriesSub = this.entityCateogries$.subscribe((data) => {
      if (data) {
        this.entityCategories = data.data;
      }
    });

    this.orgFormSub = this.orgForm$.subscribe((data) => {
      if (data) {
        this.orgForm = data;
        const showPopup = localStorage.getItem('orgForm');
        if (showPopup) {
          this.router.navigate(['/login']);
          this.showDialog();
        }
      }
    });

    //ENTITY FORM
    this.newEntityForm = this.fb.group({
      newEntities: new FormArray([]),
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

  addNewEntity() {
    if (!this.organizationForm.valid) {
      let entity = this.NewEntity;
      let newEntity = this.fb.group({
        entOrganizationType: new FormControl('', [Validators.required]),
        entOrganizationName: new FormControl('', [Validators.required]),
        entEmail: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
        entAddress: new FormControl('', [Validators.required]),
        entContact: new FormControl('', [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ]),
        entRegNum: new FormControl('', [Validators.required]),
        entRegCouncil: new FormControl('', [Validators.required]),
        entRegYear: new FormControl('', [Validators.required]),
        entCity: new FormControl(''),
        entPincode: new FormControl(''),
        entLocation: new FormControl(''),
        entFileUpload: new FormControl(''),
      });

      entity.push(newEntity);
    }
  }

  get NewEntity(): FormArray {
    return this.newEntityForm.get('newEntities') as FormArray;
  }

  //ENTITY FORM CONTROL
  NewEntityControl(): FormArray {
    return this.newEntityForm.get('newEntities') as FormArray;
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

  //REMOVING ORGANIZATION FILE
  onDeleteFile(index) {
    this.organizationFiles = this.organizationFiles.filter(
      (x, i) => i !== index
    );
  }

  //RESETING THE ORGANIZATION FORM
  onResetOrgForm(event) {
    event.stopPropagation();
    this.organizationForm.reset();
  }

  //SUBMITING THE FORM
  onSubmit() {
    const formValues = this.organizationForm.value;
    let formData = new FormData();

    Object.keys(this.organizationForm.controls).forEach((key) => {
      if (key !== 'docs' && key !== 'organizationType') {
        formData.append(key, formValues[key]);
      }
      if (key === 'licnsValid') {
        const date = moment(formValues.licnsValid).format('MM-DD-YYYY');
        formData.append(key, date);
      }
      if (key === 'regYear') {
        const date = moment(formValues.regYear).format('MM-DD-YYYY');
        formData.append(key, date);
      }
    });
    for (var i = 0; i < this.organizationFiles.length; i++) {
      formData.append('docs', this.organizationFiles[i]);
    }
    this.store.dispatch(new dashboardActions.SubmitOrgForm(formData));
    localStorage.setItem('orgForm', 'true');
  }

  showDialog() {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      width: '600px',
      height: 'auto',
      data: {
        title: 'Application Submitted Successfully !',
        content:
          'we have received your application. We are currently reviewing your application. After Successful verificatio you will receive Username and Password through email. We will get back to you with the status within 2-3 days',
        image: '/assets/Images/logo.svg',
        ok: true,
        cancel: false,
        button: '',
      },
    });
  }

  //On Organisation Type select
  onOrgTypSelect(category) {
    this.callAPi = false;
    this.orgType = category;

    if (category == 'Blood Bank') {
    } else if (category == 'Multiple Services') {
      this.organizationForm.addControl(
        'typeOfEntity',
        new FormControl('', [Validators.required])
      );
      this.organizationForm.addControl(
        'compName',
        new FormControl('', [Validators.required, Validators.maxLength(128)])
      );
      this.organizationForm.addControl(
        'regNumber',
        new FormControl('', [Validators.required])
      );
    }

    if (category) {
      this.store.dispatch(new AuthAction.GetCategory(category));
    }
    if (category === 'Multiple Services') {
      this.store.dispatch(new dashboardActions.GetEntityCategories());
    }
  }

  onCheckBox(event, control) {
    // this.organizationForm.controls[control].setValue(event.checked);
  }
  ngOnDestroy() {
    this.orgCateogoriesSub.unsubscribe();
    this.orgFormSub.unsubscribe();
    localStorage.removeItem('orgForm');
  }

  navigate() {
    this.router.navigate(['/dashboard']);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.organizationForm.controls[controlName].hasError(errorName);
  };

  // myDateFilter = (m: Moment | null): boolean => {
  //   const year = (m || moment()).year();
  //   return year >= this.currentYear - 1;
  // };
}
