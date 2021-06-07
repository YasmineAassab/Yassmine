import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Acomptes} from "../model/acomptes.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AcomptesService {

  private _acomptes: Acomptes;
  private _url = environment.baseUrl + 'acomptes/';

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;

  constructor(private http: HttpClient) { }

  public save(): Observable<number>{
    return this.http.post<number>(this.url, this.acomptes);
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get acomptes(): Acomptes {
    if (this._acomptes == null){
      this._acomptes = new Acomptes();
    }
    return this._acomptes;
  }

  set acomptes(value: Acomptes) {
    this._acomptes = value;
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
}
