import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {DeclarationTvaService} from "../../../../controller/service/declaration-tva.service";
import {DeclarationTva} from "../../../../controller/model/declaration-tva.model";

@Component({
  selector: 'app-declaration-tva-view',
  templateUrl: './declaration-tva-view.component.html',
  styleUrls: ['./declaration-tva-view.component.scss']
})
export class DeclarationTvaViewComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationTvaService) { }

  ngOnInit(): void {
  }
  public hideViewDialog() {
    this.viewDialog2 = false;
  }
  get viewDialog2(): boolean {
    return this.service.viewDialog2;
  }

  set viewDialog2(value: boolean) {
    this.service.viewDialog2 = value;
  }
  get selected(): DeclarationTva {
    return this.service.selected;
  }

  set selected(value: DeclarationTva) {
    this.service.selected = value;
  }
}
