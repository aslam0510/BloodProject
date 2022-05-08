import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-broadcastMsgDialog',
  templateUrl: './broadcastMsgDialog.component.html',
  styleUrls: ['./broadcastMsgDialog.component.css'],
})
export class BroadcastMsgDialogComponent implements OnInit {
  templateContent = [
    {
      id: 1,
      content:
        "Urgently required <blood group> blood to save a patient's life. walk to <blood bannk> to donate now. Every doantion counts.",
    },

    {
      id: 1,
      content:
        "Urgently required <blood group> blood to save a patient's life. walk to <blood bannk> to donate now. Every doantion counts.",
    },
    {
      id: 1,
      content:
        "Urgently required <blood group> blood to save a patient's life. walk to <blood bannk> to donate now. Every doantion counts.",
    },
    {
      id: 1,
      content:
        "Urgently required <blood group> blood to save a patient's life. walk to <blood bannk> to donate now. Every doantion counts.",
    },
  ];
  constructor() {}

  ngOnInit() {}
}
