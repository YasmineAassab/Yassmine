import { Component, OnInit } from '@angular/core';
import {SousClasseComptable} from '../../../../../Controller/Model/sousClasseComptable.model';
import {SousClasseComptableService} from '../../../../../Controller/Service/sousClasseComptable.service';
import {ClasseComptableService} from "../../../../../Controller/Service/classeComptable.service";

@Component({
  selector: 'app-sous-create',
  templateUrl: './sous-create.component.html',
  styleUrls: ['./sous-create.component.scss']
})
export class SousCreateComponent implements OnInit {

  constructor(private service: ClasseComptableService , private service2: SousClasseComptableService) { }

  ngOnInit(): void {
  }
  get selected(): SousClasseComptable {
    if (this.service2.selected == null){
      this.service2.selected = new SousClasseComptable();
    }
    return this.service2.selected;
  }

  set selected(value: SousClasseComptable) {
    this.service2.selected = value;
  }
  get createDialog(): boolean {
    return this.service2.createDialog;
  }

  set createDialog(value: boolean) {
    this.service2.createDialog = value;
  }

  save() {
return this.service2.save(this.service.num1, this.selected).subscribe(
    data => {
      console.log(data);
      this.selected = null;
    }
);
  }
}
