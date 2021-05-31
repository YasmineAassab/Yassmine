import { Component, OnInit } from '@angular/core';
import {CpcSave} from "../../../../Controller/Model/cpc-vo.model";
import {CpcService} from "../../../../Controller/Service/cpc.service";
import {Cpc} from "../../../../Controller/Model/cpc.model";
import {CalCpcVo} from "../../../../Controller/Model/cal-cpc-vo.model";
import {Facture} from "../../../../Controller/Model/facture.model";
import {CpcTable} from "../cpc-view/cpc-view.component";

@Component({
  selector: 'app-cpc-recherch',
  templateUrl: './cpc-recherch.component.html',
  styleUrls: ['./cpc-recherch.component.scss']
})
export class CpcRecherchComponent implements OnInit {
  get cpc(): Cpc {
    if (this._cpc == null){
      this._cpc = new Cpc();
    }
    return this._cpc;
  }

  set cpc(value: Cpc) {
    this._cpc = value;
  }
  cols2: any[];
  private _calCpcVo: CalCpcVo;
  private _cpcVo: CpcSave;
  cpcTable: CpcTable[];
  cols: any[];
  private _cpc: Cpc;
  private _produitExp: number;
  private _prodFinance: number;
  private _prodNCourant: number;
  private _chargEx: number;
  private _chargFinance: number;
  private _chargNCourant: number;
  private _surImpots: number;
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
  public bring(type: string, calCpcVo: CalCpcVo){
    return this.service.bring(type, calCpcVo).subscribe(
        data => {
        if (type === 'PRODUITS D’EXPLOITATION'){
          this.service.items = data;
          console.log('PRODUITS D’EXPLOITATION' + '=' + this.service.items);
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
  remplir(){
    this.calCpcVo.datemin = this.cpcVo.dateMinVo;
    this.calCpcVo.datemax = this.cpcVo.dateMaxVo;
  }
  public remplirCpc(): Cpc{
    this.cpc.dateMaxCpc = this.calCpcVo.datemax;
    this.cpc.dateMinCpc = this.calCpcVo.datemin;
    this.cpc.totalProdEx = this.produitExp;
    this.cpc.totalChargEx = this.chargEx;
    this.cpc.totalProdFin = this.prodFinance;
    this.cpc.totalChargFin = this.chargFinance;
    this.cpc.totalProdNCour = this.prodNCourant;
    this.cpc.totalChargNCour = this.chargNCourant;
    return this.cpc;
  }
  detaille() {
    this.remplir();
    this.bring('PRODUITS D’EXPLOITATION', this.calCpcVo);
    this.bring('CHARGES D’EXPLOITATION', this.calCpcVo);
    this.bring('PRODUITS FINANCIERS', this.calCpcVo);
    this.bring('CHARGES FINANCIERES', this.calCpcVo);
    this.bring('PRODUITS NON COURANTS', this.calCpcVo);
    this.bring('CHARGES NON COURANTES', this.calCpcVo);
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
  find() {
    this.remplir();
    this.searchProduitExploitation(this.calCpcVo,"PRODUITS D’EXPLOITATION");
    this.searchProduitFinancier(this.calCpcVo, "PRODUITS FINANCIERS");
    this.searchProduitNonCourant(this.calCpcVo, "PRODUITS NON COURANTS");
    this.searchChargeExploitation(this.calCpcVo, "CHARGES DEXPLOITATION");
    this.searchChargeFinancier(this.calCpcVo, "CHARGES FINANCIERES");
    this.searchChargeNonCourant(this.calCpcVo, "CHARGES NON COURANTES");
    this.resultatSurImpots(this.resultatAvantImpots);
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

  update() {
    this.service.update(this.remplirCpc()).subscribe(
        data => {
          console.log(data);
        }
    );
  }
    delete(c: Facture, items: Array<Facture>){
      return this.service.delete(c, this.findIndexById(c.id, items)).subscribe(
          data => {
            console.log(data);
            items.splice(this.findIndexById(c.id, items), 1);
            this.find();
            this.detaille();
          }, error => {
            console.log('erreur');
          }
        );
    }
  public findIndexById(id: number, items: Array<Facture>): number{
    return this.service.findIndexById(id, items);
  }
  public openCreate() {
    this.service.viewDialog = true;
  }
  public openTab(){
    document.getElementById('tablinks').style.display = 'active';
  }
}
