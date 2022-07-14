import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FilterComponent } from './../../filter/filter.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
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
  bloodReqStatus$: Observable<any>;
  bloodReqStatus: any;
  bloodReqStatusSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.bloodReqList$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqList
    );
    this.bloodReqStatus$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqStatus
    );
  }

  ngOnInit() {
    this.store.dispatch(new SideNavAction.GetBloodReqStatusList());
    this.store.dispatch(new SideNavAction.GetBloodReqList());

    this.bloodReqListSub = this.bloodReqList$.subscribe((data) => {
      if (data) {
        this.bloodReqList = data.data;
        this.dataSource = new MatTableDataSource(this.bloodReqList.details);
        console.log(this.dataSource);
      }
    });

    this.bloodReqStatusSub = this.bloodReqStatus$.subscribe((data) => {
      if (data) {
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
    this.router.navigate(['/dashboard/editBloodRequest', row.id]);
    this.store.dispatch(new SideNavAction.GetBldReqById(row));
  }
}
