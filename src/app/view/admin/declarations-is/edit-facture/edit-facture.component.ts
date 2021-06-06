import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {Commande} from "../../../../controller/model/commande.model";
import {Facture} from "../../../../controller/model/facture.model";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";

@Component({
  selector: 'app-edit-facture',
  templateUrl: './edit-facture.component.html',
  styleUrls: ['./edit-facture.component.scss']
})
export class EditFactureComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationISService) { }

  public editFact() {
    if (this.selectedFact.ref.trim()) {
      if (this.selectedFact.id) {
        this.selected.factures[this.service.findFacturesIndexById(this.selectedFact.id, this.selected.factures)] = this.selectedFact;
        this.service.editFact().subscribe(data => {
          if (data > 0){
            //this.selectedFact = data;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Facture Updated',
              life: 3000
            });
          }else console.log(data);
        });
      }
      this.editDialog = false;
      this.selectedFact = new Facture();
    }
  }

  public hideEditDialog() {
    this.editDialog = false;
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

  get selected(): DeclarationIS {
    return this.service.selected;
  }

  set selected(value: DeclarationIS) {
    this.service.selected = value;
  }


  ngOnInit(): void {
  }

}
