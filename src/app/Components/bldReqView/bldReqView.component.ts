import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import * as SideNavAction from '../../store/Actions/sideNavAction';
@Component({
  selector: 'app-bldReqView',
  templateUrl: './bldReqView.component.html',
  styleUrls: ['./bldReqView.component.css'],
})
export class BldReqViewComponent implements OnInit {
  bloodReqDetail$: Observable<any>;
  bloodReqDetail: any;
  bloodReqDetailSub: Subscription;
  urlId: string;
  requirementUnits = [];
  bloodReqStatus$: Observable<any>;
  bloodReqStatus: any;
  bloodReqStatusSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.bloodReqDetail$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqDetail
    );

    this.bloodReqStatus$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqStatus
    );
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.urlId = param.id;
    });
    if (this.urlId) {
      this.store.dispatch(new SideNavAction.GetBldReqById(this.urlId));
      this.store.dispatch(new SideNavAction.GetBloodReqStatusList());
    }

    this.bloodReqDetailSub = this.bloodReqDetail$.subscribe((response) => {
      if (response) {
        this.bloodReqDetail = response.data;
        this.bloodReqDetail?.requirements.forEach((x) => {
          this.requirementUnits.push({
            available: x.available,
            bldComponent: x.bldComponent,
            id: x.id,
            issuedUnits: Number(0),
            requiredUnit: x.requiredUnit,
            reservedUnits: Number(0),
          });
        });
      }
    });

    this.bloodReqStatusSub = this.bloodReqStatus$.subscribe((data) => {
      if (data) {
        this.bloodReqStatus = data.data;
      }
    });
  }

  onSelectReqType(type) {}

  onResrveUnits(unit, i) {
    this.requirementUnits[i].reservedUnits = unit;
  }
  onIssueUnits(unit, i) {
    this.requirementUnits[i].issuedUnits = unit;
  }
  save() {
    const payload = {
      bldReqId: '62cf02dfbd768eeaccae5a92',
      reqSts: this.bloodReqDetail.reqSts,
      subSts: 1,
      requirements: this.requirementUnits,
    };
    this.store.dispatch(new SideNavAction.UpdateBloodRequest(payload));
  }
}
