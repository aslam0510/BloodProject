import { AppState } from './../../app.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  counter$: Observable<any>;
  counter: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.counter$ = this.store.select((state) => state.CounterSlice.counter);

    this.counter$.subscribe((data) => {
      if (data) {
        this.counter = data;
        console.log(this.counter);
      }
    });
  }
}
