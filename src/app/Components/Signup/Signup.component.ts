import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-Signup',
  templateUrl: './Signup.component.html',
  styleUrls: ['./Signup.component.css'],
})
export class SignupComponent implements OnInit {
  organizationForm: FormGroup;
  newEntityForm: FormGroup;
  fileName = '';
  showFile = false;
  filesize = '';
  organizationFiles = [];
  entityFiles = [];
  addNewEntities = [];
  addNewEntityLength = 0;

  // @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.organizationForm = new FormGroup({
      organizationType: new FormControl('', [Validators.required]),
      organizationName: new FormControl('', [Validators.required]),
      orgEmailAddress: new FormControl('', [
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
    const [...files] = event.target.files;
    this.organizationFiles.push(...files);

    this.showFile = true;
    if (files.length === 0) return;
  }
  onEntFileUpload(event) {
    const [...files] = event.target.files;
    this.entityFiles.push(...files);

    this.showFile = true;
  }
  onSignupForm() {
    if (this.organizationForm.valid) {
    }
  }

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
      this.router.navigate(['dashboard']);
    }
  }
}
