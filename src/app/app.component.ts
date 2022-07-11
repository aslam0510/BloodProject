import { HttpStatus } from './services/app-interceptor.service';
import { Component } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoader: any;

  constructor(private httpStatus: HttpStatus) {
    this.setLoaderStatus();
    this.showLoader = '';
  }

  public setLoaderStatus() {
    this.httpStatus.getHttpStatus().subscribe((data) => {
      Promise.resolve(null).then(() => {
        this.showLoader = data ? 'showLoader' : '';
      });
    });
  }
}
