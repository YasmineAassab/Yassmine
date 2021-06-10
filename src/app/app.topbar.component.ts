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
    roleUser: string;

    constructor(private tokenStorageService: TokenStorageService, public app: AppComponent, public appMain: AppMainComponent) { }

    ngOnInit() {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_COMPTABLE');

            this.username = user.username;
            if (user.roles[0] == 'ROLE_ADMIN'){
                this.roleUser = 'ADMIN';
            }
            if (user.roles[0] == 'ROLE_COMPTABLE'){
                this.roleUser = 'COMPTABLE';
            }
            if (user.roles[0] == 'ROLE_SOCIETE'){
                this.roleUser = 'SOCIÉTÉ';
            }
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
