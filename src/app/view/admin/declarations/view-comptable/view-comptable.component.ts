import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {CommandeService} from '../../../../controller/service/commande.service';
import {Commande} from '../../../../controller/model/commande.model';
import {DemandeService} from '../../../../controller/service/demande.service';
import {User} from '../../../../Security/model/user.model';
import {Demande} from "../../../../controller/model/demande.model";

@Component({
  selector: 'app-view-comptable',
  templateUrl: './view-comptable.component.html',
  styleUrls: ['./view-comptable.component.scss']
})
export class ViewComptableComponent implements OnInit {
  //cols:any;

  constructor(private messageService: MessageService, private service: DemandeService) {


  }

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
  public edit() {

    this.submitted = true;
    if (this.selected.ref.trim()) {
      if (this.selected.id) {
        this.items[this.service.findIndexById(this.selected.id)] = this.selected;
        this.service.edit().subscribe(data => {
          this.selected = data;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Commande Updated',
            life: 3000
          });
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
