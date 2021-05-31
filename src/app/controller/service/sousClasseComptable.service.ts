import { Injectable } from '@angular/core';
import {SousClasseComptable} from '../model/sousClasseComptable.model';
import {HttpClient} from '@angular/common/http';
import {CompteComptable} from '../model/compteComptable.model';
import {ClasseComptableService} from './classeComptable.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SousClasseComptableService {

// tslint:disable-next-line:variable-name
private _selected: SousClasseComptable;
private _createDialog: boolean;
  constructor(private http: HttpClient) { }
  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }
  get selected(): SousClasseComptable {
    return this._selected;
  }

  set selected(value: SousClasseComptable) {
    this._selected = value;
  }

  save(num1: number, selected: SousClasseComptable): Observable<number> {
    return this.http.post<number>('http://localhost:8036/gestion-section/section/class-num/' + num1 + '/', selected);
  }
  delete(numero: number): Observable<number> {
  return   this.http.delete<number>('http://localhost:8036/gestion-section/section/numero/' + numero); }
}
