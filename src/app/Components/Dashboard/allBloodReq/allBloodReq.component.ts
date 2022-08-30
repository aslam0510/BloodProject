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
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];
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
    this.store.dispatch(new SideNavAction.GetBloodReqList());

    this.bloodReqListSub = this.bloodReqList$.subscribe((data) => {
      if (data) {
        this.bloodReqList = data.data;
        this.dataSource = new MatTableDataSource(this.bloodReqList.details);
        this.dataSource.filterPredicate = this.filterRequests();
        this.length = this.dataSource.filteredData.length;
      }
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

  filterData(filterValue: string) {
    const filter = {
      value: filterValue.trim().toLocaleLowerCase(),
      type: 'search',
    };

    this.dataSource.filter = JSON.stringify(filter);
  }

  filterRequests(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      if (searchTerms.type) {
        return (
          data.location
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchTerms.value.toLowerCase()) !== -1
        );
      }
    };
    return filterFunction;
  }
}
