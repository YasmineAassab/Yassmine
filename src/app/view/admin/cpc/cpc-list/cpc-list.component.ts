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
import {CalCpcVo} from '../../../../controller/model/cal-cpc-vo.model';




@Component({
  selector: 'app-cpc-list',
  templateUrl: './cpc-list.component.html',
  styleUrls: ['./cpc-list.component.scss']
})
export class CpcListComponent implements OnInit {
  types: Type[];
  constructor(private service: CpcService, private service2: CompteComptableService, private messageService: MessageService) {
    this.types = [
      {name: 'CRÉDIT'},
      {name: 'DÉBIT'}
    ];
  }
typeSelected: Type;
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
    this.selected.typeOperation = this.typeSelected.name;
    return this.service.save2().subscribe(
        data => {
          this.find();
          this.detaille();
          this.selected = null;
          console.log(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Facture a été crée',
            detail: 'Avec succès',
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
  public find() {
    this.searchProduitExploitation(this.calCpcVo,"PRODUITS D’EXPLOITATION");
    this.searchProduitFinancier(this.calCpcVo, "PRODUITS FINANCIERS");
    this.searchProduitNonCourant(this.calCpcVo, "PRODUITS NON COURANTS");
    this.searchChargeExploitation(this.calCpcVo, "CHARGES D’EXPLOITATION");
    this.searchChargeFinancier(this.calCpcVo, "CHARGES FINANCIERES");
    this.searchChargeNonCourant(this.calCpcVo, "CHARGES NON COURANTES");
    this.resultatSurImpots(this.resultatAvantImpots);
  }
  get surImpots(): number {
    return this.service.surImpots;
  }

  set surImpots(value: number) {
    this.service.surImpots = value;
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
  detaille() {
    this.bring('PRODUITS D’EXPLOITATION', this.calCpcVo);
    this.bring('CHARGES D’EXPLOITATION', this.calCpcVo);
    this.bring('PRODUITS FINANCIERS', this.calCpcVo);
    this.bring('CHARGES FINANCIERES', this.calCpcVo);
    this.bring('PRODUITS NON COURANTS', this.calCpcVo);
    this.bring('CHARGES NON COURANTES', this.calCpcVo);
  }
}
interface Type {
  name: string
}
