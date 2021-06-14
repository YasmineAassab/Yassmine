import { Component, OnInit } from '@angular/core';
import {DeclarationTvaService} from "../../../../controller/service/declaration-tva.service";
import {MessageService} from "primeng/api";
import {Facture} from "../../../../controller/model/facture.model";
import {DeclarationTvaVo2} from "../../../../controller/model/declaration-tva-vo2.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-facture-create-decl',
  templateUrl: './facture-create-decl.component.html',
  styleUrls: ['./facture-create-decl.component.scss']
})
export class FactureCreateDeclComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationTvaService) { }

  ngOnInit(): void {
  }
  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }
  public afficheObject(){
    return this.service.afficheObject().subscribe(
        data => {
          this.object2 = data;
          console.log('bravo trvfacuresandcalcultva');
        }
    );
  }
  public savefacture(){
    this.submitted = true;
    return this.service.savefacture().subscribe(
        data =>{
          if (data > 0 ){
            console.log('bravo save facture');
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Facture Created', life: 4000});
            this.afficheObject();
            this.selectedFact = null;
          }
          else {
            console.log('erreur data est < 0');
            this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Facture No created ! ( data = ' + data + ' )', life: 4000});
          }
        }, error => {
          console.log('erreur save facture');
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Facture No Created', life: 4000});
        }
    );
    this.createDialog = false;
  }
  get object2(): DeclarationTvaVo2 {
    return this.service.object2;
  }
  set object2(value: DeclarationTvaVo2) {
    this.service.object2 = value;
  }
  get selectedFact(): Facture {
    return this.service.selectedFact;
  }
  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
  }
  get submitted(): boolean {
    return this.service.submitted;
  }
  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }
  get createDialog(): boolean {
    return this.service.createDialog;
  }
  set submitted(value: boolean) {
    this.service.submitted = value;
  }
}
