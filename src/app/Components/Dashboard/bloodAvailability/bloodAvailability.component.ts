import { UpdateBldStsDialogComponent } from './../../../Dialogs/updateBldStsDialog/updateBldStsDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { BldCompStDialogComponent } from 'src/app/Dialogs/bldCompStDialog/bldCompStDialog.component';

const ELEMENT_DATA = [
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
  {
    Item_Name: 'PRBC/PACKED CELL',
    Aplus: '9084',
    Aminus: '456',
    Bplus: '20',
    Bminus: '1234',
    ABplus: '90842',
    ABminus: '1234',
    Oplus: '9475',
    Ominus: ' 10000',
  },
];
@Component({
  selector: 'app-bloodAvailability',
  templateUrl: './bloodAvailability.component.html',
  styleUrls: ['./bloodAvailability.component.css'],
})
export class BloodAvailabilityComponent implements OnInit {
  showBASEditbtn: boolean = true;
  showBCSEditbtn: boolean = true;
  displayedColumns: string[] = [
    'Item_Name',
    'Aplus',
    'Aminus',
    'Bplus',
    'Bminus',
    'ABplus',
    'ABminus',
    'Oplus',
    'Ominus',
    // 'edit',
  ];
  dataSource = ELEMENT_DATA;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onEditBldStatus(value) {
    if (value === 'bldCompStatus') {
      this.showBCSEditbtn = false;
    } else {
      this.showBASEditbtn = false;
    }
  }
  onCancelBldStatus(value) {
    if (value === 'bldCompStatus') {
      this.showBCSEditbtn = true;
    } else {
      this.showBASEditbtn = true;
    }
  }

  onUpdateBloodStatus(value) {
    if (!this.showBASEditbtn) {
      this.dialog.open(UpdateBldStsDialogComponent, {
        data: value,
        width: '400px',
        height: 'auto',
      });
    } else if (!this.showBCSEditbtn) {
      this.dialog.open(BldCompStDialogComponent),
        {
          data: value,
          width: '400px',
          height: 'auto',
        };
    }
  }

  onItem() {
    console.log('hii');
  }
}
