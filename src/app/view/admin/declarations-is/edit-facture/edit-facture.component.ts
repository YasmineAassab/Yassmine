import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
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
        this.service.editFact().subscribe(data => {
          if (data > 0){
            this.selected.factures[this.service.findFacturesIndexById(this.selectedFact.id, this.selected.factures)] = this.selectedFact;
            if (this.selectedFact.typeOperation == "credit"){
              this.selected.factureC[this.service.findFacturesIndexById(this.selectedFact.id, this.selected.factureC)] = this.selectedFact;
            }
            if (this.selectedFact.typeOperation == "debit"){
              this.selected.factureD[this.service.findFacturesIndexById(this.selectedFact.id, this.selected.factureD)] = this.selectedFact;
            }
            this.service.afficheObject().subscribe(data => this.selected = data);
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Facture modifée',
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
