import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SendMessageComponent } from './../../../Dialogs/send-message/send-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilterComponent } from '../../filter/filter.component';
import { AppState } from 'src/app/app.state';
import * as SideNavActions from '../../../store/Actions/sideNavAction';
import { Observable, Subscription } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { timeStamp } from 'console';

@Component({
  selector: 'app-donarDatabase',
  templateUrl: './donarDatabase.component.html',
  styleUrls: ['./donarDatabase.component.css'],
})
export class DonarDatabaseComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
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
  donorRepos: any;
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
  }

  ngOnInit() {
    this.store.dispatch(new SideNavActions.GetDonorRepoList(1));
    this.store.dispatch(new SideNavActions.GetDonorDonationList());

    this.donorReposSub = this.donorRepos$.subscribe((data) => {
      if (data) {
        this.donorRepos = data.data.details;
        this.dataSource = new MatTableDataSource(this.donorRepos);
        // this.dataSource.filterPredicate = this.filterRequests();
        this.dataSource.filter = JSON.stringify(this.formValues);
      }
    });
    this.donorDonationListSub = this.donorDonationList$.subscribe((data) => {
      if (data) {
        this.donorDonationList = data.data.details;
        this.DonationdataSource = new MatTableDataSource(
          this.donorDonationList
        );
        // this.DonationdataSource.filterPredicate = this.filterRequests();
      }
    });
  }

  // filterRequests(): (data: any, filter: string) => boolean {
  //   const filterFunction = function (data, filter): boolean {
  //     const searchTerms = JSON.parse(filter);
  //     console.log(searchTerms);
  //     console.log(data);

  //     // const arr = searchTerms.range.split(' ');
  //     // const range = arr[arr.length - 1];
  //     console.log(
  //       data.bldgrp
  //         .toString()
  //         .trim()
  //         .toLowerCase()
  //         .indexOf(searchTerms.bloodGrouop.toLowerCase()) !== -1 && data.gender
  //         ? data.gender
  //             .toString()
  //             .trim()
  //             .toLowerCase()
  //             .indexOf(searchTerms.gender.toLowerCase()) !== -1
  //         : true
  //     );

  //     return (
  //       data.bldgrp
  //         .toString()
  //         .trim()
  //         .toLowerCase()
  //         .indexOf(searchTerms.bloodGrouop.toLowerCase()) !== -1 &&
  //       data.gender
  //         .toString()
  //         .trim()
  //         .toLowerCase()
  //         .indexOf(searchTerms.gender.toLowerCase()) !== -1
  //     );
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
      for (const key in result) {
        if (result[key] !== '') {
          this.filterData.push(result[key]);
        }
      }
      this.formValues = formValues;
      this.dataSource.filter = JSON.stringify(this.formValues);
    });
  }

  editDonoRepo(row) {
    this.router.navigate(['/dashboard/editDonorRep', row._id]);
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
      }
      this.formValues = f;
      this.dataSource.filter = JSON.stringify(this.formValues);
    }
  }
}
