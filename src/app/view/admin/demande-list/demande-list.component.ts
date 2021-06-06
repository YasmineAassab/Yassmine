import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../../../controller/service/demande.service";
import {Router} from "@angular/router";
import {Demande} from "../../../controller/model/demande.model";
import {DeclarationISService} from "../../../controller/service/declaration-is.service";
import {DeclarationIsObject} from "../../../controller/model/declaration-is-object.model";
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {Societe} from '../../../controller/model/societe.model';


@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss']
})
export class DemandeListComponent implements OnInit {


  constructor(private service: DemandeService, private router: Router, private service2: DeclarationISService,
              private declarationIRService: DeclarationIrService,private demandeService:DemandeService) { }

  public navigateToSearch(){
    this.router.navigateByUrl('view/declarations-is/list');
  }
  get currentDemande(): Demande {

    return this.declarationIRService.currentDemande;
  }
  set currentDemande(value: Demande) {
    this.declarationIRService.currentDemande = value;
  }
  get demande(): Demande {

    return this.declarationIRService.currentDemande;
  }

  set demande(value: Demande) {
    this.demandeService.demande = value;
  }

  public navigateToCreate(selected: Demande){
    this.object.societe = selected.societe;
    this.object.annee = selected.annee;
    this.demandeService.getDemande(selected).subscribe(
        data=>{
          console.log("d5ul lmera 2");
          console.log(data);

          this.demande= data;
          this.currentDemande=data;
          console.log(this.demande);
          console.log(this.currentDemande);
         // this.declarationIR.societe=this.demande.societe;
          console.log("*haaa societe am3elem li tsetaat**");
         // console.log(this.declarationIR.societe);

         // console.log(this.demande.societe.employes);
        },error => {
          console.log(error);
        }

    );
    if (selected.operation == 'Declaration IS'){
      this.router.navigateByUrl('view/declarations-is/create');
    }
    if (selected.operation == 'Declaration IR'){
      this.router.navigateByUrl('declaration-ir');
    }

  }

  public navigateToCharts(){
    this.router.navigateByUrl('view/declarations-is/chart');
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(data => this.items = data);
  }

  get items(): Array<Demande> {
    return this.service.items;
  }

  set items(value: Array<Demande>) {
    this.service.items = value;
  }

  get selected(): Demande {
    return this.service.selected;
  }

  set selected(value: Demande) {
    this.service.selected = value;
  }

  get object(): DeclarationIsObject {
    return this.service2.object;
  }

  set object(value: DeclarationIsObject) {
    this.service2.object = value;
  }

}
