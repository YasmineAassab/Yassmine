import { Component, OnInit } from '@angular/core';
import {CompteComptable} from '../../../../../controller/model/compteComptable.model';
import {CompteComptableService} from '../../../../../controller/service/compteComptable.service';
import {ClasseComptableService} from '../../../../../controller/service/classeComptable.service';

@Component({
  selector: 'app-compte-liste',
  templateUrl: './compte-liste.component.html',
  styleUrls: ['./compte-liste.component.scss']
})
export class CompteListeComponent implements OnInit {
  cols: any[];
  constructor(private service: CompteComptableService, private service2: ClasseComptableService) { }

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
  get create2(): number {
    return this.service2.create2;
  }

  delete(code: string) {
    return this.service.delete(code).subscribe();
  }
  openCreate() {
    this.service.createDialog = true;
  }

}
