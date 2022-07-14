import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/app.state';
import * as SideNavAction from '../../store/Actions/sideNavAction';
@Component({
  selector: 'app-bldReqView',
  templateUrl: './bldReqView.component.html',
  styleUrls: ['./bldReqView.component.css'],
})
export class BldReqViewComponent implements OnInit {
  urlId: string;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.urlId = param.id;
      console.log(this.urlId);
    });
  }
}
