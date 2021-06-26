import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DeclarationIS} from "../model/declaration-is.model";
import {DeclarationTva} from "../model/declaration-tva.model";
import {DeclarationTvaVo1} from "../model/declaration-tva-vo1.model";
import {DeclarationTvaVo2} from "../model/declaration-tva-vo2.model";
import {Facture} from "../model/facture.model";
import {Observable} from "rxjs";
import {DeclarationTvaCriteria} from "../model/declaration-tva-criteria.model";
import {Paiement2} from "../model/paiement2.model";

@Injectable({
  providedIn: 'root'
})
export class DeclarationTvaService {
  private _url = environment.baseUrl + 'declarationtva/';
  private _selected: DeclarationTva;

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _viewDialog2: boolean;
  private _submitted: boolean;

  private _object1: DeclarationTvaVo1;
  private _object2: DeclarationTvaVo2;
  private _a = false;
  private _b = false;
  private _c = false;

  private _selectedVo: DeclarationTvaCriteria;
  private _items: Array<DeclarationTva>;
  private _details: DeclarationTvaVo2;
  private _selectes: Array<DeclarationTva>;
  private _selectedFact: Facture;
  private _paiements: Array<Paiement2>;
  constructor(private http: HttpClient) { }
  public findAll(): Observable<Array<DeclarationIS>> {
    return this.http.get<Array<DeclarationIS>>(this._url);
  }

  public save(): Observable<number> {
    return  this.http.post<number>(this.url + '', this.selected);
  }
  public savebrouillon(): Observable<number>{
    return this.http.post<number>( this.url + 'savebrouillon', this.selected);
  }

  public edit(): Observable<DeclarationIS> {
    return this.http.put<DeclarationIS>(this.url, this.selected);
  }

  public deleteByReference(): Observable<number> {
    return this.http.delete<number>(this.url + 'reference/' + this.selected.ref);
  }

  public afficheObject(): Observable<DeclarationTvaVo2>{
    this.object1.societeref = this.selected.societe.ice;
    this.object1.typedeclarationtva = this.selected.typeDeclarationTva.ref;
    this.object1.annee = this.selected.annee;
    this.object1.mois = this.selected.mois;
    this.object1.trim = this.selected.trim;
    return this.http.post<DeclarationTvaVo2>( this.url + 'findfacturesandcalcultva',this.object1);
  }
  public deleteMultipleByReference(): Observable<number> {
    return this.http.post<number>(this.url + 'delete-multiple-by-reference' , this.selectes);
  }
  public delete(index: number, facture: Facture): Observable<number> {
    return this.http.delete<number>(environment.baseUrl + '/ref/' + facture.ref);
  }
  public test() {
    this.a = true;
    if (this.selected.typeDeclarationTva.ref == 'TDTV1') {
      this.c = false;
      this.b = true;
    } else {
      this.b = false;
      this.c = true;
    }
  }

  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  public deleteIndexById(id: number) {
    this.items.splice(this.findIndexById(id), 1);
  }

  public deleteMultipleIndexById() {
    for (const item of this.selectes){
      this.deleteIndexById(item.id);
    }
  }
  public deleteDeclaration(selected: DeclarationTva): Observable<number>{
    return this.http.delete<number>(this.url + 'ref/' + selected.ref);
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get selected(): DeclarationTva {
    if(this._selected == null){
      this._selected = new DeclarationTva();
    }
    return this._selected;

  }

  set selected(value: DeclarationTva) {
    this._selected = value;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  get viewDialog2(): boolean {
    return this._viewDialog2;
  }

  set viewDialog2(value: boolean) {
    this._viewDialog2 = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get object1(): DeclarationTvaVo1 {
    if (this._object1 == null){
      this._object1 = new DeclarationTvaVo1();
    }
    return this._object1;
  }

  set object1(value: DeclarationTvaVo1) {
    this._object1 = value;
  }
  get a(): boolean {
    return this._a;
  }

  set a(value: boolean) {
    this._a = value;
  }

  get b(): boolean {
    return this._b;
  }

  set b(value: boolean) {
    this._b = value;
  }

  get c(): boolean {
    return this._c;
  }

  set c(value: boolean) {
    this._c = value;
  }

  get object2(): DeclarationTvaVo2 {
    if (this._object2 == null){
      this._object2 = new DeclarationTvaVo2();
    }
    return this._object2;
  }

  set object2(value: DeclarationTvaVo2) {
    this._object2 = value;
  }


  // service of declaration tva criteria

  public finddeclarationTva(): Observable<Array<DeclarationTva>>{
    return this.http.post<Array<DeclarationTva>>(this.url + 'criteria', this.selectedVo);
  }
  public finddetails(declarationtva: DeclarationTva): Observable<DeclarationTvaVo2>{
    let declarationtvavo1 = new DeclarationTvaVo1();
    declarationtvavo1.societeref = declarationtva.societe.ice;
    declarationtvavo1.typedeclarationtva = declarationtva.typeDeclarationTva.ref;
    declarationtvavo1.trim = declarationtva.trim;
    declarationtvavo1.annee = declarationtva.annee;
    declarationtvavo1.mois = declarationtva.mois;
    return this.http.post<DeclarationTvaVo2>(this.url + 'findfacturesandcalcultva',declarationtvavo1);
  }
  public convertToXmlFile(declarationTva: DeclarationTva): Observable<any> {
    return  this.http.post(this.url + 'convertToXmlFile', declarationTva);
  }

  get selectedVo(): DeclarationTvaCriteria {
    if (this._selectedVo == null){
      this._selectedVo = new DeclarationTvaCriteria();
    }
    return this._selectedVo;
  }

  set selectedVo(value: DeclarationTvaCriteria) {
    this._selectedVo = value;
  }

  get items(): Array<DeclarationTva> {
    if (this._items == null){
      this._items = new Array<DeclarationTva>();
    }
    return this._items;
  }

  set items(value: Array<DeclarationTva>) {
    this._items = value;
  }

  get details(): DeclarationTvaVo2 {
    if (this._details == null){
      this._details = new DeclarationTvaVo2();
    }
    return this._details;
  }

  set details(value: DeclarationTvaVo2) {
    this._details = value;
  }

  get selectes(): Array<DeclarationTva> {
    if (this._selectes == null){
      this._selectes = new Array<DeclarationTva>();
    }
    return this._selectes;
  }

  set selectes(value: Array<DeclarationTva>) {
    this._selectes = value;
  }

  //service facture create popup

  get selectedFact(): Facture {
    if (this._selectedFact == null){
      this._selectedFact = new Facture();
    }
    return this._selectedFact;
  }

  set selectedFact(value: Facture) {
    this._selectedFact = value;
  }
  public savefacture(): Observable<number>{
    return this.http.post<number>(environment.baseUrl + 'facture/', this.selectedFact);
  }

  //service facture edit popup

  public editfacture(): Observable<number>{
    return this.http.put<number>(environment.baseUrl + 'facture/', this.selectedFact);
  }

  //delete facture
  public deleteFacture(selectedFact: Facture): Observable<number> {
    return this.http.delete<number>(environment.baseUrl + 'facture/ref/' + selectedFact.ref);
  }

  //trouver les paiements d'une declarationTva
  public findpaiement(declarationTva: DeclarationTva): Observable<Array<Paiement2>>{
    return this.http.get<Array<Paiement2>>(environment.baseUrl + 'paiement2/bydecltvaref/ref/' + declarationTva.ref);
  }

  get paiements(): Array<Paiement2> {
    if (this._paiements == null){
      this._paiements = new Array<Paiement2>();
    }
    return this._paiements;
  }

  set paiements(value: Array<Paiement2>) {
    this._paiements = value;
  }
}
