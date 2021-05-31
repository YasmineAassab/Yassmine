import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DeclarationIrService} from '../../../../controller/service/declaration-ir.service';
import {DeclarationIREmploye} from '../../../../controller/model/declaration-iremploye.model';


@Component({
  selector: 'app-declaration-edit',
  templateUrl: './declaration-edit.component.html',
  styleUrls: ['./declaration-edit.component.scss']
})
export class DeclarationEditComponent implements OnInit {


  constructor(private messageService: MessageService, private service: DeclarationIrService) {
  }

  ngOnInit(): void {
  }

  public edit() {
    this.submitted = true;
   // if (this.selected.reference.trim()) {
    if (this.selected.id!=null) {
        this.items[this.service.findIndexById(this.selected.id)] = this.selected;
      //  this.service.edit().subscribe(data => {
         // this.selected = data;
      console.log(this.items[this.service.findIndexById(this.selected.id)]);
      console.log(this.selected);

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Declaration Updated',
            life: 3000
          });
          this.service.calculTotal();
     //   });
      }
      this.editDialog = false;
      this.selected = new DeclarationIREmploye();
  //  }
  }

  public hideEditDialog() {
    this.editDialog = false;
  }
  get selected(): DeclarationIREmploye {
    return this.service.selected;
  }

  set selected(value: DeclarationIREmploye) {
    this.service.selected = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
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

}
