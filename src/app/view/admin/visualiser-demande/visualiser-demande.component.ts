import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../../../controller/service/demande.service";
import {Demande} from "../../../controller/model/demande.model";
import {DemandeVo} from "../../../controller/model/demande-vo.model";

@Component({
  selector: 'app-visualiser-demande',
  templateUrl: './visualiser-demande.component.html',
  styleUrls: ['./visualiser-demande.component.scss', './visualiser-demande.component.css']
})
export class VisualiserDemandeComponent implements OnInit {

  constructor(private service: DemandeService) {}

  public searchCriteria(){
    this.service.searchCriteria().subscribe(data => this.items = data);
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(data => this.items = data);
  }

  get items(): Array<Demande> {
    return this.service.items;
  }

  set items(value: Array<Demande>) {
    this.service.items = value;
  }

  get demandeVo(): DemandeVo {
    return this.service.demandeVo;
  }

  set demandeVo(value: DemandeVo) {
    this.service.demandeVo = value;
  }

}
