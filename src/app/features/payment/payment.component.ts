import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule, MatExpansionModule,MatCardModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  paymentStatus: string = '';
  busDetails: any;
  passengerDetails: any;
  seatNumbers : any;
  totalFare : number = 0;

  constructor(private router: Router,private busService: BusService) {
  }
  ngOnInit():void {
    const busData = localStorage.getItem('bus') ?? '';
    this.busDetails = JSON.parse(busData);
    const state = history.state;
    console.log(state);
    if(state){
      this.passengerDetails = state.travelerNames;
      console.log(this.passengerDetails);
    }
    const seats = localStorage.getItem('seatNumbers') ?? '';
    this.seatNumbers = seats.split(',').map(Number);
    this.totalFare = this.busService.getPriceForSelectedSeats(this.busDetails.id, this.seatNumbers.length);
  }
  processPayment(form:any){
    if (form.valid) {
      setTimeout(() => {
        const transactId = 'TXN' + Math.random().toString(36).substring(2, 9);
        
        const bookingData = {
          busDetails: this.busDetails,
          passengerDetails: this.passengerDetails,
          seatNumbers: this.seatNumbers,
          transactionId: transactId,
          totalFare: this.totalFare,
          busId : this.busDetails.id,
          bookingDate: new Date().toDateString()
        };
        const existingBookings = JSON.parse(localStorage.getItem('currentBooking') || '[]');
        existingBookings.push(bookingData);


        localStorage.setItem('allBookings', JSON.stringify([...existingBookings, bookingData]));
        localStorage.setItem('currentBooking', JSON.stringify(existingBookings));
        localStorage.setItem('paymentBookingData', JSON.stringify(bookingData));
        
        console.log(bookingData);
        this.router.navigate(['booking-confirmation']);
        this.paymentStatus = 'success';
      }
      , 2000);

    }
  }

  formatCardNumber(event:any){
    let value = event.target.value.replace(/\s+/g, '');
    if(value.length > 0){
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    this.cardNumber = value;
    event.target.value = value;
  }

}

