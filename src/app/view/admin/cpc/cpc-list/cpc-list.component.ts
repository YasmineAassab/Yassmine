import { Component, OnInit } from '@angular/core';
import {CpcService} from "../../../../Controller/Service/cpc.service";
import {Cpc} from "../../../../Controller/Model/cpc.model";
import {Facture} from "../../../../Controller/Model/facture.model";


@Component({
  selector: 'app-cpc-list',
  templateUrl: './cpc-list.component.html',
  styleUrls: ['./cpc-list.component.scss']
})
export class CpcListComponent implements OnInit {

  constructor(private service: CpcService) { }

  ngOnInit(): void {
  }
  get viewDialog(): boolean {
    return this.service.viewDialog;
  }
  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
  get items2(): Array<Cpc> {
    return this.service.items01;
  }
  get selected(): Facture {
    return this.service.selected;
  }

  set selected(value: Facture) {
    this.service.selected = value;
  }

  hideCreateDialog() {
    this.viewDialog = false;
  }

  save() {
    return this.service.save2().subscribe(
        data => {
          console.log(data);
        }
    );
  }
}
