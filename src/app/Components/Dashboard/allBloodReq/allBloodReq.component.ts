import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FilterComponent } from './../../filter/filter.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as SideNavAction from '../../../store/Actions/sideNavAction';
import { AppState } from 'src/app/app.state';

const ELEMENT_DATA = [
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
  {
    patientName: 'Ajith Sharma',
    bloodType: 'A+',
    componentType: 'Plasma',
    patientAge: 35,
    Gender: 'Male',
    Location: 'Bangalore',
    dateOfRequest: '23-02-2022',
    dateOfRequirement: '23-02-2022',
    remarkByDoctor: 'N/A',
    uploadedDocuments: 'File.pdf',
    issueBlood: 'Issued',
  },
];
@Component({
  selector: 'app-allBloodReq',
  templateUrl: './allBloodReq.component.html',
  styleUrls: ['./allBloodReq.component.css'],
})
export class AllBloodReqComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = [
    'Patient Name',
    'Blood type',
    'Component type',
    'Patient age',
    'Gender',
    'Location',
    'Date of request',
    'Date of requirement',
    'Remark by doctor',
    'Uploaded documents',
    'Issue blood',
  ];

  bloodReqList$: Observable<any>;
  bloodReqList: any;
  bloodReqListSub: Subscription;
  bloodReqStatus$: Observable<any>;
  bloodReqStatus: any;
  bloodReqStatusSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.bloodReqList$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqList
    );
    this.bloodReqStatus$ = this.store.select(
      (state) => state.SidNavSlice.bloodReqStatus
    );
  }

  ngOnInit() {
    this.store.dispatch(new SideNavAction.GetBloodReqStatusList());
    this.store.dispatch(new SideNavAction.GetBloodReqList());

    this.bloodReqListSub = this.bloodReqList$.subscribe((data) => {
      if (data) {
        console.log(data);
      }
    });

    this.bloodReqStatusSub = this.bloodReqStatus$.subscribe((data) => {
      if (data) {
        console.log(data);
      }
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

  onBlgReqView() {
    this.router.navigate(['/dashboard/bloodRequests']);
  }
}
