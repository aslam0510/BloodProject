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
import { Observable, Subscription } from 'rxjs';
import { getOrgTypes } from './../../store/Selectors/dashboardSelector';

@Component({
  selector: 'app-Signup',
  templateUrl: './Signup.component.html',
  styleUrls: ['./Signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  organizationForm: FormGroup;
  newEntityForm: FormGroup;
  fileName = '';
  showFile = false;
  filesize = '';
  organizationFiles = [];
  entityFiles = [];
  addNewEntities = [];
  addNewEntityLength = 0;

  orgTypes$: Observable<any>;
  orgTypes: [] = [];
  orgTypesSub: Subscription;
  // @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.orgTypes$ = this.store.select(getOrgTypes);
  }

  ngOnInit() {
    this.store.dispatch(new dashboardActions.GetOrganizationTypes());
    this.orgTypesSub = this.orgTypes$.subscribe((data) => {
      if (data) {
        this.orgTypes = data['types'];
      }
    });
    this.organizationForm = new FormGroup({
      organizationType: new FormControl('', [Validators.required]),
      organizationName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      orgAddress: new FormControl('', [Validators.required]),
      orgContact: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      orgRegNum: new FormControl('', [Validators.required]),
      orgRegCouncil: new FormControl('', [Validators.required]),
      orgRegYear: new FormControl('', [Validators.required]),
      orgCity: new FormControl('', [Validators.required]),
      orgPincode: new FormControl('', [Validators.required]),
      orgLocation: new FormControl('', [Validators.required]),
      orgFileUpload: new FormControl(''),
    });

    this.newEntityForm = this.fb.group({
      newEntities: new FormArray([]),
    });
  }

  addNewEntity() {
    if (this.organizationForm.valid) {
      let entity = this.NewEntity;
      let newEntity = this.fb.group({
        entOrganizationType: new FormControl('', [Validators.required]),
        entOrganizationName: new FormControl('', [Validators.required]),
        entEmailAddress: new FormControl('', [
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
        entCity: new FormControl('', [Validators.required]),
        entPincode: new FormControl('', [Validators.required]),
        entLocation: new FormControl('', [Validators.required]),
        entFileUpload: new FormControl(''),
      });

      entity.push(newEntity);
    }
  }
  deleteEntity(index) {
    let delEntity = this.NewEntity;
    delEntity.removeAt(index);
  }

  get NewEntity(): FormArray {
    return this.newEntityForm.get('newEntities') as FormArray;
  }

  NewEntityControl(): FormArray {
    return this.newEntityForm.get('newEntities') as FormArray;
  }

  onOrgFileUpload(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.organizationFiles.push(event.target.files[i]);
    }
  }
  onEntFileUpload(event) {
    const [...files] = event.target.files;
    this.entityFiles.push(...files);

    this.showFile = true;
  }
  onSignupForm() {}

  onDeleteFile(index) {
    this.organizationFiles = this.organizationFiles.filter(
      (x, i) => i !== index
    );
    console.log(this.organizationFiles);
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
  onSubmit() {
    if (this.organizationForm.valid) {
      const orgForm = this.organizationForm.value;
      let formData = new FormData();
      // const payload = {
      //   name: orgForm.organizationName,
      //   type: orgForm.organizationType,
      //   email: orgForm.email,
      //   contact: orgForm.orgContact,
      //   addr: orgForm.orgAddress,
      //   city: orgForm.orgCity,
      //   state: orgForm.orgState,
      //   pin: orgForm.orgPincode,
      //   country: '',
      //   location: orgForm.orgLocation,
      //   regno: orgForm.orgRegNum,
      //   regyear: orgForm.orgRegYear,
      //   regcouncil: orgForm.orgRegCouncil,
      // };
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
      formData.append('regno', orgForm.orgRegNum);
      formData.append('regyear', orgForm.orgRegYear);
      formData.append('regcouncil', orgForm.orgRegCouncil);
      for (var i = 0; i < this.organizationFiles.length; i++) {
        formData.append('docs', this.organizationFiles[i]);
      }
      this.store.dispatch(new dashboardActions.submitOrgForm(formData));
    }
  }

  ngOnDestroy() {
    this.orgTypesSub.unsubscribe();
  }
}
