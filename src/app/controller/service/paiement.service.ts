import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Paiement2} from '../model/paiement2.model';

@Injectable({
  providedIn: 'root'
})
export class Paiement2Service {
  
  private _url = environment.baseUrl + 'paiement2/';
  private _selected: Paiement2;
  private _items: Array<Paiement2>;
  private _selectes: Array<Paiement2>;

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Paiement2>>{
    return this.http.get<Array<Paiement2>>(this.url);
  }

  public save(): Observable<number>{
    return this.http.post<number>(this.url, this.selected);
  }

  public findByDeclarationISRef(ref: string): Observable<Array<Paiement2>>{
    return this.http.get<Array<Paiement2>>(this.url + 'bydeclisref/ref/' + ref);
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

  get selected(): Paiement2 {
    if (this._selected == null){
      this._selected = new Paiement2();
    }
    return this._selected;
  }

  set selected(value: Paiement2) {
    this._selected = value;
  }

  get selectes(): Array<Paiement2> {
    if (this._selectes == null){
      this._selectes = new Array<Paiement2>();
    }
    return this._selectes;
  }

  set selectes(value: Array<Paiement2>) {
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

  get items(): Array<Paiement2> {
    if (this._items == null){
      this._items = new Array<Paiement2>();
    }
    return this._items;
  }

  set items(value: Array<Paiement2>) {
    this._items = value;
  }

}
