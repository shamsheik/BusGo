import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';  
import { BusService } from '../../services/bus.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-traveler-details',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatSlideToggleModule, MatButtonToggleModule, MatIconModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatExpansionModule],
  templateUrl: './traveler-details.component.html',
  styleUrl: './traveler-details.component.scss',
})
export class TravelerDetailsComponent implements OnInit {
  travelCount: number = 0;
  travelers : any[] =[];
  email : string = '';
  mobile : string = '';
  pincode !: number;
  state !: string;
  totalfare !: number;
  selectedSeats !: any;
  seatNumbers: number[] = [];
  busDetails: any;

  constructor(private route: ActivatedRoute, private busService : BusService, private router : Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.travelCount = JSON.parse(param['seats']).length || 0; 
      this.selectedSeats = JSON.parse(param['seats']);
      console.log(this.selectedSeats);
      localStorage.setItem('seatNumbers', this.selectedSeats);
    });
    const busData = localStorage.getItem('bus') ?? '';
    this.busDetails = JSON.parse(busData);
    console.log(this.busDetails);
    this.totalfare = this.busService.getPriceForSelectedSeats(this.busDetails.id, this.travelCount)
    this.updateTravelers();
  }

  updateTravelers(){
    for(let i=0;i<this.travelCount;i++){
      this.travelers.push({
        name: '',
        age: '',
        gender: '',
        seatCount: this.selectedSeats[i]
      });

    }
  }
  proceedBooking(travelerForm:NgForm, contactForm : NgForm) {
    travelerForm.form.markAllAsTouched();
    contactForm.form.markAllAsTouched();
    if(travelerForm.valid && contactForm.valid){
      const travelerNames = this.travelers.map((traveler) => traveler.name);
      this.router.navigate(['payment'],{
        state: {
          travelerNames
        }
      });
    }
  }

  

  toggleGender(index: number) {
    this.travelers[index].gender = this.travelers[index].gender === 'male' ? 'female' : 'male';
  }
}