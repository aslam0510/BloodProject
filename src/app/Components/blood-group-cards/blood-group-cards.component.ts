import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blood-group-cards',
  templateUrl: './blood-group-cards.component.html',
  styleUrls: ['./blood-group-cards.component.css'],
})
export class BloodGroupCardsComponent implements OnInit {
  @Input() bloodGroupCard;
  constructor() {
    console.log(this.bloodGroupCard);
  }

  ngOnInit(): void {}
}
