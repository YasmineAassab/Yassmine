import { Component, OnInit } from '@angular/core';
import {CompteComptable} from '../../../../../controller/model/compteComptable.model';
import {CompteComptableService} from '../../../../../controller/service/compteComptable.service';

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
