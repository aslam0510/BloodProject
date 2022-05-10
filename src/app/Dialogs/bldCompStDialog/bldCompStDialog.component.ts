import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationDialogComponent } from './../notificationDialog/notificationDialog.component';

@Component({
  selector: 'app-bldCompStDialog',
  templateUrl: './bldCompStDialog.component.html',
  styleUrls: ['./bldCompStDialog.component.css'],
})
export class BldCompStDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<BldCompStDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onSave() {
    this.snackBar.openFromComponent(NotificationDialogComponent, {
      data: {
        message: 'Success',
        content: "Component 'PRBC/Packed Cell' has been updated Successfully",
      },
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
