import { Injectable } from '@angular/core';
import {ClasseComptable} from '../model/classeComptable.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SousClasseComptable} from "../Model/sousClasseComptable.model";


@Injectable({
  providedIn: 'root'
})
export class ClasseComptableService {
  private _selected: ClasseComptable;
  private _createDialog: boolean;
  private _items2: Array<SousClasseComptable>;
  private _num1: number;
  private _url: string = 'http://localhost:8036/gestion-class/class-comptable/';
  private _items: Array<ClasseComptable>;
  private _create: number;
  private _create2: number;

  constructor(private http: HttpClient ) { }
  public getAll(): Observable<Array<ClasseComptable>>{
   return this.http.get<Array<ClasseComptable>>(this.url);
}
 public findByNumeo(numero: number): Observable<Array<SousClasseComptable>>{
    return  this.http.get<Array<SousClasseComptable>>('http://localhost:8036/gestion-section/section/ClasseComptable/numero/' + numero);
  }

  delete(numero: number): Observable<number> {
    return this.http.delete<number>('http://localhost:8036/gestion-class/class-comptable/numero/' + numero);
  }
    save(selected: ClasseComptable): Observable<number> {
        return this.http.post<number>('http://localhost:8036/gestion-class/class-comptable/alone/' , selected);
    }
    update(){

    }
    get create(): number {
        return this._create;
    }

    set create(value: number) {
        this._create = value;
    }
    get create2(): number {
        return this._create2;
    }

    set create2(value: number) {
        this._create2 = value;
    }
  get selected(): ClasseComptable {
    return this._selected;
  }

  set selected(value: ClasseComptable) {
    this._selected = value;
  }
  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }
  get items(): Array<ClasseComptable> {
    return this._items;
  }

  set items(value: Array<ClasseComptable>) {
    this._items = value;
  }
  get url(): string {
    return this._url;
  }
  get num1(): number {
    return this._num1;
  }

  set num1(value: number) {
    this._num1 = value;
  }
  get items2(): Array<SousClasseComptable> {
    return this._items2;
  }

  set items2(value: Array<SousClasseComptable>) {
    this._items2 = value;
  }
}
