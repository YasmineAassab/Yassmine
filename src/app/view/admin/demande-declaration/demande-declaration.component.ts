import { Component, OnInit } from '@angular/core';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {CategorieService} from '../../../controller/model/categorie-service.model';
import {Societe} from '../../../controller/model/societe.model';
import {DemandeService} from '../../../controller/service/demande.service';
import {Demande} from "../../../controller/model/demande.model";
import {TokenStorageService} from '../../../Security/_services/token-storage.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-demande-declaration',
  templateUrl: './demande-declaration.component.html',
  styleUrls: ['./demande-declaration.component.scss', './demande-declaration.component.css']
})

export class DemandeDeclarationComponent implements OnInit {
  cities: City[];

  selectedCity: City;







  constructor(private service: DeclarationIrService, private demandeService: DemandeService,private tokenStorageService:TokenStorageService) {

    this.cities = [
      {name: 'Declaration IR', code: 'NY'},
      {name: 'Declaration IS', code: 'RM'},
      {name: 'Declaration TVA', code: 'LDN'},

    ];
  }
  set societe(value: Societe) {
    this.demandeService.societe = value;
  }

  set demande(value: Demande) {
    this.demandeService.demande = value;
  }
  save(){
    console.log("*****this is tockenv****");
    console.log(this.tokenStorageService.getUser().societe);
    console.log(this.tokenStorageService.getUser());

    this.demandeService.demande.operation=this.selectedCity.name;
    console.log(this.demandeService.demande.operation);


    this.demandeService.save().subscribe(
        data=>{
          if (data > 0){
            //this.demandeService.demande.societe=new Societe();
            console.log(this.demandeService.demande.societe);
            this.demande=new Demande();

            console.log(this.demande);
            console.log("mchaat demande");
          }
         else console.log(data);

        },error => {
          console.log(error);
        }
    );
  }
  get demande(): Demande {

    return this.demandeService.demande;
  }

  get categorieServices(): Array<CategorieService> {

    return this.service.categorieServices;
  }
  get societe(): Societe {

    return this.demandeService.societe;
  }


  ngOnInit(): void {
    this.service.findCard();
    this.demandeService.demande.societe=new Societe();
   // this.demandeService.jibemp();


  }

}
