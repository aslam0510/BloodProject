/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BldReqViewComponent } from './bldReqView.component';

describe('BldReqViewComponent', () => {
  let component: BldReqViewComponent;
  let fixture: ComponentFixture<BldReqViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BldReqViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BldReqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
