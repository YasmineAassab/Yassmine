import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../../../controller/service/demande.service";
import {Router} from "@angular/router";
import {Demande} from "../../../controller/model/demande.model";
import {DeclarationISService} from "../../../controller/service/declaration-is.service";
import {DeclarationIsObject} from "../../../controller/model/declaration-is-object.model";
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {DemandeVo} from "../../../controller/model/demande-vo.model";
import {Comptable} from '../../../controller/model/comptable.model';
import {Societe} from '../../../controller/model/societe.model';
/*interface socie{
  ice:string;
}*/
interface com {
  operation:string;
}
@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss','./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  operations=new Array<com>();
  operationSelected:com;
  ices=new Array<Societe>();
  iceSelected:Societe;
  //iceSelected:string;
 // ices=new Array<string>();


  constructor(private service: DemandeService, private router: Router, private service2: DeclarationISService,
              private declarationIRService: DeclarationIrService,private demandeService:DemandeService) {

    this.operations = [
      {operation: 'Declaration IR'},
      {operation: 'Declaration IS'},
      {operation: 'Declaration TVA'},

    ];

  }



  get currentComptable(): Comptable {

    return this.service.currentComptable;
  }

  set currentComptable(value: Comptable) {
    this.service.currentComptable = value;
  }


  public searchCriteria(){
    console.log(this.iceSelected);
    this.demandeVo.societe=this.iceSelected.ice;
    this.demandeVo.operation=this.operationSelected.operation;
    this.demandeVo.comptableTraiteurCode=this.currentComptable.code;
   // this.demandeVo.comptableValidateurCode=null;
    this.service.searchCriteria().subscribe(data => this.items = data);
  }

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
    this.currentDemande=selected;

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
      this.router.navigateByUrl('home/declarations-is/create');
    }
    if (selected.operation == 'Declaration IR'){
      this.router.navigateByUrl('home/declaration-ir');
    }
    if (selected.operation == 'Declaration TVA'){
      this.router.navigateByUrl('home/declaration-tva/create');
    }

  }

  public navigateToCharts(){
    //this.router.navigateByUrl('view/declarations-is/chart');
  }


 /* public displayDemandeComptable(){
    this.service.displayDemandeComptable().subscribe(
        data=>{
         this.items=data;
        },error => {
          console.log(error);
        }
    );

  }*/



  get societes(): Array<Societe> {

    return this.service.societes;
  }

  set societes(value: Array<Societe>) {
    this.service.societes = value;
  }

  ngOnInit(): void {
    this.service.connectedComptable();
    //this.service.findAll().subscribe(data => this.items = data);
    this.service.getComptableDemande();
  this.service.findAllSociete().subscribe(
      data=>{
        this.societes=data;

      //  this.ices=new Array<string>();

         /* for (let i=0;i<this.societes.length;i++){
            this.ices[i].ice=data[i].ice;
          }*/
          console.log("waaaaaaaaaaaaaaaaaaaaa*************************************");
        console.log(data);
        console.log(this.societes);
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

  get demandeVo(): DemandeVo {
    return this.service.demandeVo;
  }

  set demandeVo(value: DemandeVo) {
    this.service.demandeVo = value;
  }

}
