import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { PassbookComponent } from '../../passbook/passbook.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MarketPlaceComponent } from '../../market-place/market-place.component';
import { InvestmentComponent } from '../../investments/investment.component';
import { NewsfeedComponent } from '../../newsfeed/newsfeed.component';
import {MatChipsModule} from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTabsModule,
  MatSnackBarModule
} from '@angular/material';
import { EventsComponent } from "../../events/events.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatTooltipModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatTabsModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    PassbookComponent,
    MarketPlaceComponent,
    EventsComponent,
    InvestmentComponent,
    NewsfeedComponent,
    UpgradeComponent
  ]
})
export class AdminLayoutModule {}
