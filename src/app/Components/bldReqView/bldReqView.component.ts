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
          [...x, { reserved: 0 }];
        });

        console.log(this.bloodReqDetail);
      }
    });

    this.bloodReqStatusSub = this.bloodReqStatus$.subscribe((data) => {
      if (data) {
        this.bloodReqStatus = data.data;
      }
    });
  }

  onSelectReqType(type) {
    console.log(type);
  }

  onResrveUnits(unit, index) {
    // console.log(this.requirementUnits[i]);
    // this.requirementUnits[i].Object.assign({ reserved: unit });
    // console.log(this.requirementUnits);
  }
  onIssueUnits(unit, i) {
    this.requirementUnits[i]['issued'] = unit;
    console.log(this.requirementUnits);
  }
  save() {}
}
