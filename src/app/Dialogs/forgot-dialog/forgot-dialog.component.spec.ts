import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotDialogComponent } from './forgot-dialog.component';

describe('ForgotDialogComponent', () => {
  let component: ForgotDialogComponent;
  let fixture: ComponentFixture<ForgotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
