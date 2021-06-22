import { Injectable } from '@angular/core';
import {Facture} from '../model/facture.model';
import {Observable} from 'rxjs';
import {Cpc} from '../model/cpc.model';
import {CpcSave} from '../model/cpc-vo.model';
import {CalCpcVo} from '../model/cal-cpc-vo.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CpcFacture} from '../model/cpc-facture.model';
import {Societe} from '../model/societe.model';
import {Tva} from '../model/tva.model';
import {EtatFacture} from '../model/etat-facture.model';
import {EtatPaiement} from '../model/etat-paiement.model';

@Injectable({
  providedIn: 'root'
})
export class CpcService {
  get updload(): boolean {
    return this._updload;
  }

  set updload(value: boolean) {
    this._updload = value;
  }
  get selected1(): Facture {
    if (this._selected1 == null){
      this._selected1 = new Facture();
    }
    return this._selected1;
  }

  set selected1(value: Facture) {
    this._selected1 = value;
  }
  get updateDialog(): boolean {
    return this._updateDialog;
  }

  set updateDialog(value: boolean) {
    this._updateDialog = value;
  }
  private _surImpots: number;
  private _produitExp: number;
  private _prodFinance: number;
  private _prodNCourant: number;
  private _chargEx: number;
  private _chargFinance: number;
  private _chargNCourant: number;
  private _calCpcVo: CalCpcVo;
  private _url = environment.baseUrl;
  private _viewDialog: boolean;
  private _updateDialog: boolean;
  private _updload: boolean;
  private _items: Array<Facture>;
  private _items1: Array<Facture>;
  private _items2: Array<Facture>;
  private _items3: Array<Facture>;
  private _items4: Array<Facture>;
  private _items5: Array<Facture>;
  private _items01: Array<Cpc>;
  private _selected: Facture;
  private _selected1: Facture;
  private _items001: Array<Societe>;
  private _items002: Array<Societe>;
  private _items0001: Array<Tva>;
  private _etatsFacture: Array<EtatFacture>;
  private _etatsPaiment: Array<EtatPaiement>;
  constructor(private http: HttpClient) { }
  public searchProduitExploitation(calCpcVo: CalCpcVo, operation: string): Observable<number>{
    return this.http.post<number>(this.url + 'display-cpc/' + 'operation/' + operation + '/' , calCpcVo);
  }
  public searchChargeExploitation(calCpcVo: CalCpcVo, operation: string): Observable<number>{
    return this.http.post<number>(this.url + 'display-cpc/' + 'operation/' + operation + '/' , calCpcVo);
  }
  public searchProduitFinancier(calCpcVo: CalCpcVo, operation: string): Observable<number>{
    return this.http.post<number>(this.url + 'display-cpc/' + 'operation/' + operation + '/' , calCpcVo);
  }
  public searchChargeFinancier(calCpcVo: CalCpcVo, operation: string): Observable<number>{
    return this.http.post<number>(this.url + 'display-cpc/' + 'operation/' + operation + '/' , calCpcVo);
  }
  public searchProduitNonCourant(calCpcVo: CalCpcVo, operation: string): Observable<number>{
    return this.http.post<number>(this.url + 'display-cpc/' + 'operation/' + operation + '/' , calCpcVo);
  }
  public searchChargeNonCourant(calCpcVo: CalCpcVo, operation: string): Observable<number>{
    return this.http.post<number>(this.url + 'display-cpc/' + 'operation/' + operation + '/' , calCpcVo);
  }
  public findAll(): Observable<Array<Cpc>> {
    return this.http.get<Array<Cpc>>(this.url  + 'display-cpc/');
  }
  public save(cpc: Cpc): Observable<Cpc>{
    return this.http.post<Cpc>(this.url + 'display-cpc/' , cpc);
  }
  public resultatSurImpots(resultatAvantImpots: number): Observable<number> {
    return this.http.get<number>(this.url + 'display-cpc/' + 'resultat/' + resultatAvantImpots);
  }
  public bring(type: string, calCpcVo: CalCpcVo): Observable<Array<Facture>>{
    return this.http.post<Array<Facture>>(this.url + 'display-cpc/' + 'type/' + type + '/' , calCpcVo);
  }
  public find(cpcVo: CpcSave): Observable<Array<Cpc>>{
    return this.http.post<Array<Cpc>>(this.url + 'display-cpc/' + 'find/', cpcVo);
  }
  public delete(c: Facture, i: number): Observable<number>{
    return this.http.delete<number>(this.url + 'facture' + '/ref/' + c.ref);
  }
  public findIndexById(id: number, items: Array<any>): number {
    let index = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  public updateCpcFacture(cpcFacture: CpcFacture): Observable<CpcFacture>{
      return this.http.put<CpcFacture>(this.url + 'cpc-facture/', cpcFacture);
  }
  public updateFacture(): Observable<number>{
    return this.http.put<number>(this.url + 'facture/' , this.selected1);
  }
  public deleteCpc(id: number): Observable<number>{
    return this.http.delete<number>(this.url + 'display-cpc/delete/id/' + id);
  }
  public findAllSocieties(): Observable<Array<Societe>>{
    return this.http.get<Array<Societe>>(this.url + 'societe/');
  }
  public findAllTva(): Observable<Array<Tva>>{
    return this.http.get<Array<Tva>>(this.url + 'tva/');
  }
  public findAllEtatFacture(): Observable<Array<EtatFacture>>{
    return this.http.get<Array<EtatFacture>>(this.url + 'etatfacture/');
  }
  public findAllEtatPaiment(): Observable<Array<EtatPaiement>>{
    return this.http.get<Array<EtatPaiement>>(this.url + 'etatpaiment/');
  }
  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }
  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }
  get items(): Array<Facture> {
    if (this._items == null){
      this._items = new Array<Facture>();
    }
    return this._items;
  }

  set items(value: Array<Facture>) {
    this._items = value;
  }
  get items01(): Array<Cpc> {
    if (this._items01 == null){
      this._items01 = new Array<Cpc>();
    }
    return this._items01;
  }

  set items01(value: Array<Cpc>) {
    this._items01 = value;
  }
  get items1(): Array<Facture> {
    if (this._items1 == null){
      this._items1 = new Array<Facture>();
    }
    return this._items1;
  }

  set items1(value: Array<Facture>) {
    this._items1 = value;
  }

  get items2(): Array<Facture> {
    if (this._items2 == null){
      this._items2 = new Array<Facture>();
    }
    return this._items2;
  }

  set items2(value: Array<Facture>) {
    this._items2 = value;
  }

  get items3(): Array<Facture> {
    if (this._items3 == null){
      this._items3 = new Array<Facture>();
    }
    return this._items3;
  }

  set items3(value: Array<Facture>) {
    this._items3 = value;
  }

  get items4(): Array<Facture> {
    if (this._items4 == null){
      this._items4 = new Array<Facture>();
    }
    return this._items4;
  }

  set items4(value: Array<Facture>) {
    this._items4 = value;
  }

  get items5(): Array<Facture> {
    if (this._items5 == null){
      this._items5 = new Array<Facture>();
    }
    return this._items5;
  }

  set items5(value: Array<Facture>) {
    this._items5 = value;
  }
  get selected(): Facture {
    if (this._selected == null){
      this._selected = new Facture();
    }
    return this._selected;
  }

  set selected(value: Facture) {
    this._selected = value;
  }

  update(cpc1: Cpc): Observable<Cpc> {
    return this.http.put<Cpc>(this.url + 'display-cpc/' + 'update/' , cpc1);
  }

  save2(): Observable<Facture> {
    if (this.selected.id == null){
      return this.http.post<Facture>(this.url  + 'facture/', this.selected); }
    else {
      return this.http.put<Facture>(this.url + 'facture/', this.selected);
    }
  }
  get items001(): Array<Societe> {
    if (this._items001 == null){
      this._items001 = new Array<Societe>();
    }
    return this._items001;
  }

  set items001(value: Array<Societe>) {
    this._items001 = value;
  }
  get items002(): Array<Societe> {
    if (this._items002 == null){
      this._items002 = new Array<Societe>();
    }
    return this._items002;
  }

  set items002(value: Array<Societe>) {
    this._items002 = value;
  }
  get items0001(): Array<Tva> {
    if (this._items0001 == null){
      this._items0001 = new Array<Tva>();
    }
    return this._items0001;
  }

  set items0001(value: Array<Tva>) {
    this._items0001 = value;
  }
  get etatsFacture(): Array<EtatFacture> {
    if (this._etatsFacture == null){
      this._etatsFacture = new Array<EtatFacture>();
    }
    return this._etatsFacture;
  }

  set etatsFacture(value: Array<EtatFacture>) {
    this._etatsFacture = value;
  }
  get etatsPaiment(): Array<EtatPaiement> {
    if (this._etatsPaiment == null){
      this._etatsPaiment = new Array<EtatPaiement>();
    }
    return this._etatsPaiment;
  }

  set etatsPaiment(value: Array<EtatPaiement>) {
    this._etatsPaiment = value;
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
  get surImpots(): number {
    if (this._surImpots == null){
      this._surImpots = 0;
    }
    return this._surImpots;
  }

  set surImpots(value: number) {
    this._surImpots = value;
  }
}
