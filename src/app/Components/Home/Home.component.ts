import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  loginCards = [
    {
      icon: '/assets/Images/usrMange.svg',
      content: 'User Management & Role based access control and security.',
    },
    {
      icon: '/assets/Images/trackandmaintain.svg',
      content: 'Track and maintain all donor types.',
    },
    {
      icon: '/assets/Images/registeredPatients.svg',
      content:
        'Requisition for manual as well as computer registered patients.',
    },
    {
      icon: '/assets/Images/powerfullfacility.svg',
      content: 'Powerful search facility.',
    },
    {
      icon: '/assets/Images/stockrate.svg',
      content: 'Stock transfer',
    },
    {
      icon: '/assets/Images/edit.svg',
      content: 'Edit your profile from anywhere, effortlessly.',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
