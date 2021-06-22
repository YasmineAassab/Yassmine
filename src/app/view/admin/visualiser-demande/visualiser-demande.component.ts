import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../../../controller/service/demande.service";
import {Demande} from "../../../controller/model/demande.model";
import {DemandeVo} from "../../../controller/model/demande-vo.model";
import {UserService} from '../../../Security/_services/user.service';
import {Societe} from '../../../controller/model/societe.model';
import {User} from '../../../Security/model/user.model';
import {TokenStorageService} from '../../../Security/_services/token-storage.service';
import {Comptable} from '../../../controller/model/comptable.model';

@Component({
  selector: 'app-visualiser-demande',
  templateUrl: './visualiser-demande.component.html',
  styleUrls: ['./visualiser-demande.component.scss', './visualiser-demande.component.css']
})
export class VisualiserDemandeComponent implements OnInit {
  societeUsers:Array<User>;

  constructor(private userService:UserService,private service: DemandeService,private tokenStorageService:TokenStorageService) {}

  public searchCriteria(){
    this.service.searchCriteria().subscribe(data => this.items = data);
  }

  get logedSociete(): Societe {
    return this.service.logedSociete;
  }

  set logedSociete(value: Societe) {
    this.service.logedSociete = value;
  }

  ngOnInit(): void {
   // this.service.findAll().subscribe(data => this.items = data);
    this.userService.getUsersSociete().subscribe(
        data =>{
          console.log(data);

          this.societeUsers=data;

          for (let i=0;i<this.societeUsers.length;i++){
            if (this.societeUsers[i].username==this.tokenStorageService.getUser().username){
              this.logedSociete=this.societeUsers[i].societe;

            }
          }

          console.log(this.logedSociete);
          this.service.getSocieteDemandes().subscribe(
              data=>{
                console.log(data);
                this.items=data;
                  for (let i=0;i<this.items.length;i++){
                      if (this.items[i].comptableValidateur==null || this.items[i].comptableTraiteur==null){
                          this.items[i].comptableTraiteur=new Comptable();
                          this.items[i].comptableValidateur=new Comptable();
                          this.items[i].comptableTraiteur.nom="--";
                          this.items[i].comptableValidateur.nom="--";
                      }
                  }
              },error => {
                console.log(error);
              }
          );
        },error => {
          console.log(error);
        }
    );


  }

  get items(): Array<Demande> {
    return this.service.items;
  }

  set items(value: Array<Demande>) {
    this.service.items = value;
  }

  get demandeVo(): DemandeVo {
    return this.service.demandeVo;
  }

  set demandeVo(value: DemandeVo) {
    this.service.demandeVo = value;
  }

}
