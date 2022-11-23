import { ActivatedRoute, Router } from '@angular/router';
import { AddUserDailogComponent } from './addUserDailog/addUserDailog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import * as DashboardAction from '../../store/Actions/dashboardActions';
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
  organizationDetails$: Observable<any>;
  organizationDetails: any;
  organizationDetailsSub: Subscription;
  entities$: Observable<any>;
  entities: any;
  entitiesSub: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userListDataSource: MatTableDataSource<any>;
  userPermissiondataSource = '';
  usersList$: Observable<any>;
  usersList: any;
  userListSub: Subscription;
  actionSubcription: Subscription;
  // paging details
  length = 10;
  pageSize = 100;
  pageSizeOptions: number[] = [10, 50, 100];
  routerUrl = 0;
  userRole;
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usersList$ = this.store.select((state) => state.SidNavSlice.usersList);
    this.entities$ = this.store.select(
      (state) => state.DashboardSlice.entititiesDetails
    );
    this.actionSubcription = this.actionsSubj.subscribe((data) => {
      this.handleActionSubscription(data);
    });
    this.organizationDetails$ = this.store.select(
      (state) => state.DashboardSlice.organizationDetails
    );
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
    // this.store.dispatch(new DashboardAction.ClearEntities());
    this.userRole = localStorage.getItem('role');
    if (this.userRole === 'Organization Admin') {
      this.store.dispatch(new DashboardAction.GetOrganizationDetails());
      this.store.dispatch(new DashboardAction.GetEntityDetails());
    }
    this.route.queryParamMap.subscribe((param) => {
      this.routerUrl = +param.get('id');
    });
    this.store.dispatch(new SideNavAction.GetUsersList(''));

    this.userListSub = this.usersList$.subscribe((data) => {
      if (data) {
        this.usersList = data.data;
        this.userListDataSource = new MatTableDataSource(
          this.usersList.details
        );
        this.userListDataSource.paginator = this.paginator;
        this.userListDataSource.filterPredicate = function (data, filter) {
          return (
            data.userName
              .trim()
              .toLowerCase()
              .indexOf(filter.trim().toLowerCase()) != -1
          );
        };
      }
    });
    this.entitiesSub = this.entities$.subscribe((data) => {
      if (data) {
        this.entities = data.data.details;
      }
    });
    this.organizationDetailsSub = this.organizationDetails$.subscribe(
      (data) => {
        if (data) {
          this.organizationDetails = data.data;
        }
      }
    );
  }

  onAddUser() {
    const dialogRef = this.dialog.open(AddUserDailogComponent, {
      width: '800px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        formData: null,
        isEdit: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(new SideNavAction.GetUsersList(this.routerUrl));
    });
  }

  onDeleteUser(user) {
    if (user.role.name === 'Organization Admin') {
      return true;
    }
    const dailogRef = this.dialog.open(SharedDialogComponent, {
      width: '500px',
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
        this.store.dispatch(new SideNavAction.GetUsersList(this.routerUrl));
      }
    });
  }

  onEdit(user) {
    const dialogRef = this.dialog.open(AddUserDailogComponent, {
      width: '800px',
      height: 'auto',
      data: {
        formData: user,
        isEdit: true,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(new SideNavAction.GetUsersList(this.routerUrl));
    });
  }

  filterData(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userListDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestory() {
    this.userListSub.unsubscribe();
    this.entitiesSub.unsubscribe();

    this.store.dispatch(new DashboardAction.ClearEntities());
  }
  onEntity(event) {
    this.store.dispatch(new SideNavAction.GetUsersList(event.value));
  }
}
