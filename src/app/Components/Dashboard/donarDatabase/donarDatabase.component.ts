import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SendMessageComponent } from './../../../Dialogs/send-message/send-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilterComponent } from '../../filter/filter.component';
import { AppState } from 'src/app/app.state';
import * as SideNavActions from '../../../store/Actions/sideNavAction';
import { Observable, Subscription } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';

@Component({
  selector: 'app-donarDatabase',
  templateUrl: './donarDatabase.component.html',
  styleUrls: ['./donarDatabase.component.css'],
})
export class DonarDatabaseComponent implements OnInit {
  displayedColumns: string[] = [
    'donorName',
    'donorId',
    'UHID',
    'bloodGroup',
    'age',
    'gender',
    'lastDonation',
    'location',
  ];
  donationDisplayedColumns: string[] = [
    'donorName',
    'donorId',
    'bloodGroup',
    'donationType',
    'collectionDate',
    'bloodRequestId',
    'location',
  ];
  donorRepos$: Observable<any>;
  donorRepos = [];
  donorReposSub: Subscription;
  donorDonationList$: Observable<any>;
  donorDonationList: any;
  donorDonationListSub: Subscription;
  dataSource = new MatTableDataSource();
  DonationdataSource = new MatTableDataSource();
  addOnBlur = true;
  readonly separatorKeysCodes = ['ENTER', 'COMMA'] as const;
  filterData = [];
  selection = new SelectionModel(true, []);
  formValues: any;
  searchParameters = [
    'Name',
    "Donor's ID",
    'UHID',
    'Blood Request ID',
    'Location',
    'Contact Number',
  ];
  isSearch: boolean = false;
  searchForm: FormGroup;
  isRepo: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // paging details
  length = 100;
  pageSize = 100;
  pageSizeOptions: number[] = [10, 50, 100];
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.donorRepos$ = this.store.select(
      (state) => state.SidNavSlice.donorRepoList
    );

    this.donorDonationList$ = this.store.select(
      (state) => state.SidNavSlice.donorDonationHistory
    );

    this.searchForm = new FormGroup({
      searchTerm: new FormControl(''),
      searchParams: new FormControl(''),
    });
  }

  ngOnInit() {
    this.store.dispatch(new SideNavActions.GetDonorRepoList(1));
    this.store.dispatch(new SideNavActions.GetDonorDonationList(''));

    this.donorReposSub = this.donorRepos$.subscribe((data) => {
      if (data) {
        this.donorRepos = data.data.details;
        this.dataSource = new MatTableDataSource(this.donorRepos);
        this.dataSource.paginator = this.paginator;
        // this.dataSource.filterPredicate = this.filterRequests();
        this.dataSource.filter = JSON.stringify(this.formValues);
        this.length = this.dataSource.filteredData.length;
      }
    });
    this.donorDonationListSub = this.donorDonationList$.subscribe((data) => {
      if (data) {
        this.donorDonationList = data.data.details;
        this.DonationdataSource = new MatTableDataSource(
          this.donorDonationList
        );
        this.DonationdataSource.paginator = this.paginator;
        // this.DonationdataSource.filterPredicate = this.filterRequests();
        this.DonationdataSource.filter = JSON.stringify(this.formValues);
        this.length = this.DonationdataSource.filteredData.length;
        // this.DonationdataSource.filterPredicate = this.filterRequests();
      }
    });
  }

  // filterRequests(): (data: any, filter: string) => boolean {
  //   const filterFunction = function (data, filter): boolean {
  //     const searchTerms = JSON.parse(filter);
  //     console.log(searchTerms);
  //     const arr = [];
  //     arr.push(searchTerms);

  //     return searchTerms.location
  //       ? data.city
  //           .toString()
  //           .trim()
  //           .toLowerCase()
  //           .indexOf(searchTerms.location.toLowerCase()) !== -1
  //       : true || searchTerms.bloodGroup
  //       ? data.bldgrp
  //           .toString()
  //           .trim()
  //           .toLowerCase()
  //           .indexOf(searchTerms.bloodGroup.toLowerCase()) !== -1
  //       : true || searchTerms.gender
  //       ? data.gender
  //           .toString()
  //           .trim()
  //           .toLowerCase()
  //           .indexOf(searchTerms.gender.toLowerCase()) !== -1
  //       : true;
  //   };
  //   return filterFunction;
  // }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
  }

  onSendMessage() {
    this.dialog.open(SendMessageComponent, {
      width: '850px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }

  onDaySelect(day) {
    const today = moment();
    const yesterday = moment().add(-1, 'days');
    if (day === 'today') {
      const payload = {
        date: today.format('MM-DD-YYYY'),
      };
      this.store.dispatch(new SideNavActions.GetDonorDonationList(payload));
    } else if (day === 'yesterday') {
      const payload = {
        date: yesterday.format('MM-DD-YYYY'),
      };
      this.store.dispatch(new SideNavActions.GetDonorDonationList(payload));
      // this.store.dispatch(
      //   new SideNavAction.GetBloodCompStatus(yesterday.format('MM-DD-YYYY'))
      // );
    }
  }

  onDatePicker(date) {
    const today = moment();

    const payload = {
      date: moment(date.value).format('MM-DD-YYYY'),
    };
    this.store.dispatch(new SideNavActions.GetDonorDonationList(payload));
  }

  onFilter(event) {
    const dialogConfig = new MatDialogConfig();
    let targetAttr = event.target.getBoundingClientRect();

    dialogConfig.height = 'auto';
    dialogConfig.width = '350px';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.position = {
      top: targetAttr.y + targetAttr.height - 7 + 'px',
      left: targetAttr.x + targetAttr.width - 5 + 'px',
    };
    const dialogRef = this.dialog.open(FilterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.filterData = [];
      const formValues = result;
      console.log(result);

      for (const key in result) {
        if (result[key] !== '') {
          this.filterData.push(result[key]);
        }
      }
      this.formValues = formValues;
      this.dataSource.filter = JSON.stringify(this.formValues);
      this.filteredData(JSON.stringify(this.formValues));
    });
  }

  filteredData(filterJson) {
    const filterData = JSON.parse(filterJson);

    const data = this.donorRepos.filter((x) => {
      return (
        x.bldgrp.toString().trim().toLowerCase() ===
          filterData.bloodGroup.toString().trim().toLowerCase() ||
        x.gender.toString().trim().toLowerCase() ===
          filterData.gender.toString().trim().toLowerCase() ||
        x.city.toString().trim().toLowerCase() ===
          filterData.location.trim().toLowerCase()
      );
    });
    const datas = this.donorDonationList.filter((x) => {
      return (
        x.bldgrp.toString().trim().toLowerCase() ===
          filterData.bloodGroup.toString().trim().toLowerCase() ||
        x.gender.toString().trim().toLowerCase() ===
          filterData.gender.toString().trim().toLowerCase() ||
        x.city.toString().trim().toLowerCase() ===
          filterData.location.trim().toLowerCase()
      );
    });
    this.DonationdataSource = new MatTableDataSource(datas);
    this.dataSource = new MatTableDataSource(data);
  }
  editDonoRepo(row) {
    this.router.navigate(['/dashboard/editDonorRep', row._id], {
      queryParams: { isRepo: this.isRepo },
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.filterData.push({ value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit): void {
    const index = this.filterData.indexOf(fruit);

    if (index >= 0) {
      this.filterData.splice(index, 1);
      const f = this.formValues;
      for (const key in f) {
        if (f[key] == fruit) {
          delete f[key];
        }
        // const data = this.donorRepos.filter((x) => {
        //   return (
        //     (f[key] &&
        //       x.bldgrp.toString().trim().toLowerCase() !==
        //         f[key]?.toString().trim().toLowerCase()) ||
        //     (f[key] &&
        //       x.gender.toString().trim().toLowerCase() !==
        //         f[key]?.toString().trim().toLowerCase()) ||
        //     (f[key] &&
        //       x.city.toString().trim().toLowerCase() !==
        //         f[key]?.trim().toLowerCase())
        //   );
        // });
        this.dataSource = new MatTableDataSource(this.donorRepos);
        this.DonationdataSource = new MatTableDataSource(
          this.donorDonationList
        );
      }

      // this.dataSource.filter = JSON.stringify(this.formValues);
    }
  }

  searchParameter(event) {
    this.isSearch = true;
  }
  searchTerm(value) {
    if (this.searchForm.get('searchTerm').value) {
      const payload = {
        searchTerm: this.searchForm.get('searchTerm').value,
        searchParam: this.searchForm.get('searchParams').value,
      };
      this.store.dispatch(new SideNavActions.SearchDonorParam(payload));
    } else {
      this.searchForm.reset();
      this.store.dispatch(new SideNavActions.GetDonorRepoList(1));
    }
  }
  getNext(event: PageEvent) {}

  onTab(value) {
    if (value == 'repo') {
    } else {
    }
  }

  onTabChange(event) {
    if (event.tab.textLabel === "Donor's Repository") {
      this.isRepo = true;
      this.store.dispatch(new SideNavActions.GetDonorRepoList(1));
    }
    if (event.tab.textLabel === 'Donation History') {
      this.isRepo = false;
      this.store.dispatch(new SideNavActions.GetDonorDonationList(''));
    }
  }
}
