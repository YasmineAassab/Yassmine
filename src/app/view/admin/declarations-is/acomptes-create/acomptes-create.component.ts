import { Component, OnInit } from '@angular/core';
import {AcomptesService} from "../../../../controller/service/acomptes.service";
import {Acomptes} from "../../../../controller/model/acomptes.model";
import {MessageService} from "primeng/api";
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";


@Component({
  selector: 'app-acomptes-create',
  templateUrl: './acomptes-create.component.html',
  styleUrls: ['./acomptes-create.component.scss']
})
export class AcomptesCreateComponent implements OnInit {

  constructor(private service: AcomptesService, private messageService: MessageService, private service2: DeclarationISService) { }

  ngOnInit(): void {
  }
  
  public save() {
    this.service.save().subscribe(data => {
      console.log(data);
      if (data > 0){
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Acompte Created', life: 4000});
        this.acomptes = null;
        this.service2.disabledSave = true;
        }
        else {
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Acompte No created ! ( data = ' + data + ' )', life: 4000});
        }
      }, error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Acompte No Created', life: 4000});
      }
    );
    this.createDialog = false;
  }

  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }

  get acomptes(): Acomptes {
    return this.service.acomptes;
  }

  set acomptes(value: Acomptes) {
    this.service.acomptes = value;
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

}
