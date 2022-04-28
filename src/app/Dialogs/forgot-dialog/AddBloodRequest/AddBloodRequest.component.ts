import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-AddBloodRequest',
  templateUrl: './AddBloodRequest.component.html',
  styleUrls: ['./AddBloodRequest.component.css'],
})
export class AddBloodRequestComponent implements OnInit {
  organizationFiles: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<AddBloodRequestComponent>
  ) {}

  ngOnInit() {}

  onOrgFileUpload($event) {}
}
