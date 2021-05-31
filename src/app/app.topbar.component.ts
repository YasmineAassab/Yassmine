import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import {TokenStorageService} from './Security/_services/token-storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css']
})
export class AppTopBarComponent implements OnInit{


    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username: string;

    constructor(private tokenStorageService: TokenStorageService, public app: AppComponent, public appMain: AppMainComponent) { }

    ngOnInit() {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

            this.username = user.username;
        }
    }

    logout() {
        this.tokenStorageService.signOut();
        window.location.reload();
    }
    reloadPage() {
        window.location.reload();
    }
}
