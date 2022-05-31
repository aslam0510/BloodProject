import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as dashboardActions from '../../store/Actions/dashboardActions';
import * as AuthAction from '../../store/Actions/auth.action';
import { Observable, Subscription } from 'rxjs';
import { getOrgTypes } from './../../store/Selectors/dashboardSelector';
import { OrgFormModel } from './../../models/orgFormModel';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from './../../Dialogs/appDialog/appDialog.component';

@Component({
  selector: 'app-Signup',
  templateUrl: './Signup.component.html',
  styleUrls: ['./Signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  organizationForm: FormGroup;
  newEntityForm: FormGroup;
  showFile = false;
  organizationFiles = [];
  entityFiles = [];
  acceptOnlyPDF = '';
  orgCategories$: Observable<any>;
  orgCategories: [] = [];
  orgCateogoriesSub: Subscription;
  orgForm$: Observable<OrgFormModel>;
  orgForm: OrgFormModel;
  orgFormSub: Subscription;
  selectedYear: number;
  years: number[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.orgCategories$ = this.store.select(
      (state) => state.AuthSlice.categories
    );
    this.orgForm$ = this.store.select((state) => state.DashboardSlice.orgForm);
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 2000; year--) {
      this.years.push(year);
    }
  }

  ngOnInit() {
    this.store.dispatch(new AuthAction.GetAllCategories());
    this.orgCateogoriesSub = this.orgCategories$.subscribe((data) => {
      if (data) {
        this.orgCategories = data;
        console.log(this.orgCategories);
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

    //ORGANIZATION FORM
    this.organizationForm = new FormGroup({
      organizationType: new FormControl('', [Validators.required]),
      organizationName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      orgAddress: new FormControl(''),
      orgContact: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      orgRegNum: new FormControl('', [Validators.required]),
      orgRegCouncil: new FormControl('', [Validators.required]),
      orgRegYear: new FormControl('', [Validators.required]),
      orgCity: new FormControl(''),
      orgPincode: new FormControl(''),
      orgLocation: new FormControl(''),
      orgFileUpload: new FormControl('', [Validators.required]),
    });

    //ENTITY FORM
    this.newEntityForm = this.fb.group({
      newEntities: new FormArray([]),
    });
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

  //DELETEING THE ENTITY
  deleteEntity(index) {
    let delEntity = this.NewEntity;
    delEntity.removeAt(index);
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

  //ENTITY FORM UPLOAD
  onEntFileUpload(event) {
    const [...files] = event.target.files;
    this.entityFiles.push(...files);
  }

  onSignupForm() {}

  //REMOVING ORGANIZATION FILE
  onDeleteFile(index) {
    this.organizationFiles = this.organizationFiles.filter(
      (x, i) => i !== index
    );
  }

  // onParentAddChng() {
  //   const parentAddress = this.organizationForm.get('orgAddress').value;
  //   if (parentAddress) {
  //     console.log(parentAddress);

  //     this.newEntityForm.controls.entAddress.setValue(parentAddress);
  //     // this.newEntityForm.get('entAddress').setValue('hiii');
  //   }
  // }

  onDeleteEntityFile(index) {}

  //RESETING THE ORGANIZATION FORM
  onResetOrgForm() {
    this.organizationForm.reset();
  }

  //SUBMITING THE FORM
  onSubmit() {
    if (this.organizationForm.valid) {
      const orgForm = this.organizationForm.value;
      let formData = new FormData();
      formData.append('name', orgForm.organizationName);
      formData.append('type', orgForm.organizationType);
      formData.append('email', orgForm.email);
      formData.append('contact', orgForm.orgContact);
      formData.append('addr', orgForm.orgAddress);
      formData.append('city', orgForm.orgCity);
      formData.append('state', orgForm.orgState);
      formData.append('pin', orgForm.orgPincode);
      formData.append('country', '');
      formData.append('location', orgForm.orgLocation);
      formData.append('regNo', orgForm.orgRegNum);
      formData.append('regYear', orgForm.orgRegYear);
      formData.append('regCouncil', orgForm.orgRegCouncil);
      for (var i = 0; i < this.organizationFiles.length; i++) {
        formData.append('docs', this.organizationFiles[i]);
      }
      this.store.dispatch(new dashboardActions.SubmitOrgForm(formData));
      localStorage.setItem('orgForm', 'true');
    }
  }

  showDialog() {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      width: '350px',
      height: 'auto',
      data: {
        title: 'Application Submitted Successfully !',
        content:
          'we have received your application. We are currently reviewing your application. After Successful verificatio you will receive Username and Password through email. We will get back to you with the status within 2-3 days',
        ok: true,
        cancel: false,
        button: 'Done',
      },
    });
  }
  ngOnDestroy() {
    this.orgCateogoriesSub.unsubscribe();
    this.orgFormSub.unsubscribe();
    localStorage.removeItem('orgForm');
  }
}
