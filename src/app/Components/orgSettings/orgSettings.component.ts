import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddEntityComponent } from '../addEntity/addEntity.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as DashboardAction from '../../store/Actions/dashboardActions';
import { FormGroup, FormControl } from '@angular/forms';

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
  editForm: FormGroup;
  isEdit: boolean;
  orgEnityObject: any;
  isOrgInfo: boolean;
  isEntityInfo: boolean;
  entity$: Observable<any>;
  entity: any;
  entitySub: Subscription;

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
    this.entity$ = this.store.select(
      (state) => state.DashboardSlice.entityById
    );
    this.store.dispatch(new DashboardAction.GetOrganizationDetails());
    this.store.dispatch(new DashboardAction.GetEntityDetails());
  }

  ngOnInit() {
    this.editForm = new FormGroup({});
    this.entityDetailsSub = this.entityDetails$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.entityDetails = data.data;
        }
      }
    });
    this.organizationDetailsSub = this.organizationDetails$.subscribe(
      (data) => {
        if (data) {
          if (data.code === 200) {
            this.isOrgInfo = true;
            this.organizationDetails = data.data;
            this.orgEnityObject = data.data;
            const form = data.data;
            for (let control in form) {
              console.log(control, form[control]);
              if (control !== 'docs') {
                this.editForm.addControl(
                  control,
                  new FormControl(form[control])
                );
              }
            }
          }
        }
      }
    );

    this.entitySub = this.entity$.subscribe((data) => {
      if (data) {
        if (data.code === 200) {
          this.entity = data.data;
          this.orgEnityObject = data.data;
          const form = data.data;
          for (let control in form) {
            console.log(control, form[control]);
            if (control !== 'docs') {
              this.editForm.addControl(control, new FormControl(form[control]));
            }
          }
        }
      }
    });
  }

  //Adding new Entity
  onAddEntitty(form?: any) {
    const dialogRef = this.dialog.open(AddEntityComponent, {
      width: '770px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        editForm: this.organizationDetails,
        isEdit: this.isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isEdit = false;
    });
  }

  //Editing orgInfo and EntityInfo
  onEdit() {
    this.isEdit = true;
    // this.onAddEntitty(form);
  }

  onEntityInfo(entity) {
    this.isOrgInfo = false;
    this.isEntityInfo = true;
    this.store.dispatch(new DashboardAction.GetEntityById(entity.id));
  }
  onOrgInfo(orgInfo) {
    this.isEntityInfo = false;
    this.isOrgInfo = true;
    this.orgEnityObject = orgInfo;
  }
}
