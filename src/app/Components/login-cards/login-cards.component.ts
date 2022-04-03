import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-cards',
  templateUrl: './login-cards.component.html',
  styleUrls: ['./login-cards.component.css'],
})
export class LoginCardsComponent implements OnInit {
  @Input() card: any;
  constructor() {}

  ngOnInit() {}
}
