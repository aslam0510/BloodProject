import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Options as sliderOptions } from 'ng5-slider';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  sliderMinRange: number;
  sliderMaxRange: number;
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

  // slider options
  sliderOptions: sliderOptions = {
    floor: 0,
    ceil: 100,
    step: 1,
  };
  filterForm: FormGroup;
  bloodGroupList$: Observable<any>;
  bloodGroupList: any;
  bloodGroupListSub: Subscription;
  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FilterComponent>
  ) {
    this.bloodGroupList$ = this.store.select(
      (state) => state.SidNavSlice.bloodGroupTypes
    );
  }

  ngOnInit() {
    this.filterForm = new FormGroup({
      bloodGroup: new FormControl(''),
      gender: new FormControl(''),
      location: new FormControl(''),
      range: new FormControl(''),
      lastDonation: new FormControl(''),
    });
    this.sliderMinRange = 0;
    this.sliderMaxRange = 100;

    this.bloodGroupListSub = this.bloodGroupList$.subscribe((response) => {
      if (response) {
        this.bloodGroupList = response.data;
      }
    });
  }

  OnUpload() {
    const range1 = this.filterForm.value.range[0];
    const range2 = this.filterForm.value.range[1];
    const range = `Age ${range1} - ${range2}`;
    const payload = {
      bloodGroup: this.filterForm.value.bloodGroup,
      gender: this.filterForm.value.gender,
      lastDonation: this.filterForm.value.lastDonation,
      location: this.filterForm.value.location,
      range: range,
    };
    this.dialogRef.close(payload);
  }
}
