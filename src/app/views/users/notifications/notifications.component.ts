import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'app/shared/services/request.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { RequestsbyId, RequestBySubcontractorId } from 'app/views/Models/RequestDto';
import {MatTableDataSource} from '@angular/material/table';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  RequestList:any[]=[];
  userdata: any = {};
  spinner:boolean=false;
  
  tempTest = [];
  
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // temp = [];
  // rows = [];


  RequestsbyidDto:RequestBySubcontractorId=
  {
    SubContractorId:null
  }
  constructor(private reqservice:RequestService, private jwtauth:JwtAuthService) {
    
    this.userdata = this.jwtauth.getUser();
   }

  ngOnInit(): void {
    this.spinner=true;

    if (this.userdata["role"] == "Subcontractor") {
      this.RequestsbyidDto.SubContractorId=this.userdata["typeId"];
      this.reqservice.GetAllRequestsByid(this.RequestsbyidDto).subscribe(res=>
        {
          let FilterList=[];
          let AllList=[];
          if(res["data"])
          {
            AllList=res["data"];
            AllList.forEach(x=>
              {
                if(x["Request_status"]=='Approved' || x["Request_status"]=='Rejected' || x["Request_status"]=='Closed')
                {
                  FilterList.push(x);
                }
              });

              // console.log(this.RequestList)
              this.RequestList=FilterList;
          }
         
            this.spinner=false;
        });
    }
    else if (this.userdata["role"] == "Admin" || "Department") {
     
      this.reqservice.GetAllRequests().subscribe(res=>
        {
          let FilterList=[];
          let AllList=[];
          if(res["data"])
          {
            AllList=res["data"];
            AllList.forEach(x=>
              {
                if(x["Request_status"]=='Approved' || x["Request_status"]=='Rejected' || x["Request_status"]=='Closed' || x["Request_status"]=='Cancelled' || x["Request_status"]=='Hold')
                {
                  FilterList.push(x);
                }
              });
              
              this.tempTest = FilterList;

              this.RequestList=FilterList;

              // console.log(this.RequestList)

              // this.temp = this.RequestList;

              
          }
            this.spinner=false;
        });

    } 
  }
  
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // console.log(val)
    // console.log(this.temp);

    if(val !== '') {
      // filter our data
      const temp = this.RequestList.filter(function (d) {
        console.log(d.PermitNo.toLowerCase().indexOf(val));
        console.log(!val);
        return d.PermitNo.toLowerCase().indexOf(val) !== -1;
      });
  
      // console.log(temp);
  
      // update the rows
      this.RequestList = temp;
    }
    
    else {
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
      // console.log(this.tempTest)
      return this.RequestList = this.tempTest;
    }
  }

}
