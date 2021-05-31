import { Component, OnInit } from '@angular/core';
import {SousClasseComptable} from "../../../../../Controller/Model/sousClasseComptable.model";
import {CompteComptableService} from "../../../../../Controller/Service/compteComptable.service";
import {CompteComptable} from "../../../../../Controller/Model/compteComptable.model";

@Component({
  selector: 'app-compte-create',
  templateUrl: './compte-create.component.html',
  styleUrls: ['./compte-create.component.scss']
})
export class CompteCreateComponent implements OnInit {

  constructor(private service: CompteComptableService) { }

  ngOnInit(): void {
  }
  get selected(): CompteComptable {
    if (this.service.selected == null){
      this.service.selected = new CompteComptable();
    }
    return this.service.selected;
  }

  set selected(value: CompteComptable) {
    this.service.selected = value;
  }
  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  save() {
return this.service.save(this.service.num2,this.selected).subscribe();
  }
}
