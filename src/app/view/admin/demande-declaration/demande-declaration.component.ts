import { Component, OnInit } from '@angular/core';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {CategorieService} from '../../../controller/model/categorie-service.model';
import {Societe} from '../../../controller/model/societe.model';
import {DemandeService} from '../../../controller/service/demande.service';
import {Demande} from "../../../controller/model/demande.model";
import {TokenStorageService} from '../../../Security/_services/token-storage.service';
import {UserService} from '../../../Security/_services/user.service';
import {User} from '../../../Security/model/user.model';
import {FactureService} from "../../../controller/service/facture.service";
import {Facture} from "../../../controller/model/facture.model";
import {DeclarationIS} from "../../../controller/model/declaration-is.model";
import {DeclarationISService} from "../../../controller/service/declaration-is.service";
import {ConfirmationService, MessageService} from "primeng/api";
interface com{
  operation:string;
}


@Component({
  selector: 'app-demande-declaration',
  templateUrl: './demande-declaration.component.html',
  styleUrls: ['./demande-declaration.component.scss', './demande-declaration.component.css']
})

export class DemandeDeclarationComponent implements OnInit {
  operations=new Array<com>();
  operationSelected:com;
  notSelected:boolean=true;
  declarationIS:string="Declaration IS";
  societeUsers:Array<User>;
  currentSociete:Societe;




  constructor(private userService:UserService,private service: DeclarationIrService, private demandeService: DemandeService,
              private serviceFct: FactureService, private tokenStorageService:TokenStorageService,
              private messageService: MessageService, private confirmationService: ConfirmationService) {

    this.operations = [
      {operation: 'Declaration IR'},
      {operation: 'Declaration IS'},
      {operation: 'Declaration TVA'},

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
    this.demande.operation=this.operationSelected.operation;

    console.log(this.demandeService.demande.operation);

    this.demande.societe=this.currentSociete;
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



  get logedSociete(): Societe {
    return this.demandeService.logedSociete;
  }

  set logedSociete(value: Societe) {
    this.demandeService.logedSociete = value;
  }

  ngOnInit(): void {
    //this.serviceFct.findBySocieteSourceIceAndAnnee('2', 2020).subscribe(data => this.itemsFact = data);

    this.service.findCard();
    this.demandeService.demande.societe=new Societe();
    // this.demandeService.jibemp();
    this.userService.getUsersComptable().subscribe(
        data=>{
          this.societeUsers=data;

          for (let i=0;i<this.societeUsers.length;i++){
            if (this.societeUsers[i].username==this.tokenStorageService.getUser().username){
              this.currentSociete=this.societeUsers[i].societe;
              this.logedSociete=this.currentSociete;
            }
          }
          console.log(this.currentSociete);
          console.log(this.societeUsers);
        }
    );

  }

  public openCreate() {
    this.submitted = false;
    this.createDialog = true;
  }

  public editFact(facture: Facture) {
    this.selectedFact = {...facture};
    this.editDialog = true;
  }

  public viewFact(facture: Facture) {
    this.selectedFact = {...facture};
    this.viewDialog = true;
  }

  public deleteFact(selectedFact: Facture){
    console.log('dekhlna');
    this.selectedFact = selectedFact;
    console.log('fact    ' + selectedFact.montantHorsTaxe);
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer la facture ' + selectedFact.ref + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceFct.deleteByReference().subscribe(data => {
          this.itemsFact = this.itemsFact.filter(val => val.id !== this.selectedFact.id);
          this.selectedFact = new Facture();
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Facture supprimée',
            life: 3000
          });
        });
      }
    });
  }


  get itemsFact(): Array<Facture> {
    return this.serviceFct.items;
  }

  set itemsFact(value: Array<Facture>) {
    this.serviceFct.items = value;
  }

  get selectedFact(): Facture {
    return this.serviceFct.selected;
  }

  set selectedFact(value: Facture) {
    this.serviceFct.selected = value;
  }
  get submitted(): boolean {
    return this.serviceFct.submitted;
  }

  set submitted(value: boolean) {
    this.serviceFct.submitted = value;
  }

  get createDialog(): boolean {
    return this.serviceFct.createDialog;
  }

  set createDialog(value: boolean) {
    this.serviceFct.createDialog = value;
  }

  get editDialog(): boolean {
    return this.serviceFct.editDialog;
  }

  set editDialog(value: boolean) {
    this.serviceFct.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.serviceFct.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.serviceFct.viewDialog = value;
  }

}
