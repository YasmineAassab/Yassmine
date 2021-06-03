import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Demande} from "../model/demande.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private _url = environment.baseUrl + 'demande/';
  private _items: Array<Demande>;
  private _selected: Demande;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Demande>> {
    return this.http.get<Array<Demande>>(this.url);
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get items(): Array<Demande> {
    if (this._items == null){
      this._items = new Array<Demande>();
    }
    return this._items;
  }

  set items(value: Array<Demande>) {
    this._items = value;
  }

  get selected(): Demande {
    if (this._selected == null){
      this._selected = new Demande();
    }
    return this._selected;
  }

  set selected(value: Demande) {
    this._selected = value;
  }

}
