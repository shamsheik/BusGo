import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent implements OnInit{


  bookings : any[] =[];
  bookingData: any;
  showPdfViewer:boolean = false;
  pdfUrl: string | undefined;

  constructor(private pdfService: PdfService) {
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  private loadBookings(){
    this.bookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
  }

  cancelBooking(bookingId:string):void{
    const updatedBookings = this.bookings.map(
      booking => booking.id === bookingId ? {...booking, status: 'cancelled'} : booking
    );
    localStorage.setItem('allBookings', JSON.stringify(updatedBookings));
    this.loadBookings();
  }

  viewDetails(bookingId:string):void{
    const bookingData = localStorage.getItem('paymentBookingData') ?? '';
    this.bookingData = JSON.parse(bookingData);
    this.pdfUrl = this.pdfService.getPdfBlob(this.bookingData);
    window.open(this.pdfUrl,'_blank');
  }

  downloadTicket(bookingId:string):void{
    const bookingData = localStorage.getItem('paymentBookingData') ?? '';
    this.bookingData = JSON.parse(bookingData);
    this.pdfService.generatePdf(this.bookingData);
  }

}
