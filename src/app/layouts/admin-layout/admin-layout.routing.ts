import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { PassbookComponent } from '../../passbook/passbook.component';
import { EventsComponent } from '../../events/events.component';
import { MarketPlaceComponent } from '../../market-place/market-place.component';
import { InvestmentComponent } from '../../investments/investment.component';
import { NewsfeedComponent } from '../../newsfeed/newsfeed.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: InvestmentComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'passbook',     component: PassbookComponent },
    { path: 'market-place',     component: MarketPlaceComponent },
  { path: 'events', component: EventsComponent },
    { path: 'investments',           component: InvestmentComponent },
    { path: 'community',  component: NewsfeedComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
