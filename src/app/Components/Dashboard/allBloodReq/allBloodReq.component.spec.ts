/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllBloodReqComponent } from './allBloodReq.component';

describe('AllBloodReqComponent', () => {
  let component: AllBloodReqComponent;
  let fixture: ComponentFixture<AllBloodReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBloodReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBloodReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
