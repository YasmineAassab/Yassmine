import { Injectable } from '@angular/core';
import {Societe} from '../model/societe.model';
import {Demande} from '../model/demande';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DeclarationIREmploye} from '../model/declaration-iremploye.model';
import {DeclarationIR} from '../model/declaration-ir.model';
import {Employe} from '../model/employe.model';
import {CategorieService} from '../model/categorie-service.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {





  constructor(private http: HttpClient) { }

  private _societe: Societe;
  private _demande: Demande;
  private url = environment.baseUrl;
  private _items:Array<Demande>;
  private _selectes: Array<Demande>;

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  private _selected:Demande;




  deleteDemande(selected:Demande):Observable<any>{
    return this.http.delete(this.url+'demande/ref/'+selected.ref);
  }

  get selected(): Demande {
    if (this._selected == null){
      this._selected= new Demande();
    }
    return this._selected;
  }

  set selected(value: Demande) {
    this._selected = value;
  }

  get selectes(): Array<Demande> {
    if (this._selectes==null){
      this._selectes=new Array<Demande>();
    }
    return this._selectes;
  }

  set selectes(value: Array<Demande>) {
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

  get items(): Array<Demande> {
    if (this._items==null){
      this._items=new Array<Demande>();
    }
    return this._items;
  }

  set items(value: Array<Demande>) {
    this._items = value;
  }

  get demande(): Demande {
    if (this._demande== null){
      this._demande= new Demande();
    }
    return this._demande;
  }

  set demande(value: Demande) {
    this._demande = value;
  }

  get societe(): Societe {
    if (this._societe==null){
      this._societe=new Societe();
    }
    return this._societe;
  }

  set societe(value: Societe) {
    this._societe = value;
  }
  save(): Observable<any> {
    console.log(this.demande);
    return this.http.post<number>(this.url+'demande/',this.demande);
  }



  findAllDemande(){
     this.http.get<Array<Demande>>(this.url+ 'demande/').subscribe(
        data =>{
          this.items =data;
          console.log(this.items);
        }, error => {
          console.log(error);
        }
    );
  }
}
