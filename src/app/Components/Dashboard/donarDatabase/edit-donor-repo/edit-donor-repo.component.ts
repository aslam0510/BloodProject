import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import * as SideNavActions from '../../../../store/Actions/sideNavAction';
@Component({
  selector: 'app-edit-donor-repo',
  templateUrl: './edit-donor-repo.component.html',
  styleUrls: ['./edit-donor-repo.component.css'],
})
export class EditDonorRepoComponent implements OnInit {
  urlId = '';
  donorRepo$: Observable<any>;
  donorRepo: any;
  donorRepoSub: Subscription;
  donationDetails$: Observable<any>;
  donationDetails: any;
  donationDetailsSub: Subscription;
  donorRepoForm: FormGroup;
  donationForm: FormGroup;
  isRepo: string;
  isEditBtn: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.donorRepo$ = this.store.select((state) => state.SidNavSlice.donorById);
    this.donationDetails$ = this.store.select(
      (state) => state.SidNavSlice.donorDonationById
    );
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.isRepo = params.get('isRepo');
    });

    this.donorRepoForm = new FormGroup({
      dName: new FormControl(''),
      did: new FormControl(''),
      bldgrp: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      state: new FormControl(''),
      email: new FormControl(''),
      district: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl(''),
      uhid: new FormControl(''),
      aadharNo: new FormControl(''),
      dob: new FormControl(''),
      fitForDonate: new FormControl(''),
      donatedDate: new FormControl(''),
      weight: new FormControl(''),
      height: new FormControl(''),
      address: new FormControl(''),
      contact: new FormControl(''),
    });

    this.donationForm = new FormGroup({
      did: new FormControl(),
      bldReqId: new FormControl(),
      donationType: new FormControl(),
      collectionDate: new FormControl(),
      fitforDonation: new FormControl(),
    });

    this.route.params.subscribe((param) => {
      this.urlId = param.id;
    });

    if (this.isRepo == 'true') {
      this.store.dispatch(new SideNavActions.GetDonorRepoById(this.urlId));
    } else {
      this.store.dispatch(new SideNavActions.GetDonorDonationById(this.urlId));
    }

    this.donorRepoSub = this.donorRepo$.subscribe((data) => {
      if (data) {
        this.donorRepo = data.data;
        this.setFormValue(this.donorRepo);
        this.setDonationFormValue(this.donorRepo);
      }
    });

    this.donationDetailsSub = this.donationDetails$.subscribe((data) => {
      if (data) {
        this.donationDetails = data.data;
        this.setFormValue(this.donationDetails);
        this.setDonationFormValue(this.donationDetails);
      }
    });
  }

  setFormValue(formValues) {
    const data = formValues;
    this.donorRepoForm.patchValue({
      dName: data?.dName,
      did: data?.did,
      bldgrp: data?.bldgrp,
      age: data?.age,
      gender: data?.gender,
      state: data?.state,
      email: data?.email,
      district: data?.district,
      city: data?.city,
      pincode: data?.pinCode,
      uhid: data?.uhid,
      aadharNo: data?.aadharNo,
      dob: new Date(data?.dob).toDateString(),
      fitForDonate: data?.fitForDonate,
      donatedDate: data?.donateDate,
      weight: data?.wt,
      height: data?.ht,
      address: data?.addr,
      contact: data?.contact,
      donationType: data?.donationType,
      isDonorRepo: data?.isDonorRepo,
    });
    this.donorRepoForm.disable();
  }
  setDonationFormValue(formValue) {
    const data = formValue;
    this.donationForm.patchValue({
      did: data?.did,
      bldReqId: data?.bldReqId,
      donationType: data?.donationType,
      collectionDate: new Date(data?.donatedDate).toDateString(),
      fitforDonation: data?.fitForDonate,
    });
  }
  onEdit() {
    this.isEditBtn = false;
    this.donorRepoForm.enable();
    this.donorRepoForm.get('email').disable();
    this.donorRepoForm.get('contact').disable();
  }

  cancel() {
    this.isEditBtn = true;
    this.donorRepoForm.disable();
  }

  update() {
    const formValues = this.donorRepoForm.value;
    const payload = {
      _id: this.urlId,
      dName: formValues.dName,
      did: formValues.did,
      bldgrp: formValues.bldgrp,
      age: formValues.age,
      gender: formValues.gender,
      state: formValues.state,
      email: formValues.email,
      district: formValues.district,
      location: formValues.city,
      city: formValues.city,
      pinCode: formValues.pincode,
      uhid: formValues.uhid,
      aadharNo: formValues.aadharNo,
      dob: new Date(formValues.dob).toDateString(),
      fitForDonate: formValues.fitForDonate,
      // donatedDate: formValues.donateDate,
      wt: formValues.weight,
      ht: formValues.height,
      address: formValues.address,
      contact: formValues.contact,
      donationType: this.donationDetails.donationType
        ? this.donationDetails.donationType
        : this.donorRepo.donationType,
      isDonorRepo: this.donationDetails.isDonorRepo
        ? this.donationDetails.isDonorRepo
        : this.donorRepo.isDonorRepo,
      donatedDate: this.donationDetails.donatedDate
        ? this.donationDetails.donatedDate
        : this.donorRepo.donatedDate,
    };

    if (this.isRepo == 'true') {
      this.store.dispatch(new SideNavActions.UpdateDonorRepoById(payload));
    } else {
      this.store.dispatch(new SideNavActions.UpdateDonationById(payload));
    }
    this.router.navigate(['/dashboard/donorDatabase']);
  }

  navigate() {
    this.router.navigate(['/dashboard/donorDatabase']);
  }
}
