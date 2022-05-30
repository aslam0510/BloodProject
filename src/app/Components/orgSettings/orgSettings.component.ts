import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddEntityComponent } from '../addEntity/addEntity.component';

@Component({
  selector: 'app-orgSettings',
  templateUrl: './orgSettings.component.html',
  styleUrls: ['./orgSettings.component.css'],
})
export class OrgSettingsComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit() {}

  onAddEntitty() {
    this.dialog.open(AddEntityComponent, {
      width: '770px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }
}
