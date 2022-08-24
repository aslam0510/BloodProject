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

    this.route.params.subscribe((param) => {
      this.urlId = param.id;
    });
    if (this.urlId) {
      this.store.dispatch(new SideNavActions.GetDonorRepoById(this.urlId));
      this.store.dispatch(
        new SideNavActions.GetDonorDonationById('62ea1c6a3c30335bbe6aa108')
      );
    }

    this.donorRepoSub = this.donorRepo$.subscribe((data) => {
      if (data) {
        this.donorRepo = data.data;
        this.setFormValue(this.donorRepo);
      }
    });

    this.donationDetailsSub = this.donationDetails$.subscribe((data) => {
      if (data) {
        this.donationDetails = data.dat;
        console.log(this.donationDetails);
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
      pincode: data?.pincode,
      uhid: data?.uhid,
      aadharNo: data?.aadharNo,
      dob: new Date(data?.dob).toDateString(),
      fitForDonate: data?.fitForDonate,
      donatedDate: data?.donateDate,
      weight: data?.weight,
      height: data?.height,
      address: data?.adddress,
      contact: data?.contact,
    });
    this.donorRepoForm.disable();
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
      pincode: formValues.pincode,
      uhid: formValues.uhid,
      aadharNo: formValues.aadharNo,
      dob: new Date(formValues.dob).toDateString(),
      fitForDonate: formValues.fitForDonate,
      donatedDate: formValues.donateDate,
      weight: formValues.weight,
      height: formValues.height,
      address: formValues.adddress,
      contact: formValues.contact,
    };

    this.store.dispatch(new SideNavActions.UpdateDonorRepoById(payload));
    this.router.navigate(['/donorDatabase']);
  }
}