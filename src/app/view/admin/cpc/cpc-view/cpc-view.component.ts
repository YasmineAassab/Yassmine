import { Component, OnInit } from '@angular/core';
import {Facture} from '../../../../controller/model/facture.model';
import {CalCpcVo} from '../../../../controller/model/cal-cpc-vo.model';
import {CpcSave} from '../../../../controller/model/cpc-vo.model';
import {Cpc} from '../../../../controller/model/cpc.model';
import {CpcService} from '../../../../controller/service/cpc.service';
import {CpcFacture} from '../../../../controller/model/cpc-facture.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {async} from 'rxjs';
@Component({
  selector: 'app-cpc-view',
  templateUrl: './cpc-view.component.html',
  styleUrls: ['./cpc-view.component.scss']
})
export class CpcViewComponent implements OnInit {
  private _cpcVo: CpcSave;
  private _displayPosition: boolean;
  private _cpcSave: Cpc;
  cols: any[];
  cols2: any[];
  cpcTable: CpcTable[];
  constructor(private service: CpcService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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
            console.log( data);
          }
          else if (type === 'CHARGES D’EXPLOITATION') {
            this.service.items1 = data;
            console.log(data);
          }
          else if (type === 'PRODUITS FINANCIERS') {
            this.service.items2 = data;
            console.log(data);
          }
          else if (type === 'CHARGES FINANCIERES') {
            this.service.items3 = data;
            console.log(data);
          }
          else if (type === 'PRODUITS NON COURANTS') {
            this.service.items4 = data;
            console.log(data);
          }
          else if (type === 'CHARGES NON COURANTES') {
            this.service.items5 = data;
            console.log(data);
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
    this.searchChargeExploitation(this.calCpcVo, "CHARGES D’EXPLOITATION");
    this.searchChargeFinancier(this.calCpcVo, "CHARGES FINANCIERES");
    this.searchChargeNonCourant(this.calCpcVo, "CHARGES NON COURANTES");
    this.resultatSurImpots(this.resultatAvantImpots);
  }
  delete(c: Facture, items: Array<Facture>){
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Facture?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
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
        this.messageService.add({
          severity: 'success',
          summary: 'Facture Supprimé',
          detail: 'Avec succès',
          life: 3000
        });
      }
    });
  }
  public findIndexById(id: number, items: Array<Facture>): number{
    return this.service.findIndexById(id, items);
  }
  save(){
    return this.service.save(this.remplir()).subscribe(
        data => {
          console.log(data);
          this.messageService.add({
            severity: 'success',
            summary: 'CPC Crée',
            detail: 'Avec succès',
            life: 3000
          });
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
    this.cpcSave.dateMaxCpc = this.calCpcVo.datemax;
    this.cpcSave.dateMinCpc = this.calCpcVo.datemin;
    let cpc: Cpc;
    cpc = this.cpcSave;
    this.items.forEach(function(item){
      let cpcFacture: CpcFacture;
      cpcFacture = new CpcFacture();
      cpcFacture.facture = item;
      cpcFacture.included = true;
      cpc.cpcFactures.push(cpcFacture);
    });
    this.items1.forEach(function(item){
      let cpcFacture: CpcFacture;
      cpcFacture = new CpcFacture();
      cpcFacture.facture = item;
      cpcFacture.included = true;
      cpc.cpcFactures.push(cpcFacture);
    });
    this.items2.forEach(function(item){
      let cpcFacture: CpcFacture;
      cpcFacture = new CpcFacture();
      cpcFacture.facture = item;
      cpcFacture.included = true;
      cpc.cpcFactures.push(cpcFacture);
    });
    this.items3.forEach(function(item){
      let cpcFacture: CpcFacture;
      cpcFacture = new CpcFacture();
      cpcFacture.facture = item;
      cpcFacture.included = true;
      cpc.cpcFactures.push(cpcFacture);
    });
    this.items4.forEach(function(item){
      let cpcFacture: CpcFacture;
      cpcFacture = new CpcFacture();
      cpcFacture.facture = item;
      cpcFacture.included = true;
      cpc.cpcFactures.push(cpcFacture);
    });
    this.items5.forEach(function(item){
      let cpcFacture: CpcFacture;
      cpcFacture = new CpcFacture();
      cpcFacture.facture = item;
      cpcFacture.included = true;
      cpc.cpcFactures.push(cpcFacture);
    });
    return cpc;
  }
  get calCpcVo(): CalCpcVo {
    return this.service.calCpcVo;
  }

  set calCpcVo(value: CalCpcVo) {
    this.service.calCpcVo = value;
  }
  get produitExp(): number {
    return this.service.produitExp;
  }

  set produitExp(value: number) {
    this.service.produitExp = value;
  }
  get prodNCourant(): number {
    return this.service.prodNCourant;
  }

  set prodNCourant(value: number) {
    this.service.prodNCourant = value;
  }

  get chargEx(): number {
    return this.service.chargEx;
  }

  set chargEx(value: number) {
    this.service.chargEx = value;
  }

  get chargFinance(): number {
    return this.service.chargFinance;
  }

  set chargFinance(value: number) {
    this.service.chargFinance = value;
  }

  get chargNCourant(): number {
    return this.service.chargNCourant;
  }

  set chargNCourant(value: number) {
    this.service.chargNCourant = value;
  }
  get prodFinance(): number {
    return this.service.prodFinance;
  }

  set prodFinance(value: number) {
    this.service.prodFinance = value;
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
    return this.service.surImpots;
  }

  set surImpots(value: number) {
    this.service.surImpots = value;
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
  click() {
    this.find();
    this.detaille();
    this.init();
  }
  get updateDialog(): boolean {
    return this.service.updateDialog;
  }

  set updateDialog(value: boolean) {
    this.service.updateDialog = value;
  }

  showDialog(c: Facture) {
    this.service.selected1 = c;
    this.service.updateDialog = true;
  }
  get updload(): boolean {
    return this.service.updload;
  }

  set updload(value: boolean) {
    this.service.updload = value;
  }
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
}
export interface CpcTable {
  numero;
  libelle;
  /*  montant;*/
}
