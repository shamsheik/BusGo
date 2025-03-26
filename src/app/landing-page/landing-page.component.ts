import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatToolbarModule, FormsModule, MatIconModule, MatAutocompleteModule, CommonModule, MatCardModule, RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{
  name: string ="John Doe";
  show:boolean = false;
  fromStationControl = new FormControl('');
  toStationControl = new FormControl('');
  selectedDate: Date | null = new Date();
  stations: string[] = [
    'Chennai',
    'Bangalore',
    'Mumbai',
    'Pune',
    'Goa',
    'Kerala',
    'Delhi'
  ];
  
  buses: any[]=[];
  filteredFromStations!: Observable<string[]>;
  filteredToStations! :Observable<string[]>;
  

  constructor(private router : Router){}

  ngOnInit(): void {
    this.filteredFromStations = this.fromStationControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterStations(value || ''))
    );

    this.filteredToStations = this.toStationControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterStations(value || ''))
    );
  }
  searchBuses(){
    if(this.toStationControl.value && this.fromStationControl.value && this.selectedDate){
      const fromStation = this.fromStationControl.value;
      const toStation = this.toStationControl.value;
      const selectedDate = this.selectedDate.toLocaleDateString('en-CA');
      const bid = `bus-${fromStation}-${toStation}-${selectedDate}`
      this.router.navigate(['/bus/bus-list'], {queryParams:{bid}});
    }
  }
  swapStations(){
    const temp = this.fromStationControl.value;
    this.fromStationControl.setValue(this.toStationControl.value);
    this.toStationControl.setValue(temp);
  }

  private filterStations(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stations.filter(station => station.toLowerCase().includes(filterValue));
  }

  

}
