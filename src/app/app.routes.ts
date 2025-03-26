import { Routes } from '@angular/router';
import { BusListComponent } from './features/bus-list/bus-list.component';
import { SeatSelectionComponent } from './features/seat-selection/seat-selection.component';
import { TravelerDetailsComponent } from './features/traveler-details/traveler-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaymentComponent } from './features/payment/payment.component';
import { BookingConfirmationComponent } from './features/booking-confirmation/booking-confirmation.component';
import { MyBookingsComponent } from './features/my-bookings/my-bookings.component';

export const routes: Routes = [
    {path:'',redirectTo:'/bus',pathMatch:'full'},
    {path:'bus',component:LandingPageComponent, children:[{
        path:'bus-list', component:BusListComponent
    }]
    },
    {path:'seat-selection',component:SeatSelectionComponent},
    {path:'traveler-details',component:TravelerDetailsComponent},
    {path:'payment',component:PaymentComponent},
    {path:'booking-confirmation',component:BookingConfirmationComponent},
    {path:'my-bookings', component:MyBookingsComponent}
];
