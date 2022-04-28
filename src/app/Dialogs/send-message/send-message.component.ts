import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css'],
})
export class SendMessageComponent implements OnInit {
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
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogRef: MatDialogRef<SendMessageComponent>
  ) {}

  ngOnInit(): void {}
}
