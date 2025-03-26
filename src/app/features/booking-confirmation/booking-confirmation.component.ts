import { Component } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-confirmation',
  imports: [MatIconModule,MatCardModule, CommonModule],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.scss'
})
export class BookingConfirmationComponent {

  bookingData: any;
  showPdfViewer:boolean = false;
  pdfUrl: string | undefined;

  constructor(private pdfService: PdfService, private router: Router) {
    const bookingData = localStorage.getItem('paymentBookingData') ?? '';
    this.bookingData = JSON.parse(bookingData);
    this.bookingData.busDetails = this.bookingData.busDetails;
    console.log(this.bookingData);
  }

  downloadTicket() {
    this.pdfService.generatePdf(this.bookingData);
  }

  viewTicket() {  
    this.pdfUrl = this.pdfService.getPdfBlob(this.bookingData);
    window.open(this.pdfUrl,'_blank');
  }

  goHome() {  
    localStorage.removeItem('booking');
    localStorage.removeItem('seatNumbers');
    localStorage.removeItem('bus');
    this.router.navigate(['bus']);
  }
}
