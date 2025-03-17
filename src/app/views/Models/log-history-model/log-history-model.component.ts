import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-log-history-model',
  templateUrl: './log-history-model.component.html',
  styleUrls: ['./log-history-model.component.css']
})
export class LogHistoryModelComponent implements OnInit {
  displayedColumns: string[] = ['PermitNo','contractor_name', 'username', 'userType', 'requestType', 'createdTime'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log("log-details", data);
  }

  ngOnInit(): void {
  }

}
