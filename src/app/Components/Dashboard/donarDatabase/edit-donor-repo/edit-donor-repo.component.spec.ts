/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditDonorRepoComponent } from './edit-donor-repo.component';

describe('EditDonorRepoComponent', () => {
  let component: EditDonorRepoComponent;
  let fixture: ComponentFixture<EditDonorRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDonorRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDonorRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
