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
  isEdit: boolean;

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
    this.store.dispatch(new DashboardAction.GetOrganizationDetails());

    this.store.dispatch(new DashboardAction.GetEntityDetails());
  }

  ngOnInit() {
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

  //Adding new Entity
  onAddEntitty(form?: any) {
    const dialogRef = this.dialog.open(AddEntityComponent, {
      width: '770px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        form: [
          {
            id: 648854,
            apsts: '2',
            _id: '629457b52fdb507764b16830',
            categoryName: 'Blood Bank',
            bldbnkName: 'Jio Bloodbank123',
            prnthsptlName: '9098776591',
            addLine1: 'Koheda',
            city: 'Siddipet',
            state: 'Telangana',
            country: 'india',
            pinCode: '5054',
            regAuthority: 'Telanagana',
            regYear: '2019',
            catgry: 'Govt',
            licnsNmbr: '123456',
            licnsValid: '2024',
            district: 'Siddipet',
            addLine2: 'Husnabad',
            email: 'mailto:parsharam.maddela@assettl.com',
            contact: '9603405870',
            namePointCont: 'ede',
            designPointCont: 'jknjn',
            web: 'jioiomt.com',
            compFacility: 'edewd',
            apFacility: 'wffew',
            docs: [
              {
                fileName: 'Org_2022-05-30T05_35_49.342Ztest.jpg',
                filePath:
                  'src\\documents\\Org_2022-05-30T05_35_49.342Ztest.jpg',
              },
            ],
          },
        ],
        isEdit: this.isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isEdit = false;
    });
  }

  //Editing orgInfo and EntityInfo
  onEdit(form) {
    this.isEdit = true;
    this.onAddEntitty(form);
  }

  onEntity(entity) {
    console.log(entity);
    this.store.dispatch(new DashboardAction.GetEntityById(entity.id));
  }
}
