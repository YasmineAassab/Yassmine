import { Component, OnInit } from '@angular/core';
import {CpcService} from '../../../../controller/service/cpc.service';
import {Facture} from '../../../../controller/model/facture.model';
import {Cpc} from '../../../../controller/model/cpc.model';
import {CompteComptable} from '../../../../controller/model/compteComptable.model';
import {CompteComptableService} from '../../../../controller/service/compteComptable.service';
import {Societe} from '../../../../controller/model/societe.model';
import {Tva} from '../../../../controller/model/tva.model';
import {EtatFacture} from '../../../../controller/model/etat-facture.model';
import {EtatPaiement} from '../../../../controller/model/etat-paiement.model';
import {MessageService} from 'primeng/api';




@Component({
  selector: 'app-cpc-list',
  templateUrl: './cpc-list.component.html',
  styleUrls: ['./cpc-list.component.scss']
})
export class CpcListComponent implements OnInit {
  get type(): Array<string> {
    if (this._type == null){
      this._type = new Array<string>();
    }
    return this._type;
  }

  set type(value: Array<string>) {
    this._type = value;
  }

  private _type: Array<string>;
  constructor(private service: CpcService, private service2: CompteComptableService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAll();
    this.findAllSocieties();
    this.findAllTva();
    this.findAllEtatFacture();
    this.findAllEtatPaiment();
  }
  get viewDialog(): boolean {
    return this.service.viewDialog;
  }
  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }
  get items2(): Array<Cpc> {
    return this.service.items01;
  }
  get selected(): Facture {
    return this.service.selected;
  }

  set selected(value: Facture) {
    this.service.selected = value;
  }

  hideCreateDialog() {
    this.viewDialog = false;
  }

  save() {
    return this.service.save2().subscribe(
        data => {
          this.selected = null;
          console.log(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Role Created',
            life: 3000
          });
        }
    );
  }
  get items1(): Array<CompteComptable>{
    return this.service2.items1;
  }
  set items1(value: Array<CompteComptable>) {
    this.service2.items1 = value;
  }
  public findAll(){
    this.type.push('CRÉDIT');
    this.type.push('DÉBIT');
    return this.service2.findAll().subscribe(
        data => {
          this.items1 = data;
          console.log(data);
        }
    );
  }
  public findAllSocieties(){
    return this.service.findAllSocieties().subscribe(
        data => {
          this.items001 = data;
          this.items002 = data;
          console.log(data);
        }
    );
  }
  public findAllTva(){
    return this.service.findAllTva().subscribe(
        data => {
          this.items0001 = data;
          console.log(data);
        }
    );
  }
  public findAllEtatFacture(){
    return this.service.findAllEtatFacture().subscribe(
        data => {
          this.etatsFacture = data;
          console.log(data);
        }
    );
  }
  public findAllEtatPaiment(){
    return this.service.findAllEtatPaiment().subscribe(
        data => {
          this.etatsPaiment = data;
        }
    );
  }

  get items001(): Array<Societe> {
    return this.service.items001;
  }

  set items001(value: Array<Societe>) {
    this.service.items001 = value;
  }
  get items002(): Array<Societe> {
    return this.service.items002;
  }

  set items002(value: Array<Societe>) {
    this.service.items002 = value;
  }
  get items0001(): Array<Tva> {
    return this.service.items0001;
  }

  set items0001(value: Array<Tva>) {
    this.service.items0001 = value;
  }
  get etatsFacture(): Array<EtatFacture> {
    return this.service.etatsFacture;
  }

  set etatsFacture(value: Array<EtatFacture>) {
    this.service.etatsFacture = value;
  }
  get etatsPaiment(): Array<EtatPaiement> {
    return this.service.etatsPaiment;
  }

  set etatsPaiment(value: Array<EtatPaiement>) {
    this.service.etatsPaiment = value;
  }
}
