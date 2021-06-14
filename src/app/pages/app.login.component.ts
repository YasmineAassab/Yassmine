import {Component, OnInit} from '@angular/core';
import {User} from '../Security/model/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../Security/_services/auth.service';
import {TokenStorageService} from '../Security/_services/token-storage.service';
import {UserService} from '../Security/_services/user.service';
import {Comptable} from '../controller/model/comptable.model';

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
  comptableTraiteur:Comptable;
  comptableValidateur:Comptable;

  constructor(private router: Router, private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService) {}

  get user(): User {

    return this.userService.user;
  }

  /*  set user(value: User) {
      this.pojoService.user = value;
    }*/
    findUserByUsername(){

    }
  onSubmit() {
    console.log(this.user);
    this.authService.login(this.user).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;

          //this.router.navigate(['home-page']);
          // this.reloadPage();
            console.log("***********");
            console.log(this.tokenStorage.getUser().roles[0]);

            if(this.tokenStorage.getUser().roles[0]=="ROLE_SOCIETE"){
                this.router.navigate(['demande']);

            }else if (this.tokenStorage.getUser().roles[0]=="ROLE_ADMIN"){
                this.router.navigate(['demandes']);

            }
            for (let i=0;i<this.users.length;i++){
                if (this.tokenStorage.getUser().username==this.users[i].username &&this.users[i].comptable.type=="validateur"){
                    this.comptableValidateur=this.users[i].comptable;

                }
            }



            if (this.comptableValidateur!=null && this.tokenStorage.getUser().roles[0]=="ROLE_COMPTABLE" ){
                this.router.navigate(['validation']);
            }

            for (let i=0;i<this.users.length;i++){
                if (this.tokenStorage.getUser().username==this.users[i].username &&this.users[i].comptable.type=="traiteur"){
                    this.comptableTraiteur=this.users[i].comptable;

                }
            }


            if (this.comptableTraiteur!=null && this.tokenStorage.getUser().roles[0]=="ROLE_COMPTABLE" ){
                this.router.navigate(['traitement']);
            }


        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
    );
  }


    get comptablesValidateur(): Array<User> {

        return this.userService.comptablesValidateur;
    }

    set comptablesValidateur(value: Array<User>) {
        this.userService.comptablesValidateur= value;
    }

    get users(): Array<User> {

        return this.userService.users;
    }

    set users(value: Array<User>) {
        this.userService.users = value;
    }



  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.userService.getUsersComptable().subscribe(
        data=>{
            console.log(data);
            this.users=data;

            for (let i=0;i<this.users.length;i++){
                if (this.users[i].comptable){
                if (this.users[i].comptable.type=="validateur"){
                    this.comptablesValidateur.push(this.users[i]);
                }
            }
            console.log(this.comptablesValidateur);
            }
        },error => {
            console.log(error);
        }
    );
  }
  reloadPage() {
    window.location.reload();
  }


}
