import { Component, OnInit } from '@angular/core';
import {ClasseComptable} from "../../../../../Controller/Model/classeComptable.model";
import {CompteComptableService} from "../../../../../Controller/Service/compteComptable.service";
import {CompteComptable} from "../../../../../Controller/Model/compteComptable.model";

@Component({
  selector: 'app-compte-liste',
  templateUrl: './compte-liste.component.html',
  styleUrls: ['./compte-liste.component.scss']
})
export class CompteListeComponent implements OnInit {
  cols: any[];
  constructor(private service: CompteComptableService) { }

  ngOnInit(): void {
  }
  private initCol() {
    this.cols = [
      {field: 'classe comptable', header: 'Classe Comptable'},
      {field: 'action', header: 'Action'}
    ];
  }
  get items(): Array<CompteComptable> {
    return this.service.items;
  }

  set items(value: Array<CompteComptable>) {
    this.service.items = value;
  }

  delete(code: string) {
    return this.service.delete(code).subscribe();
  }
  openCreate() {
    this.service.createDialog = true;
  }
}
