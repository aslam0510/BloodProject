import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupCardsComponent } from './blood-group-cards.component';

describe('BloodGroupCardsComponent', () => {
  let component: BloodGroupCardsComponent;
  let fixture: ComponentFixture<BloodGroupCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodGroupCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodGroupCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
