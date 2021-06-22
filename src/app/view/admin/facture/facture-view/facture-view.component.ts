import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {FactureService} from '../../../../controller/service/facture.service';
import {Facture} from '../../../../controller/model/facture.model';

@Component({
  selector: 'app-facture-view',
  templateUrl: './facture-view.component.html',
  styleUrls: ['./facture-view.component.scss']
})
export class FactureViewComponent implements OnInit {


  constructor(private messageService: MessageService, private service: FactureService) {
  }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): Facture {
    return this.service.selected;
  }

  set selected(value: Facture) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
}
