import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';
import { SubcontractorService } from 'app/shared/services/subcontractor.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SubContractorComponent } from '../sub-contractor/sub-contractor.component';
import { ListSubEmpComponent } from '../list-sub-emp/list-sub-emp.component';
import { DeleteOptionComponent } from '../../delete-option/delete-option.component';
import { ExportExcelService } from 'app/shared/services/export-excel.service';

@Component({
  selector: 'app-list-subcontractors',
  templateUrl: './list-subcontractors.component.html',
  styleUrls: ['./list-subcontractors.component.css']
})
export class ListSubcontractorsComponent implements OnInit {

  public items: any[];
  spinner = false;
  DownloadExcelData: any;
  dataForExcel: any;
  constructor(private subcontr: SubcontractorService, private dialog: MatDialog,
    public ete: ExportExcelService) {
  }

  ngOnInit(): void {
    this.GetAllSubContractors();
  }

  EditSubcrt(row) {
    let title = 'Edit SubContractor';
    let dialogRef: MatDialogRef<any> = this.dialog.open(SubContractorComponent, {
      width: '1000px',
      height: '400px',
      disableClose: false,
      data: { title: title, payload: row, editform: true }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        this.ngOnInit();
        if (!res) {

          // If user press cancel
          return;
        }
      })
  }

  GetAllSubContractors() {
    this.spinner = true;
    this.subcontr.GetAllSubContractors().subscribe(res => {
      this.items = res["data"].sort((a, b) => a.subContractorName.localeCompare(b.subContractorName));
      this.spinner = false;
    });
  }

  onActivate(event) {
    if (event.type == 'click') {
      let title = 'Employees List By SubContractor';
      let dialogRef: MatDialogRef<any> = this.dialog.open(ListSubEmpComponent, {
        width: '1000px',
        
        disableClose: false,
        data: { title: title, payload: event.row }
      })
      dialogRef.afterClosed()
        .subscribe(res => {
        });
    }
  }

  Deletesubcontractor(row)
  {
    let title = 'Delete Subcontractor';
    let dialogRef: MatDialogRef<any> = this.dialog.open(DeleteOptionComponent, {
      width: '300px',
      height: '150px',
      disableClose: false,
      data: { title: title, payload: row, type: "subcontractor" }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        this.GetAllSubContractors();
      });
    }

   
}
