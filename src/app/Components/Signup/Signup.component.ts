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
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 2000; year--) {
      this.years.push(year);
    }

    this.organizationForm = this.fb.group({
      organizationType: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.store.dispatch(new AuthAction.GetAllCategories());
    this.categoryDetailsSub = this.categoryDetails$.subscribe((data) => {
      if (data) {
        this.categoryDetails = data.data;
        const controls = this.categoryDetails.fields;
        for (const formField of controls) {
          this.organizationForm.addControl(
            formField.key,
            new FormControl(
              '',

              this.getValidators(formField)
            )
          );
        }
        this.orgFormFields = controls;
        console.log(this.organizationForm);
        console.log(this.organizationForm.valid);
      }
    });
    this.orgCateogoriesSub = this.orgCategories$.subscribe((data) => {
      if (data) {
        this.orgCategories = data.data;
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
    // this.organizationForm = new FormGroup({
    //   organizationType: new FormControl('', [Validators.required]),
    //   organizationName: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    //   ]),
    //   orgAddress: new FormControl(''),
    //   orgContact: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    //   ]),
    //   orgRegNum: new FormControl('', [Validators.required]),
    //   orgRegCouncil: new FormControl('', [Validators.required]),
    //   orgRegYear: new FormControl('', [Validators.required]),
    //   orgCity: new FormControl(''),
    //   orgPincode: new FormControl(''),
    //   orgLocation: new FormControl(''),
    //   orgFileUpload: new FormControl('', [Validators.required]),
    // });

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
  onResetOrgForm() {
    this.organizationForm.reset();
  }

  //SUBMITING THE FORM
  onSubmit() {
    console.log(this.organizationForm.valid, this.organizationForm.invalid);

    const formValues = this.organizationForm.value;
    console.log(formValues);
    let formData = new FormData();
    Object.keys(this.organizationForm.controls).forEach((key) => {
      console.log(key, formValues[key]);
      if (key !== 'docs' && key !== 'organizationType') {
        formData.append(key, formValues[key]);
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

  //On Organisation Type select
  onOrgTypSelect(category) {
    if (category) {
      this.store.dispatch(new AuthAction.GetCategory(category));
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
}
