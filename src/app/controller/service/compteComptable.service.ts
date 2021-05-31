import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClasseComptableService} from './classeComptable.service';
import {CompteComptable} from '../model/compteComptable.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompteComptableService {
  private _selected: CompteComptable;
  private _createDialog: boolean;
  private _items: Array<CompteComptable>;
  private _num2: number;
  constructor(private http: HttpClient) { }

  public find(numero: number): Observable<Array<CompteComptable>> {
  return  this.http.get<Array<CompteComptable>>('http://localhost:8036/gestion-categorie/categorie/SousClasseComptable/num/' + numero);
  }

  delete(code: string): Observable<number> {
    return this.http.delete<number>('http://localhost:8036/gestion-categorie/categorie/code/' + code);
  }
  get selected(): CompteComptable {
    return this._selected;
  }

  set selected(value: CompteComptable) {
    this._selected = value;
  }
  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }
  get items(): Array<CompteComptable> {
    return this._items;
  }

  set items(value: Array<CompteComptable>) {
    this._items = value;
  }
  get num2(): number {
    return this._num2;
  }

  set num2(value: number) {
    this._num2 = value;
  }

  save(num2: number, selected: CompteComptable): Observable<number> {
    return this.http.post<number>('http://localhost:8036/gestion-categorie/categorie/sousClass-num/' + num2 + '/', selected);
  }
}
