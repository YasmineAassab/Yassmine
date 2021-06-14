import { Component, OnInit } from '@angular/core';
import {DeclarationTvaService} from "../../../../controller/service/declaration-tva.service";
import {Facture} from "../../../../controller/model/facture.model";
import {Observable} from "rxjs";
import {DeclarationTvaVo2} from "../../../../controller/model/declaration-tva-vo2.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-facture-edit-decl',
  templateUrl: './facture-edit-decl.component.html',
  styleUrls: ['./facture-edit-decl.component.scss']
})
export class FactureEditDeclComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationTvaService) { }

  ngOnInit(): void {
  }
  public hideEditDialog() {
    this.editDialog = false;
  }
  public afficheObject(){
    return this.service.afficheObject().subscribe(
        data => {
          this.object2 = data;
          console.log('bravo trvfacuresandcalcultva');
        }
    );
  }
  public editfacture(){
    return this.service.editfacture().subscribe(
        data =>{
          if (data > 0 ){
            console.log('bravo edit facture');
            this.afficheObject();
            this.selectedFact = null;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Facture Updated',
              life: 3000
            });
          }
          else {
            console.log('erreur edit facture data est < 0');
          }
        }, error => {
          console.log('erreur edit facture');
        }
    );
    this.editDialog = false;
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
  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }
}
