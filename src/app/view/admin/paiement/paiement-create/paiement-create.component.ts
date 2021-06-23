import { Component, OnInit } from '@angular/core';
import {Paiement2Service} from '../../../../controller/service/paiement.service';
import {Paiement2} from '../../../../controller/model/paiement2.model';

@Component({
  selector: 'app-paiement-create',
  templateUrl: './paiement-create.component.html',
  styleUrls: ['./paiement-create.component.scss']
})
export class PaiementCreateComponent implements OnInit {

  constructor(private service: Paiement2Service) { }

  ngOnInit(): void {
  }

  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get items(): Array<Paiement2> {
    return this.service.items;
  }

  set items(value: Array<Paiement2>) {
    this.service.items = value;
  }

  get selected(): Paiement2 {
    return this.service.selected;
  }

  set selected(value: Paiement2) {
    this.service.selected = value;
  }

}
