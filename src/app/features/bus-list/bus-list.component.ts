import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { SeatSelectionComponent } from '../seat-selection/seat-selection.component';
import { MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-bus-list',
  imports: [CommonModule, SeatSelectionComponent, MatIconModule],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.scss'
})
export class BusListComponent implements OnInit{


  buses: any[]=[];
  selectedBusId : any;

  constructor(private route: ActivatedRoute, private busService: BusService, private router: Router){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const bid = params['bid'];
      if(bid){
        const parts= bid.split('-');
        const fromStation = parts[1];
        const toStation = parts[2];
        const selectedDate = parts[3];
        localStorage.setItem('date',selectedDate);
        this.fetchBuses(fromStation, toStation);
      }
    })
  }
  selectBus(bus:any){
    if(this.selectedBusId === bus.id){
      this.selectedBusId = null;
    }else{
      this.selectedBusId = bus.id;
      this.busService.setSelectedBus(bus);
    }
  }

  fetchBuses(fromStation:string,toStation:string){
    this.buses = this.busService.getBuses(fromStation,toStation);
  }
}
