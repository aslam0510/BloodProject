import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './../../../app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as DashboardActions from '../../../store/Actions/dashboardActions';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css'],
})
export class DashboardCardsComponent implements OnInit, OnDestroy {
  entities$: Observable<any>;
  entities: any;
  entititiesub: Subscription;
  constructor(private store: Store<AppState>, private router: Router) {
    this.entities$ = this.store.select(
      (state) => state.DashboardSlice.entititiesDetails
    );

    this.store.dispatch(new DashboardActions.GetEntityDetails());
  }

  ngOnInit() {
    this.entititiesub = this.entities$.subscribe((data) => {
      if (data) {
        this.entities = data.data.details;
        console.log(this.entities);
      }
    });
  }

  onEntity(entity) {
    this.router.navigate(['/dashboard'], {
      queryParams: { display: 'show', id: entity.id },
    });
  }
  ngOnDestroy() {
    this.entititiesub.unsubscribe();
  }
}
