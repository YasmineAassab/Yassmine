import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../../../controller/service/demande.service";
import {Router} from "@angular/router";
import {Demande} from "../../../controller/model/demande.model";
import {DeclarationIsCreateComponent} from "../declarations-is/declaration-is-create/declaration-is-create.component";

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss']
})
export class DemandeListComponent implements OnInit {


  constructor(private service: DemandeService, private router: Router) { }

  public navigateToSearch(){
    this.router.navigateByUrl('view/declaration-is/list');
  }

  public navigateToCreate(selected: Demande){

    this.router.navigateByUrl('view/declarations-is/create');
  }

  public navigateToCharts(){
    this.router.navigateByUrl('view/declarations-is/charts');
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

  get selected(): Demande {
    return this.service.selected;
  }

  set selected(value: Demande) {
    this.service.selected = value;
  }

}
