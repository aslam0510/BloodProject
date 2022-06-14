import { AddUserDailogComponent } from './addUserDailog/addUserDailog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable, Subscription } from 'rxjs';

import * as SideNavAction from '../../store/Actions/sideNavAction';
import { MatTableDataSource } from '@angular/material/table';
import { AppDialogComponent } from './../../Dialogs/appDialog/appDialog.component';
import { SharedDialogComponent } from 'src/app/Dialogs/sharedDialog/sharedDialog.component';

@Component({
  selector: 'app-userManagement',
  templateUrl: './userManagement.component.html',
  styleUrls: ['./userManagement.component.css'],
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'userName',
    'email',
    'createdOn',
    'status',
    'role',
    'action',
  ];
  userPermissionDisplayedColumns: string[] = [
    'featureAccess',
    'organizationAdmin',
    'organizationAdminSupport',
    'accountant',
    'receptionist',
    'entityAdmin',
    'doctor',
    'labTechnician',
  ];
  userListDataSource: MatTableDataSource<any>;
  userPermissiondataSource = '';
  usersList$: Observable<any>;
  usersList: any;
  userListSub: Subscription;
  constructor(private dialog: MatDialog, private store: Store<AppState>) {
    this.usersList$ = this.store.select((state) => state.SidNavSlice.usersList);
  }

  ngOnInit() {
    this.store.dispatch(new SideNavAction.GetUsersList());

    this.userListSub = this.usersList$.subscribe((data) => {
      if (data) {
        this.usersList = data.data;
        this.userListDataSource = new MatTableDataSource(
          this.usersList.details
        );
      }
    });
  }

  onAddUser() {
    this.dialog.open(AddUserDailogComponent, {
      width: '480px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }

  onDeleteUser(user) {
    const dailogRef = this.dialog.open(SharedDialogComponent, {
      width: '300px',
      height: 'auto',
      data: {
        content: 'Are you want to delete this User?',
        cancelButton: 'Cancel',
        okButton: 'Ok',
      },
    });
    dailogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(new SideNavAction.DeleteUser(user.userId));
      }
    });
  }

  onEdit(user) {
    this.dialog.open(AddUserDailogComponent, {
      width: '480px',
      height: 'auto',
      data: {
        formData: user,
        isEdit: true,
      },
      panelClass: 'custom-dialog-container',
    });
  }
  filterData(event) {
    this.userListDataSource.filter = event.target.value;
  }
}
