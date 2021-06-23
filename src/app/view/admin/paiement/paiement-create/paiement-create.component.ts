import { Component, OnInit } from '@angular/core';
import {Paiement2Service} from '../../../../controller/service/paiement.service';
import {Paiement2} from '../../../../controller/model/paiement2.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-paiement-create',
  templateUrl: './paiement-create.component.html',
  styleUrls: ['./paiement-create.component.scss']
})
export class PaiementCreateComponent implements OnInit {

  declaration: any;
  is = false;
  tva = false;

  constructor(private service: Paiement2Service, private messageService: MessageService) { }


  /*
  public save(){
    this.service.save().subscribe(data => {
      if (data > 0){
        this.items.push({...this.selected});
        this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Paiement enregistré', life: 4000});
      }
      else {
        this.messageService.add({severity:'warn', summary: 'Attention', detail: 'Paiement non enregistré !', life: 4000});
      }
    }, error => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Paiement non enregistré !', life: 4000});

    })
  }
*/

  public chooseDeclaration(){
    console.log(this.declaration)
    if (this.declaration == "Déclaration IS"){
      this.is = true;
      this.tva = false
    }
    if (this.declaration == "Déclaration TVA"){
      this.tva = true;
      this.is = false;
    }
    console.log(this.is + '  ' + this.tva);
  }

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
