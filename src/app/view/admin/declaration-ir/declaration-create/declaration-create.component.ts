import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationIrService} from '../../../../controller/service/declaration-ir.service';
import {Employe} from '../../../../controller/model/employe.model';
import {DeclarationIREmploye} from '../../../../controller/model/declaration-iremploye.model';



@Component({
  selector: 'app-declaration-create',
  templateUrl: './declaration-create.component.html',
  styleUrls: ['./declaration-create.component.scss']
})
export class DeclarationCreateComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeclarationIrService) {
  }

  ngOnInit(): void {
  }

  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }


  get employe(): Employe {

    return this.service.employe;
  }
  public save() {
    this.submitted = true;
  //  if (this.selected.reference.trim()) {
  //   this.service.save().subscribe(data => {
     //   this.items.push({...data});
    this.items.push({...this.selected});
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Déclaration créée',
          life: 3000
        });
    //  });
      this.createDialog = false;
      this.selected = new DeclarationIREmploye();
  //  }
  }
  get selected(): DeclarationIREmploye {
    return this.service.selected;
  }

  set selected(value: DeclarationIREmploye) {
    this.service.selected = value;
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

  get items(): Array<DeclarationIREmploye> {
    return this.service.items;
  }

  set items(value: Array<DeclarationIREmploye>) {
    this.service.items = value;
  }
  set employe(value: Employe) {
    this.service.employe;
  }

}
