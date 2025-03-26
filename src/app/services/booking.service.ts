import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Booking {
  id: string;
  transactionId: string;
  busDetails: any;
  passengerDetails: any;
  seatNumbers: any;
  totalFare: number;
  busId: string;
  status: 'confirmed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private STORAGE_KEY = 'busBookings';
  private bookingSubject = new BehaviorSubject<Booking[]>([]);
  booking$ = this.bookingSubject.asObservable();

  constructor() { }

  private loadInitialData(): void{
    const storedBookings = localStorage.getItem(this.STORAGE_KEY);
    if(storedBookings){
      this.bookingSubject.next(JSON.parse(storedBookings));
    }
  }

  private saveStoredData(bookings: any[]):void{
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
    this.bookingSubject.next(bookings);
  }

  addBooking(booking: Omit<Booking,'id'|'status'>){
    const newBooking : Booking ={
      ...booking,
      id: 'booking' + Math.random().toString(36).substring(2, 9),
      status: 'confirmed'
    };
    const currentBookings = this.bookingSubject.value;
    this.saveStoredData([...currentBookings,newBooking]);
    return newBooking;
  }

  cancelBooking(bookingId: string): void{
    const updatedBookings = this.bookingSubject.value.map(booking => {
      booking.id === bookingId ? {...booking, status: 'cancelled'} : booking;
    })
    this.saveStoredData(updatedBookings)
  }

  getUserBookings(): Booking[]{
    return this.bookingSubject.value;
  }
}
