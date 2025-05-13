import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RequestDto, EditRequestDto, DeleteRequestDto, UpdateRequestStatusListDto, CopyRequestDto, UpdateClose_Status, RequestsbyId, RequestBySubcontractorId, DeleteMultiRequestDto } from 'app/views/Models/RequestDto';
import { PlansDto } from 'app/views/Models/PlansDto';
import { SearchRequestDto } from 'app/views/Models/SearchRequestDto';
import { UpdateNotes, UpdateSafety, UpdateTime } from 'app/views/Models/MultiRequestUpdateDto';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  SelectedRequestData: any = {};
  bulidingFloorData: any = [];

  catDialogservice = new EventEmitter<any>();
  DeleteActivityEmitter = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  generateBulidFloorData() {
    this.bulidingFloorData = [
      {
        planType: "BA-DD Zone 1 - Zone 2",
        zoneList: [
          {
            floorName: 'BA-DD Zones',
            zoneSubList: [
              {
                value: 'ZONE 1',
                className: "zone-1-1-ba",
                isSelected: false
              },
              {
                value: 'ZONE 2',
                className: "zone-2-1-ba",
                isSelected: false
              },
            ]
          },

        ]
      },
      {
        planType: "EC-JCP1 Zone 1 - Zone 2",
        zoneList: [
          {
            floorName: 'EC-JCP1 Zones',
            zoneSubList: [
              {
                value: 'ZONE 1',
                className: "zone-1-1-ec",
                isSelected: false
              },
              {
                value: 'ZONE 2',
                className: "zone-2-1-ec",
                isSelected: false
              },
            ]
          },

        ]
      },

      {
        planType: "HovvejEast Zone 1 - Zone 2",
        zoneList: [
          {
            floorName: 'HovvejEast Zones',
            zoneSubList: [
              {
                value: 'ZONE 1',
                className: "zone-1-1-east",
                isSelected: false
              },
              {
                value: 'ZONE 2',
                className: "zone-2-1-east",
                isSelected: false
              },
            ]
          },

        ]
      },

      {
        planType: "HovvejWest Zone 1 - Zone 2",
        zoneList: [
          {
            floorName: 'HovvejWest Zones',
            zoneSubList: [
              {
                value: 'ZONE 1',
                className: "zone-1-1-west",
                isSelected: false
              },
              {
                value: 'ZONE 2',
                className: "zone-2-1-west",
                isSelected: false
              },

            ]
          },

        ]
      },

      {
        planType: "NN East Site-Plan",
        zoneList: [
          {
            floorName: 'NN East Zones',
            zoneSubList: [
              {
                value: 'M3 North Zone 3',
                className: "M3NorthZone3",
                isSelected: false
              },
              {
                value: 'M3 South Zone 2',
                className: "M3SouthZone2",
                isSelected: false
              },
              {
                value: 'M3 South Zone 3',
                className: "M3SouthZone3",
                isSelected: false
              },
              {
                value: 'Parking area',
                className: "Parkingarea",
                isSelected: false
              },
              {
                value: 'NON M3 AREA',
                className: "NONM3AREA",
                isSelected: false
              },
              {
                value: 'Gate Entrance',
                className: "gate-entrance",
                isSelected: false
              },
              {
                value: 'Gate Exit',
                className: "gate-exit",
                isSelected: false
              },

            ]
          },
        ]
      },

      {
        planType: "P-hus Site-Plan",
        zoneList: [
          {
            floorName: 'P-hus Zones',
            zoneSubList: [
              {
                value: 'Zone 1',
                className: "Zone-1-phus",
                isSelected: false
              },
              {
                value: 'Zone 2',
                className: "Zone-2-phus",
                isSelected: false
              },
              {
                value: 'Zone 3',
                className: "Zone-3-phus",
                isSelected: false
              },
              {
                value: 'Zone 4',
                className: "Zone-4-phus",
                isSelected: false
              },
            ]
          },
          
        ]
      },

      {
        planType: "Rendsborg Park",
        zoneList: [
          {
            floorName: 'M3 North 2',
            zoneSubList: [
              {
                value: 'M3 North 2',
                className: "M3-North-2",
                isSelected: false
              },
            ]
          },
          {
            floorName: 'M3 South 1',
            zoneSubList: [
              {
                value: 'M3 South 1',
                className: "M3-South-2",
                isSelected: false
              },
            ]
          },
          {
            floorName: 'M3 North 1',
            zoneSubList: [
              {
                value: 'M3 North 1',
                className: "M3-North-1",
                isSelected: false
              },

            ]
          },
          {
            floorName: 'Office & Welfare cabin area',
            zoneSubList: [
              {
                value: 'Office and Welfare cabin area',
                className: "Office-Welfare",
                isSelected: false
              },
            ]
          },
          {
            floorName: 'Rendsborg Parking 1',
            zoneSubList: [
              {
                value: 'Rendsborg Parking 1',
                className: "Parking-1",
                isSelected: false
              },
            ]
          },
          {
            floorName: 'Rendsborg Parking 2',
            zoneSubList: [
              {
                value: 'Rendsborg Parking 2',
                className: "Parking-2",
                isSelected: false
              },
            ]
          },
          {
            floorName: 'Rendsborg Parking 3',
            zoneSubList: [
              {
                value: 'Rendsborg Parking 3',
                className: "Parking-3",
                isSelected: false
              },
            ]
          },
          {
            floorName: 'Rendsborg Tent',
            zoneSubList: [
              {
                value: 'Tent 1',
                className: "Park-tent-1",
                isSelected: false
              },
              {
                value: 'Tent 2',
                className: "Park-tent-2",
                isSelected: false
              },
              {
                value: 'Tent 3',
                className: "Park-tent-3",
                isSelected: false
              },
              {
                value: 'Tent 4',
                className: "Park-tent-4",
                isSelected: false
              },
              {
                value: 'Tent 5',
                className: "Park-tent-5",
                isSelected: false
              },
              {
                value: 'Tent 6',
                className: "Park-tent-6",
                isSelected: false
              },
              {
                value: 'Tent 7',
                className: "Park-tent-7",
                isSelected: false
              },
              {
                value: 'Tent 8',
                className: "Park-tent-8",
                isSelected: false
              },

            ]
          },

        ]
      },

      {
        planType: "EH Lake East",
        zoneList: [
          {
            floorName: 'EHLakeEast Zones',
            zoneSubList: [
              {
                value: 'Zone 1',
                className: "Zone-1-EHLakeEast",
                isSelected: false
              },
              {
                value: 'Zone 2',
                className: "Zone-2-EHLakeEast",
                isSelected: false
              },
             
            ]
          },
          
        ]
      },

      {
        planType: "EH Lake West",
        zoneList: [
          {
            floorName: 'EHLakeWest Zones',
            zoneSubList: [
              {
                value: 'Zone 1',
                className: "Zone-1-EHLakeWest",
                isSelected: false
              },
              {
                value: 'Zone 2',
                className: "Zone-2-EHLakeWest",
                isSelected: false
              },
              {
                value: 'Zone 3',
                className: "Zone-3-EHLakeWest",
                isSelected: false
              },
            ]
          },
          
        ]
      },


    ]
    return this.bulidingFloorData;
  }

  public GetAllSites(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/sites.php');
  }
  public GetAllBuildingsbyid(siteid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/buildings.php?siteid=' + siteid);
  }
  public GetAllFloorsbyid(bid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/floors.php?bid=' + bid);
  }
  public GetAllRoomsbyid(flid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/rooms.php?flid=' + flid);
  }

  public GetAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'request/read.php');
  }
  public GetAllRequestsByid(res: RequestBySubcontractorId): Observable<any[]> {
    return this.http.post<any[]>(environment.API_URL + 'request/readrequestid.php', res);
  }

  public GetRequestsImagesByid(id): Observable<any[]> {
    return this.http.get<any>(environment.API_URL + 'request/readImageslist.php?requestId=' + id);
  }

  public GetRequestsLogs(id: RequestsbyId): Observable<any[]> {
    return this.http.post<any>(environment.API_URL + 'request/readLogs.php', id);
  }

  public CreateNewRequest(req): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/create.php', req);
  }
  public UpdateRequest(req: EditRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/update.php', req);
  }
  public UpdateListStatusRequest(req: UpdateRequestStatusListDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/update_status.php', req);
  }
  public DeleteRequest(req: DeleteRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/delete.php', req);
  }
  public DeleteMultiRequest(req: DeleteMultiRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/multipledelete.php', req);
  }
  public GetPlans(req: PlansDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/planslist.php', req);
  }
  public CopyRequest(req: CopyRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/createbycount.php', req);
  }

  public SearchRequest(req: SearchRequestDto): Observable<any> {
    // req: readrequestinfo
    return this.http.post<any>(environment.API_URL + 'request/searchlist.php', req);
  }

  public CloseRequest(formData): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/upload.php', formData);
  }


  public UpdateListReqstNote(req: UpdateNotes): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/updateNotes.php', req);
  }
  public UpdateListReqstSafety(req: UpdateSafety): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/updateSafety.php', req);
  }
  public UpdateListReqstTime(req: UpdateTime): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/updateStartTime.php', req);
  }

  // pagination
  public listpagination(data): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/readrequestinfo.php', data);
  }

  public addCategory(data): Observable<any> {
    return this.http.post<any>(environment.API_URL + "category/create.php", data);
  }

  public readCategory(): Observable<any> {
    return this.http.get(environment.API_URL + "category/read.php");
  }

  public deleteActivity(data): Observable<any> {
    return this.http.post(environment.API_URL + "category/delete.php", data);
  }



  // public SetselectedRequest(row)
  // {
  //   this.SelectedRequestData=row;
  // }
  // public GetSelectedRequestData():Observable<any[]> {
  //   return this.SelectedRequestData;
  // }
}
