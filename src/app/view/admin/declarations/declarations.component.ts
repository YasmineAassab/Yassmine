import { Component, OnInit } from '@angular/core';
import {DemandeService} from '../../../controller/service/demande.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {DeclarationIREmploye} from '../../../controller/model/declaration-iremploye.model';
import {Employe} from '../../../controller/model/employe.model';
import {DeclarationIR} from '../../../controller/model/declaration-ir.model';

import {UserService} from '../../../Security/_services/user.service';
import {Demande} from "../../../controller/model/demande.model";
import {User} from '../../../Security/model/user.model';
import {Societe} from '../../../controller/model/societe.model';
import {DemandeVo} from '../../../controller/model/demande-vo.model';
import {Comptable} from '../../../controller/model/comptable.model';


@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})
export class DeclarationsComponent implements OnInit {
  cols: any[];
  isCreated:boolean=false;
  isSaved:boolean=true;
  isNull:boolean;
  Useritems=new Array<User>();
  Useritemsfiltered=new Array<User>();


  //isSet:boolean;
  //comptables= new Array<Comptable>();
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,private service: DemandeService,private userService:UserService) {
  }

  ngOnInit(): void {
  //this.service.jibemp();
   // this.service.demande.comptableValidateur=new Comptable();
   // this.service.demande.comptableTraiteur=new Comptable();
    this.initCol();
    this.service.findAllDemande();
    this.getUsersComptable();


  }


  searchDeclaration(){
    this.service.searchDeclaration().subscribe(
        data=>{
          console.log(data);
          this.items=data;
        },error => {
          console.log(error);
        }
    );


  }


  get demandeVo(): DemandeVo {

    return this.service.demandeVo;
  }

  set demandeVo(value: DemandeVo) {
    this.service.demandeVo = value;
  }

  get UserItemsFiltered(): Array<User> {
    return this.service.UserItemsFiltered;
  }

  set UserItemsFiltered(value: Array<User>) {
    this.service.UserItemsFiltered = value;
  }
  getUsersComptable(){
    this.userService.getUsersComptable().subscribe(
        data => {
          console.log(data);
        this.Useritems=data;
        for (let i=0;i<this.Useritems.length; i++){
          if (this.Useritems[i].roles[0].name== "ROLE_COMPTABLE"){
            console.log("*****");
            this.Useritemsfiltered.push(this.Useritems[i]);
          }


        }
          this.service.UserItemsFiltered=this.Useritemsfiltered;
          console.log(this.Useritemsfiltered);
        }, error => {
          console.log(error);
        }
    );
  }


  public save() {

   /* this.declarationIR.declarationsIREmployes = this.items;*/

    return this.service.save().subscribe(
        data => {
          this.items = null;
          this.isSaved=true;
          this.isCreated=false;

          // this.declarationIR=null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Declarations saved',
            life: 3000
          });
          console.log('3la slaaamtna');
        }, error => {
          console.log(error);
        }
    );
  }






  public delete(selected: Demande) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Are you sure you want to refuse this Request ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteDemande(selected).subscribe(
            data=>{
              console.log("safi mchat");
            },error => {
              console.log(error);
            }
        );

        /*this.generateID();*/
      //  console.log("*****dkuuul");
        console.log(this.items);
        console.log(this.selected);
        this.items = this.items.filter(val => val.id !== selected.id);
     // console.log("*****khreeej");
        this.selected = new Demande();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Declaration IR Employe Deleted',
          life: 3000
        });

      }
    });
  }
  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

  get user(): User {

    return this.service.user;
  }

  set user(value: User) {
    this.service.user = value;
  }



  get comptablesTraiteur(): Array<Comptable> {

    return this.service.comptablesTraiteur;
  }

  set comptablesTraiteur(value: Array<Comptable>) {
    this.service.comptablesTraiteur = value;
  }

  get comptablesValidateur(): Array<Comptable> {

    return this.service.comptablesValidateur;
  }

  set comptablesValidateur(value: Array<Comptable>) {
    this.service.comptablesValidateur = value;
  }


  getComptables(){
    console.log("haa chhal nm user length");
    console.log(this.UserItemsFiltered.length);
    for (let i=0;i< this.UserItemsFiltered.length;i++){
      console.log(i);
      if (this.UserItemsFiltered[i].comptable.type=='traiteur'){
        this.comptablesTraiteur.push(this.UserItemsFiltered[i].comptable);
      }else if (this.UserItemsFiltered[i].comptable.type=='validateur'){
        this.comptablesValidateur.push(this.UserItemsFiltered[i].comptable);
      }

    }
    console.log("haaaa le comptable traiterur");
    console.log(this.comptablesTraiteur);


    console.log("haaaa le comptable validateur");
    console.log(this.comptablesValidateur);
  }
  get comptables(): Array<Comptable> {

    return this.service.comptables;
  }

  set comptables(value: Array<Comptable>) {
    this.service.comptables = value;
  }


  public accept(selected: Demande) {
  this.getComptables();
    this.editDialog=true;
    this.selected = selected;

          this.viewDialog=true;

              console.log(this.selected);


      }






  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected declaration ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

       /* this.service.deleteMultipleIndexById();
        this.service.calculTotal();*/
        this.selectes = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Declarations Deleted',
          life: 3000
        });

      }
    });
  }

  public openCreate() {
    this.selected = new Demande();
   // this.selected.employe=new Employe();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(commande: Demande) {
    this.selected = {...commande};
    this.editDialog = true;
  }

  public view(commande: Demande) {
    this.selected = {...commande};
    this.viewDialog = true;
  }



  private initCol() {
    this.cols = [
      {field: 'ID', header: 'Id'},
      {field: 'ref', header: 'reference'},
      {field: 'operation', header: 'Total'},
      {field: 'mois', header: 'Mois'},
      {field: 'annee', header: 'Annee'},
      {field: 'ice ', header: 'Ice de Societe'}
    ];
  }

  get selected(): Demande {
    return this.service.selected;
  }

  set selected(value: Demande) {
    this.service.selected = value;
  }

  get items(): Array<Demande> {
    return this.service.items;
  }

  set items(value: Array<Demande>) {
    this.service.items = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }



  get selectes(): Array<Demande> {
    return this.service.selectes;
  }

  set selectes(value: Array<Demande>) {
    this.service.selectes = value;
  }














}
