import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DeclarationTvaService} from "../../../../controller/service/declaration-tva.service";
import {Observable} from "rxjs";
import {DeclarationTva} from "../../../../controller/model/declaration-tva.model";
import {DeclarationTvaCriteria} from "../../../../controller/model/declaration-tva-criteria.model";
import {DeclarationTvaVo2} from "../../../../controller/model/declaration-tva-vo2.model";
import {Facture} from "../../../../controller/model/facture.model";

@Component({
  selector: 'app-declaration-tva-list',
  templateUrl: './declaration-tva-list.component.html',
  styleUrls: ['./declaration-tva-list.component.scss']
})
export class DeclarationTvaListComponent implements OnInit {
    cols: any[];
    exportColumns: any[];
    factures: Array<Facture>;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private service: DeclarationTvaService) { }
  activeIndex: number = 0;
  ngOnInit(): void {
      this.initCol();
  }
  public finddeclarationTva(){
    return this.service.finddeclarationTva().subscribe(
        data =>{
          this.items = data;
          console.log('bravo trouver list declaration tva');
        },error => {
          console.log('erreur trouver list declaration tva');
        }
    );
  }
  public finddetails(declarationtva: DeclarationTva){
    return this.service.finddetails(declarationtva).subscribe(
        data =>{
          this.details = data;
          console.log('bravo trouver details declaration tva');
        },error => {
          console.log('erreur trouver details declaration tva');
        }
    );
  }
  public convertToXmlFile(declarationTva: DeclarationTva){
    return this.service.convertToXmlFile(declarationTva).subscribe(
        data =>{
          console.log('bravo convert To Xml File');
          alert('Le fichier a été bien enregistrer dans telechargements');
        }, error => {
          console.log('error convert To Xml File');
        }
    );
  }
    private initCol() {
        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'ref', header: 'Reference'},
            {field: 'annee', header: 'Année'},
            {field: 'mois', header: 'Mois'},
            {field: 'trim', header: 'Trim'},
            {field: 'ice', header: 'Société'},
            {field: 'difftva', header: 'Diff Tva'},
            {field: 'ref', header: 'Type Declaration Tva'}

        ];
        this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    }
  get selectedVo(): DeclarationTvaCriteria {
    return this.service.selectedVo;
  }
  set selectedVo(value: DeclarationTvaCriteria) {
    this.service.selectedVo = value;
  }
  get items(): Array<DeclarationTva> {
    return this.service.items;
  }
  set items(value: Array<DeclarationTva>) {
    this.service.items = value;
  }
  get details(): DeclarationTvaVo2 {
    return this.service.details;
  }
  set details(value: DeclarationTvaVo2) {
    this.service.details = value;
  }
  get selectes(): Array<DeclarationTva> {
    return this.service.selectes;
  }
  set selectes(value: Array<DeclarationTva>) {
    this.service.selectes = value;
  }

}
