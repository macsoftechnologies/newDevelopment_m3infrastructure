import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/shared/services/user.service';
import { CopyRequestDto } from 'app/views/Models/RequestDto';
import { RequestService } from 'app/shared/services/request.service';
import { ActivityService } from 'app/shared/services/activity.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { DatePipe } from '@angular/common';
import { config } from "config";

@Component({
  selector: 'app-copy-request',
  templateUrl: './copy-request.component.html',
  styleUrls: ['./copy-request.component.css']
})
export class CopyRequestComponent implements OnInit {

  workingdateFrom: any;
  workingdateTo: any;
  Reqdate = new Date();
  minDate: Date;
  maxDate: Date;
  CopyRequest: CopyRequestDto = {
    userId:null,
    Request_Date: null,
    Company_Name: null,
    Sub_Contractor_Id: null,
    Foreman: null,
    Foreman_Phone_Number: null,
    Activity: null,
    Type_Of_Activity_Id: null,
    Working_Date: null,
    Start_Time: null,
    End_Time: null,
    Site_Id: null,
    Building_Id: null,
    Floor_Id: null,
    Room_Nos: null,
    Room_Type: null,
    Crane_Requested: null,
    Crane_Number: null,
    Tools: null,
    Machinery: null,
    Hot_work: null,
    Certified_Person: null,
    LOTO_Procedure: null,
    LOTO_Number: null,
    Power_Off_Required: null,
    Number_Of_Workers: null,
    Badge_Numbers: null,
    Notes: null,
    Request_status: null,
    PermitNo: null,
    Assign_End_Time: null,
    Assign_End_Date: null,
    Assign_Start_Date: null,
    Assign_Start_Time: null,
    count: null,
    Safety_Precautions: null,
    Special_Instructions: null,
    teamId:null,
    createdTime: null
  }
  Requestdata: any = {};
  userdata:any={};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CopyRequestComponent>, 
    private _snackBar: MatSnackBar, 
    private userservices: UserService,
  private jwtauthservice:JwtAuthService,
  private datePipe: DatePipe,
    private reqservice:RequestService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
this.userdata=this.jwtauthservice.getUser();
  }

  ngOnInit(): void {
    this.CopyRequest.userId=this.userdata["id"];
    // this.CopyRequest.Request_Date=this.data["payload"]["Request_Date"];
    this.CopyRequest.Request_Date=new Date().toISOString().split('T')[0];
    this.CopyRequest.Request_status =this.data["payload"]["Request_status"];
    this.CopyRequest.Room_Nos = this.data["payload"]["Room_Nos"];

    this.CopyRequest.Room_Type = this.data["payload"]["Room_Type"];

    // this.CopyRequest.Safety_Precautions = this.data["payload"]["Safety_Precautions"];

    this.CopyRequest.Site_Id = this.data["payload"]["Site_Id"];
    this.CopyRequest.Special_Instructions = this.data["payload"]["Special_Instructions"];
    this.CopyRequest.Start_Time = this.data["payload"]["Start_Time"];
    this.CopyRequest.Sub_Contractor_Id = this.data["payload"]["Sub_Contractor_Id"];
    this.CopyRequest.teamId = this.data["payload"]["teamId"];
    this.CopyRequest.Tools = this.data["payload"]["Tools"];
    this.CopyRequest.Type_Of_Activity_Id = this.data["payload"]["Type_Of_Activity_Id"];
    this.CopyRequest.Working_Date = this.data["payload"]["Working_Date"];
    this.CopyRequest.count = this.data["payload"]["count"];
    this.CopyRequest.Activity = this.data["payload"]["Activity"];
    // this.CopyRequest.Assign_End_Date=this.data["payload"]["Assign_End_Date"];
    this.CopyRequest.Assign_End_Time = this.data["payload"]["Request_status"];
    this.CopyRequest.Assign_Start_Time = this.data["payload"]["Assign_Start_Time"];
    this.CopyRequest.Badge_Numbers = this.data["payload"]["Badge_Numbers"];
    this.CopyRequest.Building_Id = this.data["payload"]["Building_Id"];
    this.CopyRequest.Certified_Person = this.data["payload"]["Certified_Person"];
    this.CopyRequest.Company_Name = this.data["payload"]["Company_Name"];
    this.CopyRequest.Crane_Number = this.data["payload"]["Crane_Number"];
    this.CopyRequest.Crane_Requested = this.data["payload"]["Crane_Requested"];
    this.CopyRequest.End_Time = this.data["payload"]["End_Time"];
    this.CopyRequest.Floor_Id = this.data["payload"]["Floor_Id"];
    this.CopyRequest.Foreman = this.data["payload"]["Foreman"];
    this.CopyRequest.Foreman_Phone_Number = this.data["payload"]["Foreman_Phone_Number"];
    this.CopyRequest.Hot_work = this.data["payload"]["Hot_work"];
    this.CopyRequest.LOTO_Number = this.data["payload"]["LOTO_Number"];
    this.CopyRequest.LOTO_Procedure = this.data["payload"]["LOTO_Procedure"];
    this.CopyRequest.Machinery = this.data["payload"]["Machinery"];
    // this.CopyRequest.Notes = this.data["payload"]["Notes"];
    this.CopyRequest.Number_Of_Workers = this.data["payload"]["Number_Of_Workers"];
    this.CopyRequest.PermitNo = this.data["payload"]["PermitNo"];
    this.CopyRequest.Power_Off_Required = this.data["payload"]["Power_Off_Required"];

  }

  CreatenewRequest() {
    const oneDay = 24 * 60 * 60 * 1000;
    this.Requestdata["WorkingdateFrom"] = this.workingdateFrom;
    this.Requestdata["WorkingdateTo"] = this.workingdateTo;
    // this.Requestdata["Requestdate"] = this.Requestdata;
    this.CopyRequest.Assign_Start_Date =this.datePipe.transform(this.workingdateFrom, 'yyyy-MM-dd'); 
    this.CopyRequest.Assign_End_Date = this.datePipe.transform( this.workingdateTo, 'yyyy-MM-dd');

    const diffDays = Math.round(Math.abs((this.workingdateFrom - this.workingdateTo) / oneDay))+1;

    const [currentDenmarkDate, currentDenmarkTime] = [
      ...config.Denmarktz.split(" "),
    ];

    this.CopyRequest.createdTime = [currentDenmarkDate, currentDenmarkTime].join(" ") ;
    console.log(this.CopyRequest.createdTime, 'date')
   
    this.CopyRequest.count=diffDays;
    this.reqservice.CopyRequest(this.CopyRequest).subscribe(res=>
      {
        this.openSnackBar();
        // window.location.reload();
      }); 
  }

  openSnackBar() {
    this._snackBar.open("Request Created Successfully", "Close", {
      duration: 2000,

    });
    this.dialogRef.close();
  }
}
