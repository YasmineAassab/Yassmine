import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Societe} from "../model/societe.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  private _url = environment.baseUrl + 'societe/';
  private _items: Array<Societe>;
  private _selected: Societe;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Societe>>{
    return this.http.get<Array<Societe>>(this.url);
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get items(): Array<Societe> {
    if (this._items == null){
      this._items = new Array<Societe>();
    }
    return this._items;
  }

  set items(value: Array<Societe>) {
    this._items = value;
  }

  get selected(): Societe {
    if (this._selected == null){
      this._selected = new Societe();
    }
    return this._selected;
  }

  set selected(value: Societe) {
    this._selected = value;
  }
}
