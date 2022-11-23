import { timer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {
  getCounter(tick) {
    return timer(0, tick);
  }
}
