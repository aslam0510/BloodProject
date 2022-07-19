import { SendMessageComponent } from './../../../Dialogs/send-message/send-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilterComponent } from '../../filter/filter.component';

const ELEMENT_DATA = [
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
  {
    donorName: 'Ajith Sharma',
    bloodType: 'A+',
    Gender: 'Male',
    donorAge: 25,
    donorWeight: 88,
    disease: 'No',
    lastDonated: '23-02-2022',
    contact: 9999999999,
    location: 'Bangalore',
  },
];
@Component({
  selector: 'app-donarDatabase',
  templateUrl: './donarDatabase.component.html',
  styleUrls: ['./donarDatabase.component.css'],
})
export class DonarDatabaseComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'donorName',
    'donorId',
    'UHID',
    'bloodGroup',
    'age',
    'gender',
    'lastDonation',
    'location',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel(true, []);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
  }

  onSendMessage() {
    this.dialog.open(SendMessageComponent, {
      width: '850px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }

  onFilter(event) {
    const dialogConfig = new MatDialogConfig();
    let targetAttr = event.target.getBoundingClientRect();

    dialogConfig.height = 'auto';
    dialogConfig.width = '350px';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.position = {
      top: targetAttr.y + targetAttr.height - 7 + 'px',
      left: targetAttr.x + targetAttr.width - 5 + 'px',
    };
    this.dialog.open(FilterComponent, dialogConfig);
  }
}
