import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notificationDialog',
  templateUrl: './notificationDialog.component.html',
  styleUrls: ['./notificationDialog.component.css'],
})
export class NotificationDialogComponent implements OnInit {
  message: string = '';
  content: string = '';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
    this.content = data.content;
    console.log(data);
  }

  ngOnInit() {}
}
