import { Component, OnInit } from '@angular/core';
import {Paiement2Service} from '../../../../controller/service/paiement.service';
import {Paiement2} from '../../../../controller/model/paiement2.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-paiement-edit',
  templateUrl: './paiement-edit.component.html',
  styleUrls: ['./paiement-edit.component.scss']
})
export class PaiementEditComponent implements OnInit {

  constructor(private service: Paiement2Service, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public update(){
    this.service.update(this.selected).subscribe(data => {
      if (data > 0){
        this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Paiement modifié', life: 4000});
      }
    }, error => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Paiement non modifié !', life: 4000});
        }
        )
  }

  public hideEditDialog() {
    this.editDialog = false;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get selected(): Paiement2 {
    return this.service.selected;
  }

  set selected(value: Paiement2) {
    this.service.selected = value;
  }

}
