import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {DeclarationTvaService} from "../../../../controller/service/declaration-tva.service";
import {Facture} from "../../../../controller/model/facture.model";

@Component({
  selector: 'app-facture-view-decl',
  templateUrl: './facture-view-decl.component.html',
  styleUrls: ['./facture-view-decl.component.scss']
})
export class FactureViewDeclComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationTvaService) { }

  ngOnInit(): void {
  }
  public hideViewDialog() {
    this.viewDialog = false;
  }
  get viewDialog(): boolean {
    return this.service.viewDialog;
  }
  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
  get selectedFact(): Facture {
    return this.service.selectedFact;
  }
  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
  }
}
