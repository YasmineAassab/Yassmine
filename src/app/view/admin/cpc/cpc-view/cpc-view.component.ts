import { Component, OnInit } from '@angular/core';
import {CpcService} from '../../../../Controller/Service/cpc.service';
import {CalCpcVo} from '../../../../Controller/Model/cal-cpc-vo.model';
import {Facture} from "../../../../Controller/Model/facture.model";
import {CpcSave} from "../../../../Controller/Model/cpc-vo.model";
import {Cpc} from "../../../../Controller/Model/cpc.model";

import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-cpc-view',
  templateUrl: './cpc-view.component.html',
  styleUrls: ['./cpc-view.component.scss']
})
export class CpcViewComponent implements OnInit {
  get cpcSave(): Cpc {
    if (this._cpcSave == null){
      this._cpcSave = new Cpc();
    }
    return this._cpcSave;
  }

  set cpcSave(value: Cpc) {
    this._cpcSave = value;
  }
  get displayPosition(): boolean {
    return this._displayPosition;
  }

  set displayPosition(value: boolean) {
    this._displayPosition = value;
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
  private _produitExp: number;
  private _prodFinance: number;
  private _prodNCourant: number;
  private _chargEx: number;
  private _chargFinance: number;
  private _chargNCourant: number;
  private _surImpots: number;
  private _calCpcVo: CalCpcVo;
  private _cpcVo: CpcSave;
  private _displayPosition: boolean;
  private _cpcSave: Cpc;
  cols: any[];
  cols2: any[];
  cpcTable: CpcTable[];
  constructor(private service: CpcService) { }

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
  public searchProduitExploitation(calCpcVo: CalCpcVo, operation: string){
    return this.service.searchProduitExploitation(calCpcVo, operation).subscribe(data => {
      console.log(data);
      this.produitExp = data; });
  }
  public searchChargeExploitation(calCpcVo: CalCpcVo, operation: string){
    return this.service.searchChargeExploitation(calCpcVo, operation).subscribe(
        data => {
          this.chargEx = data;
        }
    );
  }
  public  searchProduitFinancier(calCpcVo: CalCpcVo, operation: string){
    return this.service.searchProduitFinancier(calCpcVo, operation).subscribe(
        data => {
          this.prodFinance = data;
        }
    );
  }
  public  searchChargeFinancier(calCpcVo: CalCpcVo, operation: string){
    return this.service.searchChargeFinancier(calCpcVo, operation).subscribe(
        data => {
          this.chargFinance = data;
        }
    );
  }
  public  searchProduitNonCourant(calCpcVo: CalCpcVo, operation: string){
    return this.service.searchProduitNonCourant(calCpcVo, operation).subscribe(
        data => {
          this.prodNCourant = data;
        }
    );
  }
  public  searchChargeNonCourant(calCpcVo: CalCpcVo, operation: string){
    return this.service.searchChargeNonCourant(calCpcVo, operation).subscribe(
        data => {
          this.chargNCourant = data;
        }
    );
  }
  public resultatSurImpots(resultatAvantImpots: number){
    return this.service.resultatSurImpots(resultatAvantImpots).subscribe(
        data => {
          console.log(data);
          this.surImpots = data;
        }
    );
  }
  public bring(type: string, calCpcVo: CalCpcVo){
    return this.service.bring(type, calCpcVo).subscribe(
        data => {
          if (type === 'PRODUITS D’EXPLOITATION'){
            this.service.items = data;
            console.log( this.items);
          }
          else if (type === 'CHARGES D’EXPLOITATION') {
            this.service.items1 = data;
            console.log('CHARGES D’EXPLOITATION' + '=' + this.service.items1);
          }
          else if (type === 'PRODUITS FINANCIERS') {
            this.service.items2 = data;
            console.log('PRODUITS FINANCIERS' + '=' + this.service.items2);
          }
          else if (type === 'CHARGES FINANCIERES') {
            this.service.items3 = data;
            console.log('CHARGES FINANCIERES' + '=' + this.service.items3);
          }
          else if (type === 'PRODUITS NON COURANTS') {
            this.service.items4 = data;
            console.log('PRODUITS NON COURANTS' + '=' + this.service.items4);
          }
          else if (type === 'CHARGES NON COURANTES') {
            this.service.items5 = data;
            console.log('CHARGES NON COURANTES' + '=' + this.service.items5);
          }
        }, error => {
          console.log('erreur');
        }
    );
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
 public find() {
    this.searchProduitExploitation(this.calCpcVo,"PRODUITS D’EXPLOITATION");
    this.searchProduitFinancier(this.calCpcVo, "PRODUITS FINANCIERS");
    this.searchProduitNonCourant(this.calCpcVo, "PRODUITS NON COURANTS");
    this.searchChargeExploitation(this.calCpcVo, "CHARGES DEXPLOITATION");
    this.searchChargeFinancier(this.calCpcVo, "CHARGES FINANCIERES");
    this.searchChargeNonCourant(this.calCpcVo, "CHARGES NON COURANTES");
    this.resultatSurImpots(this.resultatAvantImpots);
  }
  delete(c: Facture, items: Array<Facture>){
    return new Promise((resolve, reject) => {
      return this.service.delete(c, this.findIndexById(c.id, items)).subscribe(
          data => {
            console.log(data);
            items.splice(this.findIndexById(c.id, items), 1);
            this.click();
          }, error => {
            console.log('erreur');
          }
      );
      resolve();
    });
  }
    public findIndexById(id: number, items: Array<Facture>): number{
      return this.service.findIndexById(id, items);
    }
  save(){
    this.cpcSave.dateMaxCpc = this.calCpcVo.datemax;
    this.cpcSave.dateMinCpc = this.calCpcVo.datemin;
    return this.service.save(this.remplir()).subscribe(
        data => {
            console.log(data);
        }
    );
  }
  public remplir(): Cpc{
    this.cpcSave.totalProdEx = this.produitExp;
    this.cpcSave.totalChargEx = this.chargEx;
    this.cpcSave.totalProdFin = this.prodFinance;
    this.cpcSave.totalChargFin = this.chargFinance;
    this.cpcSave.totalProdNCour = this.prodNCourant;
    this.cpcSave.totalChargNCour = this.chargNCourant;
    return this.cpcSave;
  }
  get calCpcVo(): CalCpcVo {
    if (this._calCpcVo == null){
      this._calCpcVo = new CalCpcVo();
    }
    return this._calCpcVo;
  }

  set calCpcVo(value: CalCpcVo) {
    this._calCpcVo = value;
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
  get items(): Array<Facture> {
    return this.service.items;
  }
  get items01(): Array<Cpc> {
    return this.service.items01;
  }
  public openCreate() {
    this.service.viewDialog = true;
  }
 public show() {
    document.getElementById('tab').style.display = 'block';
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
  detaille() {
    this.bring('PRODUITS D’EXPLOITATION', this.calCpcVo);
    this.bring('CHARGES D’EXPLOITATION', this.calCpcVo);
    this.bring('PRODUITS FINANCIERS', this.calCpcVo);
    this.bring('CHARGES FINANCIERES', this.calCpcVo);
    this.bring('PRODUITS NON COURANTS', this.calCpcVo);
    this.bring('CHARGES NON COURANTES', this.calCpcVo);
  }

  navigateAssociates(url: string) {
    window.open(url, '_blank');
  }

  click() {
    this.find();
    this.detaille();
    this.init();
  }
}
export interface CpcTable {
  numero;
  libelle;
/*  montant;*/
}

