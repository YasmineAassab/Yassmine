import { Component, OnInit } from '@angular/core';
import {AcomptesService} from "../../../../controller/service/acomptes.service";
import {Acomptes} from "../../../../controller/model/acomptes.model";
import {AcomptesVo} from "../../../../controller/model/acomptes-vo.model";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-acomptes-list',
  templateUrl: './acomptes-list.component.html',
  styleUrls: ['./acomptes-list.component.scss']
})
export class AcomptesListComponent implements OnInit {

  constructor(private service: AcomptesService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.service.findAll().subscribe(data => this.selectes = data);
  }

  public searchCriteria(){
    this.service.searchCriteria().subscribe(data => this.items = data);
  }

  public delete(selected: Acomptes){
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this acompte ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteBySocieteIceAndAnneeAndNumero().subscribe(data => {
          this.items = this.items.filter(val => val.id !== this.selected.id);
          this.selected = new Acomptes();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Acompte Deleted',
            life: 3000
          });
        });
      }
    });
  }

  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected acompte ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteMultipleBySocieteIceAndAnneeAndNumero().subscribe(data =>{
          this.service.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'acompte Deleted',
            life: 3000
          });
        });
      }
    });
  }

  get selected(): Acomptes {
    return this.service.selected;
  }
  set selected(value: Acomptes) {
    this.service.selected = value;
  }

  get items(): Array<Acomptes> {
    return this.service.items;
  }
  set items(value: Array<Acomptes>) {
    this.service.items = value;
  }

  get acomptesVo(): AcomptesVo {
    return this.service.acomptesVo;
  }
  set acomptesVo(value: AcomptesVo) {
    this.service.acomptesVo = value;
  }

  get selectes(): Array<Acomptes> {
    return this.service.selectes;
  }
  set selectes(value: Array<Acomptes>) {
    this.service.selectes = value;
  }
}
