import {Component, OnInit} from '@angular/core';
import {User} from '../Security/model/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../Security/_services/auth.service';
import {TokenStorageService} from '../Security/_services/token-storage.service';
import {UserService} from '../Security/_services/user.service';

class PojoService {
}

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styleUrls: ['./app.login.component.css']
})
export class AppLoginComponent implements OnInit{
    orm: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    constructor(private router: Router, private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService) {}


    get user(): User {

        return this.userService.user;
    }

    /*  set user(value: User) {
        this.pojoService.user = value;
      }*/
    onSubmit() {
        console.log(this.user);
        this.authService.login(this.user).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;

                this.router.navigate(['/home']);
                // this.reloadPage();
                console.log("***********");
                /*
                            console.log(this.tokenStorage.getUser().roles[0]);
                            if(this.tokenStorage.getUser().roles[0]=="ROLE_SOCIETE"){
                                this.router.navigateByUrl('/');

                            }else if (this.tokenStorage.getUser().roles[0]=="ROLE_ADMIN"){
                                this.router.navigate(['dash']);
                            }
                            else if (this.tokenStorage.getUser().roles[0]=="ROLE_COMPTABLE"){
                                this.router.navigate(['dash']);
                            }

                */

            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }



    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }
    reloadPage() {
        window.location.reload();
    }


}
