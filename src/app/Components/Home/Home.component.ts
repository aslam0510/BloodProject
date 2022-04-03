import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  loginCards = [
    {
      icon: '',
      content: 'User Management & Role based access control and security.',
    },
    {
      icon: '',
      content: 'Track and maintain all donor types.',
    },
    {
      icon: '',
      content:
        'Requisition for manual as well as computer registered patients.',
    },
    {
      icon: '',
      content: 'Powerful search facility.',
    },
    {
      icon: '',
      content: 'Stock transfer',
    },
    {
      icon: '',
      content: 'Edit your profile from anywhere, effortlessly.',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
