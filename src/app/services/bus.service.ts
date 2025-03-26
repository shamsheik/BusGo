import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private bookedSeats : {[busId:string]:string[]} = {};

  private selectedBusSubject = new BehaviorSubject<any>(null);
  private selectedSeatsSubject = new BehaviorSubject<any>(null);

  private busData = [
    // Chennai to Bangalore
    { id:'1',source: 'Chennai', destination: 'Bangalore', name: 'Chennai Express', type: 'AC', departureTime: '10:00 AM', duration: '5h', arrivalTime:'13:00 PM', fare: 500, availableSeats: 30 },
    { id:'2',source: 'Chennai', destination: 'Bangalore', name: 'Bangalore Deluxe', type: 'Non-AC', departureTime: '12:00 PM', duration: '6h',arrivalTime:'18:00 PM', fare: 450, availableSeats: 25 },
    
    // Bangalore to Chennai

    { id:'3',source: 'Bangalore', destination: 'Chennai', name: 'Chennai Express', type: 'AC', departureTime: '10:00 PM', duration: '5h',arrivalTime:'01:00 AM', fare: 500, availableSeats: 30 },
    { id:'4',source: 'Bangalore', destination: 'Chennai', name: 'Bangalore Deluxe', type: 'Non-AC', departureTime: '12:00 AM', duration: '6h', arrivalTime:'06:00 AM',fare: 450, availableSeats: 25 },
    // Chennai to Mumbai
    { id:'5',source: 'Chennai', destination: 'Mumbai', name: 'Chennai - Mumbai Deluxe', type: 'Non-AC', departureTime: '11:00 AM', duration: '18h',arrivalTime: '5:00 AM (next day)', fare: 1200, availableSeats: 20 },
    { id:'6',source: 'Chennai', destination: 'Mumbai', name: 'Chennai Superfast', type: 'AC', departureTime: '2:00 PM', duration: '17h',arrivalTime: '7:00 AM (next day)', fare: 1500, availableSeats: 10 },

    // Bangalore to Pune
    { id:'7',source: 'Bangalore', destination: 'Pune', name: 'Bangalore Express', type: 'AC', departureTime: '7:00 AM', duration: '10h',arrivalTime: '5:00 PM', fare: 400, availableSeats: 25 },
    { id:'8',source: 'Bangalore', destination: 'Pune', name: 'Pune Express', type: 'Non-AC', departureTime: '8:00 AM', duration: '9h',arrivalTime: '5:00 PM', fare: 350, availableSeats: 30 },

    // Goa to Mumbai
    { id:'9',source: 'Goa', destination: 'Mumbai', name: 'Goa - Mumbai Fast', type: 'Non-AC', departureTime: '6:00 AM', duration: '10h',arrivalTime: '4:00 PM', fare: 700, availableSeats: 15 },
    { id:'10',source: 'Goa', destination: 'Mumbai', name: 'Goa - Mumbai Express', type: 'AC', departureTime: '8:00 AM', duration: '12h',arrivalTime: '8:00 PM', fare: 800, availableSeats: 20 },

    // Kerala to Delhi
    { id:'11',source: 'Kerala', destination: 'Delhi', name: 'Kerala - Delhi Special', type: 'AC', departureTime: '2:00 PM', duration: '30h',arrivalTime: '8:00 PM (next day)', fare: 1500, availableSeats: 10 },
    { id:'12',source: 'Kerala', destination: 'Delhi', name: 'Kerala - Delhi Superfast', type: 'Non-AC', departureTime: '5:00 PM', duration: '28h',arrivalTime: '9:00 PM (next day)', fare: 1400, availableSeats: 12 },

    // Pune to Delhi
    { id:'13',source: 'Pune', destination: 'Delhi', name: 'Pune - Delhi Luxury', type: 'AC', departureTime: '9:00 PM', duration: '20h',arrivalTime: '5:00 PM (next day)', fare: 1400, availableSeats: 18 },
    { id:'14',source: 'Pune', destination: 'Delhi', name: 'Pune Express', type: 'Non-AC', departureTime: '10:00 PM', duration: '22h',arrivalTime: '8:00 PM (next day)', fare: 1300, availableSeats: 15 },

    // Delhi to Chennai
    { id:'15',source: 'Delhi', destination: 'Chennai', name: 'Delhi - Chennai Superfast', type: 'Non-AC', departureTime: '8:00 AM', duration: '24h',arrivalTime: '8:00 AM (next day)', fare: 1000, availableSeats: 12 },
    { id:'16',source: 'Delhi', destination: 'Chennai', name: 'Delhi - Chennai Express', type: 'AC', departureTime: '6:00 AM', duration: '25h',arrivalTime: '7:00 AM (next day)', fare: 1100, availableSeats: 8 }
  ]
  constructor() { 
    const savedBookedSeats = localStorage.getItem('bookedSeats');
    if(savedBookedSeats){
      this.bookedSeats = JSON.parse(savedBookedSeats);
    }
  }

  getBuses(source:string, destination:string){
    return this.busData.filter(bus => bus.source === source && bus.destination === destination)
  }

  updateSeatSelection(busId: number, selectedSeats: string[]){
    console.log('updateseat service',busId, selectedSeats);
    const bus = this.busData.find((b) =>b.id === busId.toString());
    console.log(bus);
    if(!this.bookedSeats [busId]){
      this.bookedSeats[busId] = [];
    }
    this.bookedSeats[busId] = [...this.bookedSeats[busId], ...selectedSeats];
    localStorage.setItem('bookedSeats', JSON.stringify(this.bookedSeats));
    
  }

  getBookedSeats(busId: number){
    return this.bookedSeats[busId] || [];
  }

  isSeatBooked(busId: number, seat: string){
    return !this.getBookedSeats(busId).includes(seat);
  }

  setSelectedBus(bus:any){
    this.selectedBusSubject.next(bus);
  }

  getSelectedBus(){
    return this.selectedBusSubject.asObservable();
  }

  setSelectedSeats(seats:any){
    this.selectedSeatsSubject.next(seats);
  }

  getSelectedSeats() {
    return this.selectedSeatsSubject.asObservable();
  }

  getPriceForSelectedSeats(busId:string, selectedSeatCount:number): number{
    const bus = this.busData.find(bus=>bus.id === busId);
    if(bus){
      return bus.fare * selectedSeatCount;
    }
    return 0;
  }
  
}
