import { Component, OnInit } from '@angular/core';
import {Paiement2Service} from '../../../../controller/service/paiement.service';
import {Paiement2} from '../../../../controller/model/paiement2.model';

@Component({
  selector: 'app-paiement-view',
  templateUrl: './paiement-view.component.html',
  styleUrls: ['./paiement-view.component.scss']
})
export class PaiementViewComponent implements OnInit {

  constructor(private service: Paiement2Service) { }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): Paiement2 {
    return this.service.selected;
  }

  set selected(value: Paiement2) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
