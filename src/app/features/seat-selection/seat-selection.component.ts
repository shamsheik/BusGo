import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusService } from '../../services/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-selection',
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.scss'
})
export class SeatSelectionComponent implements OnInit{
  
  selectedBus: any;
  availableSeats: number | undefined;
  selectedSeats: any[] = [];
  selectedSeatCount : number = 0;
  bookedSeats : string[] = [];
  confirmedSelectedSeats : any[] = [];
  confirmedBookingBusId : string = '';

  @Input() bus : any;

  constructor(private busService : BusService, private router: Router){}

  ngOnInit(): void {
    this.busService.getSelectedBus().subscribe(bus=>{
      this.selectedBus = bus;
      localStorage.setItem('bus',JSON.stringify(this.selectedBus));
      if(bus){
        this.availableSeats = bus.availableSeats;
        this.loadBookedSeats();
      }
    });
  }
  toggleSeatSelection(seat:any){
   const index = this.selectedSeats.indexOf(seat);
   if(index === -1){
    this.selectedSeats.push(seat);
   }else{
    this.selectedSeats.splice(index,1);
   }
   this.busService.updateSeatSelection(this.selectedBus.id,this.selectedSeats);
  }

  isSeatBooked(seatNumber: number): boolean {
    return this.bookedSeats.includes(seatNumber.toString());
  }
  
  confirmSeats(){
    if(this.selectedSeats.length> 0){
      const seats = this.selectedSeats;
      this.router.navigate(['/traveler-details'],{queryParams:{seats:JSON.stringify(seats)}})
    }
  }

  get seatNumbers(): number[] {
    return Array.from({ length: this.availableSeats || 0 }, (_, index) => index + 1);
  }
  
  get totalFare():number{
    return this.busService.getPriceForSelectedSeats(this.selectedBus.id, this.selectedSeats.length);
  }

  loadBookedSeats(){
    if(!this.selectedBus) return;
    const bookings = JSON.parse(localStorage.getItem('currentBooking') || '[]');
    const selectedBusBookings = bookings.filter((booking:any)=>booking.busId === this.selectedBus.id);
    this.bookedSeats = selectedBusBookings.flatMap((booking:any)=>booking.seatNumbers.map(String));
  }
}

