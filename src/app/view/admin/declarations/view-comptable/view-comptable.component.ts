import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DemandeService} from '../../../../controller/service/demande.service';
import {User} from '../../../../Security/model/user.model';
import {Demande} from "../../../../controller/model/demande.model";
import {Comptable} from '../../../../controller/model/comptable.model';
interface ComptableInter {
  name: string

}



@Component({
  selector: 'app-view-comptable',
  templateUrl: './view-comptable.component.html',
  styleUrls: ['./view-comptable.component.scss']
})
export class ViewComptableComponent implements OnInit {
  //cols:any;
 // comptable:ComptableInter[];


  //selectedComptable: Comptable;

  constructor(private messageService: MessageService, private service: DemandeService) {
 // this.comptables=this.UserItemsFiltered[].comptable;
  //this.comptables=this.comptables[].nom;
    //this.comptable=this.comptables.;

  }

  get comptables(): Array<Comptable> {

    return this.service.comptables;
  }

  set comptables(value: Array<Comptable>) {
    this.service.comptables = value;
  }


/*  getComptables(){
    console.log("haa chhal nm user length");
    console.log(this.UserItemsFiltered.length);
    for (let i=0;i< this.UserItemsFiltered.length;i++){
      this.comptables.push(this.UserItemsFiltered[i].comptable);
    }
    console.log("haaaa le comptable");
    console.log(this.comptables);
  }*/

  ngOnInit(): void {


  }
  affectDemande(selectedComptable: User){
    console.log(this.selected);
    this.selected.user = selectedComptable;
    //this.selected.mois=1;
    this.service.updateDemande();
   // this.viewDialog=false;
    this.selected=new Demande();
  }
  get UserItemsFiltered(): Array<User> {
    return this.service.UserItemsFiltered;
  }

  set UserItemsFiltered(value: Array<User>) {
    this.service.UserItemsFiltered = value;
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


  public edit() {
    console.log(this.selected);
    this.submitted = true;
    if (this.selected.ref.trim()) {
      if (this.selected.id) {
        this.items[this.service.findIndexById(this.selected.id)] = this.selected;
        this.service.edit().subscribe(data => {

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Commande Updated',
            life: 3000
          });
          this.selected = new Demande();
        });
      }
      this.editDialog = false;
      this.selected = new Demande();
    }
  }

  public hideEditDialog() {
    this.editDialog = false;
  }
  get selected(): Demande {
    return this.service.selected;
  }

  set selected(value: Demande) {
    this.service.selected = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get items(): Array<Demande> {
    return this.service.items;
  }

  set items(value: Array<Demande>) {
    this.service.items = value;
  }


}
