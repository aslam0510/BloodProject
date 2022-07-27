import { Store } from '@ngrx/store';
import { SendMessageComponent } from './../../../Dialogs/send-message/send-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilterComponent } from '../../filter/filter.component';
import { AppState } from 'src/app/app.state';
import * as SideNavActions from '../../../store/Actions/sideNavAction';

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
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new SideNavActions.GetDonorRepoList());
  }
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
