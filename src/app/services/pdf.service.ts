import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; 

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePdf(data:any){
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Booking Confirmation', 15, 20);

    doc.setFontSize(12);
    doc.text('Bus Details', 15, 40);
    doc.text(`Transaction ID: ${data.transactionId}`, 15, 50);
    doc.text(`Bus Name: ${data.busDetails.name}`, 15, 60);
    doc.text(`From: ${data.busDetails.source}`, 15, 80);
    doc.text(`To: ${data.busDetails.destination}`, 15, 90);

    autoTable(doc, {
      head:[['No.','Passenger Name','Seat Number']],
      body: data.passengerDetails.map((passenger:any,index:number)=>
        [index+1,passenger,data.seatNumbers[index]]),
      startY: 100
    });

    doc.save('booking-confirmation.pdf');
      
  }

  getPdfBlob(data:any){
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Booking Confirmation', 15, 20);

    doc.setFontSize(12);
    doc.text('Bus Details', 15, 40);
    doc.text(`Transaction ID: ${data.transactionId}`, 15, 50);
    doc.text(`Bus Name: ${data.busDetails.name}`, 15, 60);
    doc.text(`From: ${data.busDetails.source}`, 15, 80);
    doc.text(`To: ${data.busDetails.destination}`, 15, 90);

    autoTable(doc, {
      head:[['No.','Passenger Name','Seat Number']],
      body: data.passengerDetails.map((passenger:any,index:number)=>
        [index+1,passenger,data.seatNumbers[index]]),
      startY: 100
    });

    const blob = doc.output('blob');
    return URL.createObjectURL(blob);
  }
}
