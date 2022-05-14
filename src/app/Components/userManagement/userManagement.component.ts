import { AddUserDailogComponent } from './addUserDailog/addUserDailog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA = [
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
  {
    userName: 'Ajith Sharma',
    email: 'abc@gmail.com',
    createdOn: '17-02-2022',
    status: 'Active',
    role: 'Admin',
  },
];
const userPermission = [
  { featureAccess: 'Registration/Approval of organisation account' },
  { featureAccess: 'Registration/Approval of organisation account' },
  { featureAccess: 'Registration/Approval of organisation account' },
  { featureAccess: 'Registration/Approval of organisation account' },
  { featureAccess: 'Registration/Approval of organisation account' },
  { featureAccess: 'Registration/Approval of organisation account' },
  { featureAccess: 'Registration/Approval of organisation account' },
  { featureAccess: 'Registration/Approval of organisation account' },
];

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
  dataSource = ELEMENT_DATA;
  userPermissiondataSource = userPermission;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onAddUser() {
    this.dialog.open(AddUserDailogComponent, {
      width: '480px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }
}
