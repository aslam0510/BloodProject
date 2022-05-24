import { Component, OnInit } from '@angular/core';
const ELEMENT_DATA = [
  {
    messageTitle: 'Blood donation campagain',
    date: '17-03-2022',
    receipentCount: '500',
    message:
      'Urgently required A+ blood to save patients life. Walk to donate <blood bank> to donate now. Every donation counts',
  },
  {
    messageTitle: 'Blood donation campagain',
    date: '17-03-2022',
    receipentCount: '500',
    message:
      'Urgently required A+ blood to save patients life. Walk to donate <blood bank> to donate now. Every donation counts',
  },
  {
    messageTitle: 'Blood donation campagain',
    date: '17-03-2022',
    receipentCount: '500',
    message:
      'Urgently required A+ blood to save patients life. Walk to donate <blood bank> to donate now. Every donation counts',
  },
  {
    messageTitle: 'Blood donation campagain',
    date: '17-03-2022',
    receipentCount: '500',
    message:
      'Urgently required A+ blood to save patients life. Walk to donate <blood bank> to donate now. Every donation counts',
  },
  {
    messageTitle: 'Blood donation campagain',
    date: '17-03-2022',
    receipentCount: '500',
    message:
      'Urgently required A+ blood to save patients life. Walk to donate <blood bank> to donate now. Every donation counts',
  },
  {
    messageTitle: 'Blood donation campagain',
    date: '17-03-2022',
    receipentCount: '500',
    message:
      'Urgently required A+ blood to save patients life. Walk to donate <blood bank> to donate now. Every donation counts',
  },
  {
    messageTitle: 'Blood donation campagain',
    date: '17-03-2022',
    receipentCount: '500',
    message:
      'Urgently required A+ blood to save patients life. Walk to donate <blood bank> to donate now. Every donation counts',
  },
];
@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.css'],
})
export class AllMessagesComponent implements OnInit {
  displayedColumns: string[] = [
    'messageTitle',
    'date',
    'recipentCount',
    'message',
  ];
  dataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit() {}
}
