import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CalCpcVo} from "../Model/cal-cpc-vo.model";
import {Cpc} from "../Model/cpc.model";
import {Facture} from "../Model/facture.model";
import {CpcSave} from "../Model/cpc-vo.model";

@Injectable({
  providedIn: 'root'
})
export class CpcService {
  private _url = environment.baseUrl;
  private _viewDialog: boolean;
 private _items: Array<Facture>;
 private _items1: Array<Facture>;
 private _items2: Array<Facture>;
 private _items3: Array<Facture>;
 private _items4: Array<Facture>;
 private _items5: Array<Facture>;
 private _items01: Array<Cpc>;
 private _selected: Facture;
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
    public findIndexById(id: number, items: Array<Facture>): number {
        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
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
}
