import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
}
