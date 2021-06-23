import { Component, OnInit } from '@angular/core';
import {Paiement2Service} from '../../../../controller/service/paiement.service';
import {Paiement2} from '../../../../controller/model/paiement2.model';
import {Paiement2Vo} from "../../../../controller/model/paiement2-vo.model";
import {Facture} from '../../../../controller/model/facture.model';

@Component({
  selector: 'app-paiement-list',
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.scss']
})
export class PaiementListComponent implements OnInit {


  constructor(private service: Paiement2Service) { }

  declaration: any;
  is = false;
  tva = false;

  selectedCategory: any = null;

  ngOnInit() {
  }

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
  public paiementCriteria(){
    this.service.paiementCriteria().subscribe(
        data =>{
          this.items = data;
          console.log("bravo trouver paiement list");
        }, error => {
          console.log("erreur trouver paiement list");
        }
    );
  }
  public openCreate() {
    console.log('kaaaydekhl')
    this.selected = new Paiement2();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(selected: Paiement2) {
    this.selected = {...selected};
    this.editDialog = true;
  }

  get selectedVo(): Paiement2Vo {
    return this.service.selectedVo;
  }
  get selected(): Paiement2 {
    return this.service.selected;
  }

  set selected(value: Paiement2) {
    this.service.selected = value;
  }

  get items(): Array<Paiement2> {
    return this.service.items;
  }

  set items(value: Array<Paiement2>) {
    this.service.items = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

  get selectes(): Array<Paiement2> {
    return this.service.selectes;
  }
  set selectes(value: Array<Paiement2>) {
    this.service.selectes = value;
  }

}
