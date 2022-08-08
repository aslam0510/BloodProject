import { AddUserDailogComponent } from './addUserDailog/addUserDailog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable, Subscription } from 'rxjs';

import * as SideNavAction from '../../store/Actions/sideNavAction';
import { MatTableDataSource } from '@angular/material/table';
import { AppDialogComponent } from './../../Dialogs/appDialog/appDialog.component';
import { SharedDialogComponent } from 'src/app/Dialogs/sharedDialog/sharedDialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  actionSubcription: Subscription;
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private snackBar: MatSnackBar
  ) {
    this.usersList$ = this.store.select((state) => state.SidNavSlice.usersList);
    this.actionSubcription = this.actionsSubj.subscribe((data) => {
      this.handleActionSubscription(data);
    });
  }
  handleActionSubscription(data: any) {
    switch (data.type) {
      case SideNavAction.EDIT_USER_SUCCESS:
        if (data.payload.code === 200) {
          this.snackBar.open('Updated Successfully', '', { duration: 2000 });
        }
        break;

      case SideNavAction.ADD_USER_SUCCESS:
        if (data.payload.code === 200) {
          this.snackBar.open('User Created Successfully', '', {
            duration: 2000,
          });
        }
        if (data.payload.code === 400) {
          this.snackBar.open(data.payload.message, '', { duration: 2000 });
        }
        break;
      case SideNavAction.DELETE_USER_SUCCESS:
        if (data.payload.code === 200) {
          this.snackBar.open('User Deleted Successfully', '', {
            duration: 2000,
          });
        }
        break;
    }
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
    const dialogRef = this.dialog.open(AddUserDailogComponent, {
      width: '480px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        formData: null,
        isEdit: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(new SideNavAction.GetUsersList());
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
        this.store.dispatch(new SideNavAction.GetUsersList());
      }
    });
  }

  onEdit(user) {
    console.log(user);

    const dialogRef = this.dialog.open(AddUserDailogComponent, {
      width: '480px',
      height: 'auto',
      data: {
        formData: user,
        isEdit: true,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(new SideNavAction.GetUsersList());
    });
  }

  filterData(event) {
    this.userListDataSource.filter = event.target.value;
  }

  ngOnDestory() {
    this.userListSub.unsubscribe();
  }
}
