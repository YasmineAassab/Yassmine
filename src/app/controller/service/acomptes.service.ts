import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Acomptes} from "../model/acomptes.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AcomptesVo} from "../model/acomptes-vo.model";

@Injectable({
  providedIn: 'root'
})
export class AcomptesService {

  private _url = environment.baseUrl + 'acomptes/';
  private _selected: Acomptes;
  private _items: Array<Acomptes>;
  private _selectes: Array<Acomptes>;

  private _acomptesVo: AcomptesVo;

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Acomptes>>{
    return this.http.get<Array<Acomptes>>(this.url);
  }
  public save(): Observable<number>{
    return this.http.post<number>(this.url, this.selected);
  }

  public searchCriteria(): Observable<Array<Acomptes>>{
    return this.http.post<Array<Acomptes>>(this.url + 'recherche-multi-critere/', this.acomptesVo);
  }

  public findBySocieteIceAndAnnee(ice: string, annee: number): Observable<Array<Acomptes>>{
    return this.http.get<Array<Acomptes>>(this.url + 'ice/'+ ice +'/annee/'+ annee);
  }

  public deleteBySocieteIceAndAnneeAndNumero(): Observable<number>{
    return this.http.delete<number>(this.url + 'ice/'+ this.selected.societe.ice +'/annee/'+ this.selected.annee + '/numero/' + this.selected.numero);
  }

  public deleteMultipleBySocieteIceAndAnneeAndNumero(): Observable<number> {
    return this.http.post<number>(this.url + 'delete-multiple-by-societe-ice-and-annee-and-numero' , this.selectes);
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

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get selected(): Acomptes {
    if (this._selected == null){
      this._selected = new Acomptes();
    }
    return this._selected;
  }

  set selected(value: Acomptes) {
    this._selected = value;
  }

  get selectes(): Array<Acomptes> {
    if (this._selectes == null){
      this._selectes = new Array<Acomptes>();
    }
    return this._selectes;
  }

  set selectes(value: Array<Acomptes>) {
    this._selectes = value;
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

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get items(): Array<Acomptes> {
    if (this._items == null){
      this._items = new Array<Acomptes>();
    }
    return this._items;
  }

  set items(value: Array<Acomptes>) {
    this._items = value;
  }

  get acomptesVo(): AcomptesVo {
    if (this._acomptesVo == null){
      this._acomptesVo = new AcomptesVo();
    }
    return this._acomptesVo;
  }

  set acomptesVo(value: AcomptesVo) {
    this._acomptesVo = value;
  }
}
