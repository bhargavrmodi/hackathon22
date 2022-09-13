import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  { path: "/user-profile", title: "Foot Lose Meter", icon: "offline_bolt", class: "" },
  // { path: "/user-profile", title: "User Profile", icon: "person", class: "" },
  { path: "/passbook", title: "Passbook", icon: "content_paste", class: "" },
  { path: "/market-place", title: "Market Place", icon: "shopping_basket", class: "" },
  { path: "/events", title: "Events", icon: "calendar_today", class: "" },
  { path: "/investments", title: "Investments", icon: "grade", class: "" },
  { path: '/community', title: 'Community',  icon:'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
