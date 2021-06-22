import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Comptable} from "../model/comptable.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComptableService {

  private _url = environment.baseUrl + 'comptable/';
  private _items: Array<Comptable>;
  private _selected: Comptable;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Comptable>>{
    return this.http.get<Array<Comptable>>(this.url);
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get items(): Array<Comptable> {
    if (this._items == null){
      this._items = new Array<Comptable>();
    }
    return this._items;
  }

  set items(value: Array<Comptable>) {
    this._items = value;
  }

  get selected(): Comptable {
    if (this._selected == null){
      this._selected = new Comptable();
    }
    return this._selected;
  }

  set selected(value: Comptable) {
    this._selected = value;
  }
}
