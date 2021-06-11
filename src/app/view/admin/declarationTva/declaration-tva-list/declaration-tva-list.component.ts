import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DeclarationTvaService} from "../../../../controller/service/declaration-tva.service";
import {Observable} from "rxjs";
import {DeclarationTva} from "../../../../controller/model/declaration-tva.model";
import {DeclarationTvaCriteria} from "../../../../controller/model/declaration-tva-criteria.model";
import {DeclarationTvaVo2} from "../../../../controller/model/declaration-tva-vo2.model";
import {Facture} from "../../../../controller/model/facture.model";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";

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
    public viewDeclaration(selected: DeclarationTva){
      this.selected = {...selected};
      this.viewDialog2 = true;
    }
    public viewFact(facture: Facture) {
        this.selectedFact = {...facture};
        this.viewDialog = true;
    }
    public deleteDeclaration(selected: DeclarationTva){
      this.selected = selected;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete declaration TVA - ' + selected.ref + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteDeclaration(selected).subscribe(data => {
                    this.items = this.items.filter(val => val.id !== this.selected.id);
                    this.selected = null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'DeclarationTVA Deleted',
                        life: 3000
                    });
                });
            }
        });
    }
    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }
    get selectedFact(): Facture {
        return this.service.selectedFact;
    }
    set selectedFact(value: Facture) {
        this.service.selectedFact = value;
    }
    get viewDialog2(): boolean {
        return this.service.viewDialog2;
    }

    set viewDialog2(value: boolean) {
        this.service.viewDialog2 = value;
    }
    get selected(): DeclarationTva {
        return this.service.selected;
    }

    set selected(value: DeclarationTva) {
        this.service.selected = value;
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
