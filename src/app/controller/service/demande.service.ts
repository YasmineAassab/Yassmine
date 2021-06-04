import { Injectable } from '@angular/core';
import {Societe} from '../model/societe.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DeclarationIREmploye} from '../model/declaration-iremploye.model';
import {DeclarationIR} from '../model/declaration-ir.model';
import {Employe} from '../model/employe.model';
import {CategorieService} from '../model/categorie-service.model';
import {User} from '../../Security/model/user.model';
import {Demande} from "../model/demande.model";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private _societe: Societe;
  private _demande: Demande;
  private _url = environment.baseUrl+'demande/';
  private _items:Array<Demande>;
  private _selectes: Array<Demande>;

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  private _selected:Demande;
  private _user: User;
  private _UserItemsFiltered: Array<User>;
  private _selectedDemande:Demande;


  public updateDemande(){

    this.http.put(this.url,this.selected).subscribe(
        data=>{
          console.log("mchaaat");
          console.log(data);
        },error => {
          console.log(error);
        }
    );
  }

  get selectedDemande(): Demande {
    if (this._selectedDemande==null){
      this._selectedDemande=new Demande();
    }
    return this._selectedDemande;
  }

  set selectedDemande(value: Demande) {
    this._selectedDemande = value;
  }

  constructor(private http: HttpClient) { }


  get UserItemsFiltered(): Array<User> {
    if (this._UserItemsFiltered==null){
      this._UserItemsFiltered= new Array<User>();
    }
    return this._UserItemsFiltered;
  }

  set UserItemsFiltered(value: Array<User>) {
    this._UserItemsFiltered = value;
  }

  /*  acceptDemande(selected:Demande):Observable<any>{
    return this.http.put(this.url+'demande/',selected);
  }*/
  save(): Observable<any> {
    console.log(this.demande);
    return this.http.post<number>(this.url,this.demande);
  }

  findAllDemande(){
    this.http.get<Array<Demande>>(this.url).subscribe(
        data =>{
          this.items =data;
          console.log(this.items);
        }, error => {
          console.log(error);
        }
    );
  }

  public findAll(): Observable<Array<Demande>> {
    return this.http.get<Array<Demande>>(this.url);
  }

  deleteDemande(selected:Demande):Observable<any>{
    return this.http.delete(this.url+'ref/'+selected.ref);
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get user(): User {
    if (this._user==null){
      this._user=new User();
    }
    return this._user;
  }

  set user(value: User) {
    this._user = value;
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


}
