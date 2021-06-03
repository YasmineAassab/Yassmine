import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {CommandeService} from '../../../../controller/service/commande.service';
import {Commande} from '../../../../controller/model/commande.model';
import {DemandeService} from '../../../../controller/service/demande.service';
import {Demande} from '../../../../controller/model/demande';
import {User} from '../../../../Security/model/user.model';
interface Comptable {
  name: string,
  code: string
}
@Component({
  selector: 'app-view-comptable',
  templateUrl: './view-comptable.component.html',
  styleUrls: ['./view-comptable.component.scss']
})
export class ViewComptableComponent implements OnInit {
  cities: Comptable[];

  selectedCity: Comptable;

  constructor(private messageService: MessageService, private service: DemandeService) {

    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];
  }

  ngOnInit(): void {
  }


  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }
  get user(): User {

    return this.service.user;
  }

  set user(value: User) {
    this.service.user = value;
  }

/*  public affect() {
    this.submitted = true;
    if (this.selected.reference.trim()) {
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
      this.selected = new Commande();
    }
  }*/


  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): Demande {
    return this.service.selected;
  }

  set selected(value: Demande) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {

    this.service.viewDialog = value;
  }

}
