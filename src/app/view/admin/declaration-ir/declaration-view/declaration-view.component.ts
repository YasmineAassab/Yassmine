import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationIrService} from '../../../../controller/service/declaration-ir.service';
import {DeclarationIREmploye} from '../../../../controller/model/declaration-iremploye.model';


@Component({
  selector: 'app-declaration-view',
  templateUrl: './declaration-view.component.html',
  styleUrls: ['./declaration-view.component.scss']
})
export class DeclarationViewComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationIrService) {
  }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): DeclarationIREmploye {
    return this.service.selected;
  }

  set selected(value: DeclarationIREmploye) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
}
