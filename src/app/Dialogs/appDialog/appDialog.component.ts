import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appDialog',
  templateUrl: './appDialog.component.html',
  styleUrls: ['./appDialog.component.css'],
})
export class AppDialogComponent implements OnInit {
  title = '';
  content = '';
  ok: boolean = false;
  cancel: boolean = false;
  button = '';
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AppDialogComponent>
  ) {
    this.title = data.title;
    this.content = data.content;
    this.ok = data.ok;
    this.cancel = data.cancel;
    this.button = data.button;
  }

  ngOnInit() {}
  onDone() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }
}
