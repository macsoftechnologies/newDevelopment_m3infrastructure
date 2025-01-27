import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocumentProxy } from "ng2-pdf-viewer";

@Component({
  selector: 'app-request-building-model',
  templateUrl: './request-building-model.component.html',
  styleUrls: ['./request-building-model.component.css']
})
export class RequestBuildingModelComponent implements OnInit {
  floorBlock: Array<any> = [];
  selectedBlock: Array<any> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    let selectedBlockData = this.data.selectFloorBlocks.find(item => (item.planType == this.data.floor.planType) && (item.floorName == this.data.floor.name))
    console.log(selectedBlockData, "selectedBlockData")
    if (this.data.floor.name == 'BA-DD Zones' && this.data.floor.planType == 'BA-DD Zone 1 - Zone 2') {

      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "1")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'EC-JCP1 Zones' && this.data.floor.planType == 'EC-JCP1 Zone 1 - Zone 2') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }


    // Hovvej east
    else if (this.data.floor.name == 'HovvejEast Zones' && this.data.floor.planType == 'HovvejEast Zone 1 - Zone 2') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    // Hovvej west
    else if (this.data.floor.name == 'HovvejWest Zones' && this.data.floor.planType == 'HovvejWest Zone 1 - Zone 2') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }


    // nn east

    else if (this.data.floor.name == 'NN East Zones' && this.data.floor.planType == 'NN East Site-Plan') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }


    //p-hus
    else if (this.data.floor.name == 'P-hus Zones' && this.data.floor.planType == 'P-hus Site-Plan') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }


    // park

    else if (this.data.floor.name == 'M3 North 2' && this.data.floor.planType == 'Rendsborg Park') {
      this.floorBlock = [
        {
          value: 'M3 North 2',
          className: "M3-North-2",
          isSelected: false
        },

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'M3 South 1' && this.data.floor.planType == 'Rendsborg Park') {
      this.floorBlock = [
        {
          value: 'M3 South 1',
          className: "M3-South-2",
          isSelected: false
        },

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'M3 North 1' && this.data.floor.planType == 'Rendsborg Park') {
      this.floorBlock = [
        {
          value: 'M3 North 1',
          className: "M3-North-1",
          isSelected: false
        },

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }


    else if (this.data.floor.name == 'Office & Welfare cabin area' && this.data.floor.planType == 'Rendsborg Park') {
      this.floorBlock = [
        {
          value: 'Office and Welfare cabin area',
          className: "Office-Welfare",
          isSelected: false
        },

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Rendsborg Parking 1' && this.data.floor.planType == 'Rendsborg Park') {
      this.floorBlock = [
        {
          value: 'Rendsborg Parking 1',
          className: "Parking-1",
          isSelected: false
        },

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Rendsborg Parking 2' && this.data.floor.planType == 'Rendsborg Park') {
      this.floorBlock = [
        {
          value: 'Rendsborg Parking 2',
          className: "Parking-2",
          isSelected: false
        },

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Rendsborg Parking 3' && this.data.floor.planType == 'Rendsborg Park') {
      this.floorBlock = [
        {
          value: 'Rendsborg Parking 3',
          className: "Parking-3",
          isSelected: false
        },

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Rendsborg Tent' && this.data.floor.planType == 'Rendsborg Park') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    // end rendsborg park

    // start eh lake east

    else if (this.data.floor.name == 'EHLakeEast Zones' && this.data.floor.planType == 'EH Lake East') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    // ends eh lake east

        // start eh lake west

        else if (this.data.floor.name == 'EHLakeWest Zones' && this.data.floor.planType == 'EH Lake West') {
          this.floorBlock = [
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
          if (selectedBlockData) {
            if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
              console.log(selectedBlockData, "2")
              this.floorBlock = selectedBlockData.selectedBlock;
            }
          }
        }
    
        // ends eh lake west
    

    // console.log(this.data);
  }

  selectIndividualFloor(selectedBlock, event) {
    if (event) {
      this.selectedBlock.push(selectedBlock)

    } else {
      let index = this.selectedBlock.findIndex(item => item.value == selectedBlock.value)
      if (index > -1) {
        this.selectedBlock.splice(index, 1)
      }
    }
    console.log(this.selectedBlock, event, 'select')
  }

  // onSubmitSelectedBlock(){

  // }


}
