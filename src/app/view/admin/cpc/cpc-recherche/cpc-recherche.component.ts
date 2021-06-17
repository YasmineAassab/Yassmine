import { Component, OnInit } from '@angular/core';
import {Facture} from '../../../../controller/model/facture.model';
import {CalCpcVo} from '../../../../controller/model/cal-cpc-vo.model';
import {CpcSave} from '../../../../controller/model/cpc-vo.model';
import {Cpc} from '../../../../controller/model/cpc.model';
import {CpcService} from '../../../../controller/service/cpc.service';
import {CpcTable} from '../cpc-view/cpc-view.component';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-cpc-recherche',
  templateUrl: './cpc-recherche.component.html',
  styleUrls: ['./cpc-recherche.component.scss']
})
export class CpcRechercheComponent implements OnInit {
  cols2: any[];
  private _cpcVo: CpcSave;
  cpcTable: CpcTable[];
  cols: any[];
  private _disactivatedFactures: Array<Facture>;
  private _cpc: Cpc;
  private _produitExp: number;
  private _prodFinance: number;
  private _prodNCourant: number;
  private _chargEx: number;
  private _chargFinance: number;
  private _chargNCourant: number;
  private _surImpots: number;
  private _detaille: boolean = false;
  activateIndex: number =0;
  constructor(public service: CpcService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.init();
    this.cols2 = [
      { field: 'ref', header: 'ref' },
      { field: 'Societe Source', header: 'Societe Source' },
      { field: 'Societe Distination', header: 'Societe Distination' },
      { field: 'libelle', header: 'libelle' },
      { field: 'MHT', header: 'MHT' },
      { field: 'tva', header: 'tva' },
      { field: 'MTVA', header: 'MTVA' },
      { field: 'MTTC', header: 'MTTC' },
      { field: 'Annee', header: 'Annee' },
      { field: 'mois', header: 'mois' },
      { field: 'trim', header: 'trim' },
      { field: 'Operation', header: 'Operation' },
      { field: 'comptable', header: 'comptable' },
      { field: 'action', header: 'action' },
    ];
  }
  public show() {
    document.getElementById('tab').style.display = 'block';
    document.getElementById('tab1').style.display = 'block';
  }
  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'produits d\'exploitation', header: 'Produits d\'exploitation'},
      {field: 'charge d\'exploitation', header: 'Charge D\'exploitation'},
      {field: 'produits financiers', header: 'Produits Financiers'},
      {field: 'charge financiers', header: 'Charge Financiers'},
      {field: 'produits non courants', header: 'Produits Non Courants'},
      {field: 'charges non courants', header: 'Charges Non Courants'}
    ];
  }
  public init(){
    this.cpcTable = [
      { numero: 'I', libelle: 'Produits d\'exploitation'},
    ];
    this.cols = [
      { field: 'numero', header: 'Numero' },
      { field: 'libelle', header: 'Libelle' },
      { field: 'montant', header: 'Montant' },
    ];
  }
  public  findCpc(){
    return this.service.find(this.cpcVo).subscribe(
        data => {console.log(data);
          this.service.items01 = data;
          console.log(this.service.items01);
        }, error => {
          console.log('erreur');
        }
    );
  }
  public remplirCpc(): Cpc{
   // this.cpc.dateMaxCpc = this.cpcVo.dateMaxVo;
    //this.cpc.dateMinCpc = this.cpcVo.dateMinVo;
    this.cpc.totalProdEx = this.produitExp;
    this.cpc.totalChargEx =this.chargEx;
    this.cpc.totalProdFin = this.prodFinance;
    this.cpc.totalChargFin = this.chargFinance;
    this.cpc.totalProdNCour = this.prodNCourant;
    this.cpc.totalChargNCour = this.chargNCourant;
    return this.cpc;
  }
  get items01(): Array<Cpc> {
    return this.service.items01;
  }
  get items(): Array<Facture> {
    return this.service.items;
  }
  get cpcVo(): CpcSave {
    if (this._cpcVo == null){
      this._cpcVo = new CpcSave();
    }
    return this._cpcVo;
  }

  set cpcVo(value: CpcSave) {
    this._cpcVo = value;
  }
  get items1(): Array<Facture> {
    return this.service.items1;
  }
  get items2(): Array<Facture> {
    return this.service.items2;
  }
  get items3(): Array<Facture> {
    return this.service.items3;
  }
  get items4(): Array<Facture> {
    return this.service.items4;
  }
  get items5(): Array<Facture> {
    return this.service.items5;
  }
  find(cpc: Cpc) {
    this.detaille = true;
    console.log(this.cpc);
    let fact1: Array<Facture>;
    fact1 = new Array<Facture>();
    let fact2: Array<Facture>;
    fact2 = new Array<Facture>();
    let fact3: Array<Facture>;
    fact3 = new Array<Facture>();
    let fact4: Array<Facture>;
    fact4 = new Array<Facture>();
    let fact5: Array<Facture>;
    fact5 = new Array<Facture>();
    let fact6: Array<Facture>;
    fact6 = new Array<Facture>();
    let disactivated: Array<Facture>;
    disactivated = new Array<Facture>();
    // tslint:disable-next-line:one-variable-per-declaration
    let produi1: number = 0; let produi2: number = 0; let produi3: number = 0;
    let charg1: number = 0; let charg2: number = 0; let charg3: number = 0;
    console.log(cpc);
    // tslint:disable-next-line:only-arrow-functions
    cpc.cpcFactures.forEach( function(item){
      if (item.facture.compteComptable.sousClasseComptable.libelle === 'PRODUITS D’EXPLOITATION' && item.included === true){
        fact1.push(item.facture);
        produi1 += item.facture.montantHorsTaxe;
        console.log('hii');
        console.log(fact1);
      }
      if (item.facture.compteComptable.sousClasseComptable.libelle === 'PRODUITS FINANCIERS' && item.included === true){
        fact2.push(item.facture);
        produi2 += item.facture.montantHorsTaxe;
        console.log('hii');
        console.log(fact1);
      }
      if (item.facture.compteComptable.sousClasseComptable.libelle === 'PRODUITS NON COURANTS' && item.included === true){
        fact3.push(item.facture);
        produi3 += item.facture.montantHorsTaxe;
        console.log('hii');
        console.log(fact1);
      }
      if (item.facture.compteComptable.sousClasseComptable.libelle === 'CHARGES D’EXPLOITATION' && item.included === true){
        fact4.push(item.facture);
        charg1 += item.facture.montantHorsTaxe;
        console.log('hii');
        console.log(fact1);
      }
      if (item.facture.compteComptable.sousClasseComptable.libelle === 'CHARGES FINANCIERES' && item.included === true){
        fact5.push(item.facture);
        charg2 += item.facture.montantHorsTaxe;
        console.log('hii');
        console.log(fact1);
      }
      if (item.facture.compteComptable.sousClasseComptable.libelle === 'CHARGES NON COURANTES' && item.included === true){
        fact6.push(item.facture);
        charg3 += item.facture.montantHorsTaxe;
        console.log('hii');
        console.log(fact1);
      }
      if (item.included === false){
        disactivated.push(item.facture);
      }
    });
    console.log(produi1);
    this.produitExp = produi1;
    this.prodFinance = produi2;
    this.prodNCourant = produi3;
    this.chargEx = charg1;
    this.chargFinance = charg2;
    this.chargNCourant = charg3;
    this.service.items = fact1;
    this.service.items1 = fact2;
    this.service.items2 = fact3;
    this.service.items3 = fact4;
    this.service.items4 = fact5;
    this.service.items5 = fact6;
    this.disactivatedFactures = disactivated;
  }
  get produitExp(): number {
    if (this._produitExp == null){
      this._produitExp = 0;
    }
    return this._produitExp;
  }

  set produitExp(value: number) {
    this._produitExp = value;
  }
  get prodNCourant(): number {
    if (this._prodNCourant == null){
      this._prodNCourant = 0;
    }
    return this._prodNCourant;
  }

  set prodNCourant(value: number) {
    this._prodNCourant = value;
  }

  get chargEx(): number {
    if (this._chargEx == null){
      this._chargEx = 0;
    }
    return this._chargEx;
  }

  set chargEx(value: number) {
    this._chargEx = value;
  }

  get chargFinance(): number {
    if (this._chargFinance == null){
      this._chargFinance = 0;
    }
    return this._chargFinance;
  }

  set chargFinance(value: number) {
    this._chargFinance = value;
  }

  get chargNCourant(): number {
    if (this._chargNCourant == null){
      this._chargNCourant = 0;
    }
    return this._chargNCourant;
  }

  set chargNCourant(value: number) {
    this._chargNCourant = value;
  }
  get prodFinance(): number {
    if (this._prodFinance == null){
      this._prodFinance = 0;
    }
    return this._prodFinance;
  }

  set prodFinance(value: number) {
    this._prodFinance = value;
  }
  get resultatExploi(): number {
    return  this.produitExp - this.chargEx;
  }
  get resultatFinance(): number {
    return  this.prodFinance - this.chargFinance;
  }
  get resultatCourant(): number {
    return  this.resultatExploi - this.resultatFinance;
  }
  get resultatNonCourant(): number {
    return  this.prodNCourant - this.chargNCourant;
  }
  get resultatAvantImpots(): number {
    return  this.resultatCourant + this.resultatNonCourant;
  }
  get surImpots(): number {
    if (this._surImpots == null){
      this._surImpots = 0;
    }
    return this._surImpots;
  }

  set surImpots(value: number) {
    this._surImpots = value;
  }
  get resultatNet(): number {
    return  this.resultatAvantImpots - this.surImpots ;
  }
  get detaille(): boolean {
    return this._detaille;
  }

  set detaille(value: boolean) {
    this._detaille = value;
  }

  update() {
    // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.cpc.cpcFactures.length; i++){
    this.service.updateCpcFacture(this.cpc.cpcFactures[i]).subscribe(
        data => {
          this.messageService.add({
            severity: 'success',
            summary: 'Avec succès',
            detail: 'CPC a été mis à jour',
            life: 3000
          });
          console.log(data);
        }
    );
  }
  this.service.update(this.remplirCpc()).subscribe(
        data => {
          console.log(data);
        }
    );
  }
  delete(c: Facture, items: Array<Facture>){
  /*  return this.service.delete(c, this.findIndexById(c.id, items)).subscribe(
        data => {
          console.log(data);
          items.splice(this.findIndexById(c.id, items), 1);
         // this.cpc.cpcFactures.splice(this.findIndexById(c.id, this.cpc.cpcFactures), 1);
          this.find(this.cpc);
        }, error => {
          console.log('erreur');
        }
    );*/
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Facture?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cpc.cpcFactures.forEach(function(item) {
          if (item.facture.id === c.id) {
            item.included = false;
          }
        });
        this.disactivatedFactures.push(c);
        this.find(this.cpc);
        items.splice(this.findIndexById(c.id, items), 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Avec succès',
          detail: 'Facture Supprimé',
          life: 3000
        });
      }
    });
  }
  public findIndexById(id: number, items: Array<any>): number{
    return this.service.findIndexById(id, items);
  }
  public openCreate() {
    this.service.viewDialog = true;
  }
  public openTab(){
    document.getElementById('tablinks').style.display = 'active';
  }
  public deleteCpc(id: number){
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet cpc?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    console.log(id);
    this.service.deleteCpc(id).subscribe(
        data => {
          this.items01.splice(this.findIndexById(id, this.items01), 1);
          console.log(data);
        }
    );
    this.messageService.add({
          severity: 'success',
          summary: 'Avec succès',
          detail: 'cpc Supprimé',
          life: 3000
        });
      }
    });

  }
  put(cpc: any) {
    this.cpc = cpc;
  }
  get disactivatedFactures(): Array<Facture> {
    if (this._disactivatedFactures == null){
      this._disactivatedFactures = new Array<Facture>();
    }
    return this._disactivatedFactures;
  }

  set disactivatedFactures(value: Array<Facture>) {
    this._disactivatedFactures = value;
  }
  get cpc(): Cpc {
    if (this._cpc == null){
      this._cpc = new Cpc();
    }
    return this._cpc;
  }

  set cpc(value: Cpc) {
    this._cpc = value;
  }

  restore(c: Facture, disactivatedFactures: Array<Facture>) {
    this.cpc.cpcFactures.forEach(function(item){
      if (item.facture.id === c.id){
        item.included = true;
      }
    });
    this.disactivatedFactures.splice(this.findIndexById(c.id, disactivatedFactures), 1);
    this.find(this.cpc);
  }
}
