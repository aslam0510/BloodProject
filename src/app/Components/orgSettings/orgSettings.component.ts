import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddEntityComponent } from '../addEntity/addEntity.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as DashboardAction from '../../store/Actions/dashboardActions';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orgSettings',
  templateUrl: './orgSettings.component.html',
  styleUrls: ['./orgSettings.component.css'],
})
export class OrgSettingsComponent implements OnInit {
  organizationDetails$: Observable<any>;
  organizationDetails: any;
  organizationDetailsSub: Subscription;
  entityDetails$: Observable<any>;
  entityDetails: any;
  entityDetailsSub: Subscription;
  entityDetailsForm: FormGroup;
  organizationDetailsForm: FormGroup;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.organizationDetails$ = this.store.select(
      (state) => state.DashboardSlice.organizationDetails
    );
    this.entityDetails$ = this.store.select(
      (state) => state.DashboardSlice.entititiesDetails
    );
  }

  ngOnInit() {
    this.store.dispatch(new DashboardAction.GetEntityDetails());
    this.store.dispatch(new DashboardAction.GetOrganizationDetails());

    this.organizationDetailsSub = this.organizationDetails$.subscribe(
      (data) => {
        if (data) {
          if (data.code === 200) {
            this.organizationDetails = data.data;
          }
        }
      }
    );

    this.entityDetailsSub = this.entityDetails$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.entityDetails = data.data;
        }
      }
    });
  }

  onAddEntitty() {
    this.dialog.open(AddEntityComponent, {
      width: '770px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }
}
