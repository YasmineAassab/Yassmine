import { Injectable } from '@angular/core';
import {Societe} from '../model/societe.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../Security/model/user.model';
import {Demande} from "../model/demande.model";
import {DemandeVo} from "../model/demande-vo.model";
import {Comptable} from '../model/comptable.model';
import {TokenStorageService} from '../../Security/_services/token-storage.service';

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
  private _demandeVo: DemandeVo;
  private _comptables:Array<Comptable>;
  private API_URL:string = 'http://localhost:8036/api/test/';
  private _userlist:Array<User>;
  private _currentComptable:Comptable;
  private _comptablesTraiteur:Array<Comptable>;
  private _comptablesValidateur:Array<Comptable>;

  constructor(private http: HttpClient,private token:TokenStorageService) { }


  public searchCriteriaXX(): Observable<Array<Demande>>{
    return this.http.post<Array<Demande>>(this.url + 'recherche-multi-critere/', this.demandeVo);
  }

  get comptablesTraiteur(): Array<Comptable> {
    if (this._comptablesTraiteur==null){
      this._comptablesTraiteur=new Array<Comptable>();
    }
    return this._comptablesTraiteur;
  }

  set comptablesTraiteur(value: Array<Comptable>) {
    this._comptablesTraiteur = value;
  }

  get comptablesValidateur(): Array<Comptable> {
    if (this._comptablesValidateur==null){
      this._comptablesValidateur=new Array<Comptable>();
    }
    return this._comptablesValidateur;
  }

  set comptablesValidateur(value: Array<Comptable>) {
    this._comptablesValidateur = value;
  }

  public getComptableDemande():Observable<any> {

    return this.http.get<Array<Demande>>(this.url)
  }


  get userlist(): Array<User> {
    if (this._userlist==null){
      this._userlist=new Array<User>();
    }
    return this._userlist;
  }

  set userlist(value: Array<User>) {
    this._userlist = value;
  }

  get currentComptable(): Comptable {
    if (this._currentComptable==null){
      this._currentComptable=new Comptable();
    }
    return this._currentComptable;
  }

  set currentComptable(value: Comptable) {
    this._currentComptable = value;
  }



  public connectedComptable() {
    this.http.get<Array<User>>(this.API_URL).subscribe(
        data=>{
          console.log(data);
          this._userlist=data;
          for (let i=0; i<this._userlist.length; i++){
            if (this._userlist[i].username==this.token.getUser().username){
              this._currentComptable=this._userlist[i].comptable;
            }
          }
          console.log("****");
          console.log(this._currentComptable);

          this.displayDemandeComptable().subscribe(
              data=>{
                this.items=data;
              },error => {
                console.log(error);
              }
          );

        }
    );
  }



  public displayDemandeComptable():Observable<any> {
    console.log("****ha l user***");
    console.log(this.currentComptable.code);
    console.log(this.token.getUser());
    return this.http.get(this.url+'comptableTraiteur/code/'+this.currentComptable.code);

  }







  get comptables(): Array<Comptable> {
    if (this._comptables==null){
      this._comptables=new Array<Comptable>();
    }
    return this._comptables;
  }

  set comptables(value: Array<Comptable>) {
    this._comptables = value;
  }

  public searchDeclaration() :Observable<any>{
    console.log(this.demandeVo);
   return  this.http.post<any>(this.url+'searchDemandeCriteria',this.demandeVo);

  }

  public edit(): Observable<Demande> {
    console.log(this.selected);
    return this.http.put<Demande>(this.url, this.selected);
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



  public searchCriteria(): Observable<Array<Demande>>{
    this.demandeVo.comptableTraiteurCode=this.currentComptable.code;
  console.log("*********haaaaaaaa demande vo li tatsif");
  console.log(this.demandeVo);
    return this.http.post<Array<Demande>>(this.url + 'recherche-multi-critere/', this.demandeVo);
  }


/*
  public searchCriteria(): Observable<Array<Demande>>{
    this.demandeVo.comptableTraiteurCode=this.currentComptable.code;
    return this.http.get<Array<Demande>>(this.url + 'comptableTraiteur/code/'+this.currentComptable.code+'/annee/'+this.demandeVo.annee+'/mois/'+this.demandeVo.mois);
  }
*/

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
  save(): Observable<number> {
    console.log(this.demande);
    return this.http.post<number>(this.url,this.demande);
  }

  findAllDemande(){
    this.http.get<Array<Demande>>(this.url).subscribe(
        data =>{
          this.items =data;
          for (let i=0;i<this.items.length;i++){
            if (this.items[i].comptableValidateur==null || this.items[i].comptableTraiteur==null){
              this.items[i].comptableTraiteur=new Comptable();
              this.items[i].comptableValidateur=new Comptable();
              this.items[i].comptableTraiteur.nom="--";
              this.items[i].comptableValidateur.nom="--";
            }
          }
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
    if(this._demande.societe==null){
      this._demande.societe=new Societe();
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

  get demandeVo(): DemandeVo {
    if (this._demandeVo == null){
      this._demandeVo = new DemandeVo();
    }
    return this._demandeVo;
  }

  set demandeVo(value: DemandeVo) {
    this._demandeVo = value;
  }

  public getDemande(selected:Demande) :Observable<any> {
    console.log("d5ul lmera 1");
    return  this.http.get<Demande>(environment.baseUrl+'demande/ref/'+selected.ref);

  }


}
