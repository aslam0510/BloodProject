import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FilterComponent } from './../../filter/filter.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as SideNavAction from '../../../store/Actions/sideNavAction';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-allBloodReq',
  templateUrl: './allBloodReq.component.html',
  styleUrls: ['./allBloodReq.component.css'],
})
export class AllBloodReqComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'Patient Name',
    'Blood Group',
    'Requirements',
    'Location',
    'Date of request',
    'Required On',
    'Purpose',
    'Status',
  ];

  bloodReqList$: Observable<any>;
  bloodReqList: any;
  bloodReqListSub: Subscription;

  bloodGroupTypes$: Observable<any>;
  bloodGroupTypes: any;
  bloodGroupTypesSub: Subscription;
  bloodCompList$: Observable<any>;
  bloodCompList: any;
  bloodCompListSub: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // paging details
  length = 10;
  pageSize = 100;
  pageSizeOptions: number[] = [10, 50, 100];
  searchFilter = {
    bloodType: '',
    comp: '',
    location: '',
  };
  searchForm: FormGroup;
  filteredValues = {
    bloodType: '',
    comp: '',
    location: '',
  };
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.bloodReqList$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqList
    );

    this.bloodGroupTypes$ = this.store.select(
      (state) => state.SidNavSlice.bloodGroupTypes
    );

    this.bloodCompList$ = this.store.select(
      (state) => state.SidNavSlice.bloodCompList
    );
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      bldType: new FormControl(''),
      comp: new FormControl(''),
      location: new FormControl(''),
    });
    const payload = {
      priority: 1,
      reqSts: '',
    };
    this.store.dispatch(new SideNavAction.GetBloodReqList(payload));

    this.bloodReqListSub = this.bloodReqList$.subscribe((data) => {
      if (data) {
        this.bloodReqList = data.data;
        this.dataSource = new MatTableDataSource(this.bloodReqList.details);
        this.dataSource.filterPredicate = this.filterRequests();
        this.dataSource.paginator = this.paginator;
        this.length = this.dataSource.filteredData.length;
      }
    });

    this.searchForm.get('bldType').valueChanges.subscribe((type) => {
      this.filteredValues['bloodType'] = type;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.searchForm.get('comp').valueChanges.subscribe((comp) => {
      this.filteredValues['comp'] = comp;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.searchForm.get('location').valueChanges.subscribe((location) => {
      this.filteredValues['location'] = location;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.bloodGroupTypesSub = this.bloodGroupTypes$.subscribe((data) => {
      if (data) {
        this.bloodGroupTypes = data.data;
      }
    });

    this.bloodCompListSub = this.bloodCompList$.subscribe((data) => {
      if (data) {
        this.bloodCompList = data.data;
      }
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
    this.dialog.open(FilterComponent, dialogConfig);
  }

  editRequest(row: any) {
    this.router.navigate([
      '/dashboard/editBloodRequest',
      `?id=${row.id}&reqStatusId=${row.reqStatusId}`,
    ]);
  }

  // filterData(val: string) {
  //   const filter = {
  //     bldType: val === 'bldType' ? this.searchForm.value.bldType : '',
  //     comp: val === 'comp' ? this.searchForm.value.comp : '',
  //     location: val === 'location' ? this.searchForm.value.location : '',
  //   };

  //   this.dataSource.filter = JSON.stringify(filter);
  // }

  filterRequests(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return (
        data.location.toString().trim().indexOf(searchTerms.location) !== -1 &&
        data.bldgrp
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchTerms.bloodType.toLowerCase()) !== -1 &&
        data.requirements
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchTerms.comp.toLowerCase()) !== -1
      );
    };
    return filterFunction;
  }

  onTabChange(event) {
    let payload;
    if (event.tab.textLabel === 'Open Blood Request') {
      payload = {
        priority: '',
        reqSts: 1,
      };
    } else if (event.tab.textLabel === 'Hight-Priority Request') {
      payload = {
        priority: 1,
        reqSts: '',
      };
    } else if (event.tab.textLabel === 'Closed Blood Request') {
      payload = {
        priority: '',
        reqSts: 3,
      };
    }
    this.store.dispatch(new SideNavAction.GetBloodReqList(payload));
  }
}
