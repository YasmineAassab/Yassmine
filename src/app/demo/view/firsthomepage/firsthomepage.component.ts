import {Component, Injectable, OnInit} from '@angular/core';
import {DashboardDemoComponent} from "../dashboarddemo.component";
import {TokenStorageService} from "../../../Security/_services/token-storage.service";


@Component({
  selector: 'app-firsthomepage',
  templateUrl: './firsthomepage.component.html',
  styleUrls: ['./firsthomepage.component.scss']
})
export class FirsthomepageComponent implements OnInit {

  isLoggedIn = false;

  constructor(public dash: DashboardDemoComponent, private tokenStorageService: TokenStorageService) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
  goToContact(){
    document.getElementById("contactus").scrollIntoView({behavior: "smooth"});
  }
  goToHome(){
    document.getElementById("imgaccueil").scrollIntoView({behavior: "smooth"});
  }
}
