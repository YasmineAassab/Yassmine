import { Injectable } from '@angular/core';



import {DeclarationIREmploye} from '../model/declaration-iremploye.model';
import {DeclarationIR} from '../model/declaration-ir.model';
import {Employe} from '../model/employe.model';
import {CategorieService} from '../model/categorie-service.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DeclarationIrVo} from '../model/declaration-ir-vo.model';
import {Societe} from '../model/societe.model';
import {Demande} from '../model/demande.model';
import {EtatDemande} from '../model/etat-demande.model';
import {DemandeService} from './demande.service';




@Injectable({
  providedIn: 'root'
})
export class DeclarationIrService {
  private url = environment.baseUrl + 'declarationIr/';
  private _items: Array<DeclarationIREmploye>;
  private _selected: DeclarationIREmploye;
  private _selectes: Array<DeclarationIREmploye>;

  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  private _declarationIR: DeclarationIR;
  private _employe: Employe;
  private _categorieServices: Array<CategorieService>;
  private _searchAnnee: number;
  private _searchIce: string;
  private _declarationIRSearch:DeclarationIR;
  private _declarationIrVo:DeclarationIrVo;
  private _currentDemande:Demande;






  get currentDemande(): Demande {
    if (this._currentDemande==null){
      this._currentDemande=new Demande();
    }
    if (this._currentDemande.societe==null){
      this._currentDemande.societe=new Societe();
    }
    return this._currentDemande;
  }

  set currentDemande(value: Demande) {
    this._currentDemande = value;
  }
  public updateEtatDemande():Observable<any> {
    console.log("**this is the current demande");
    console.log(this.currentDemande);
    return this.http.put(environment.baseUrl+'demande/',this.currentDemande);
  }



public details(declaration:DeclarationIR) :Observable<any>{
  console.log(declaration.ref);
  return this.http.get<Array<DeclarationIREmploye>>( environment.baseUrl+'declarationiremploye/declarationir/ref/'+declaration.ref);
}

  get declarationIrVo(): DeclarationIrVo {
    if (this._declarationIrVo==null){
      this._declarationIrVo=new DeclarationIrVo();
    }
    return this._declarationIrVo;
  }

  set declarationIrVo(value: DeclarationIrVo) {
    this._declarationIrVo = value;
  }

  get declarationIRSearch(): DeclarationIR {
    if (this._declarationIRSearch==null){
      this._declarationIRSearch=new DeclarationIR();
    }
    return this._declarationIRSearch;
  }

  set declarationIRSearch(value: DeclarationIR) {
    this._declarationIRSearch = value;
  }

  public search(annee:number,moiMin:number,moisMax:number): Observable<any> {
    this.declarationIrVo.annee=annee;
    this.declarationIrVo.moisMin=moiMin;
    this.declarationIrVo.moisMax=moisMax;
    console.log("***************");
    console.log(this.declarationIrVo);
    return this.http.post(this.url+'search',this.declarationIrVo);
  }


  get searchAnnee(): number {
    return this._searchAnnee;
  }

  set searchAnnee(value: number) {
    this._searchAnnee = value;
  }

  get searchIce(): string {
    return this._searchIce;
  }

  set searchIce(value: string) {
    this._searchIce = value;
  }

  public declarationSociete(): Observable<any> {
    return  this.http.get<Array<any>>(this.url + 'ice/' + this.searchIce + '/annee/' + this.searchAnnee);
  }


  get categorieServices(): Array<CategorieService> {
    if (this._categorieServices == null){
      this._categorieServices = new Array<CategorieService>();
    }
    return this._categorieServices;
  }

  set categorieServices(value: Array<CategorieService>) {
    this._categorieServices = value;
  }

  public convert(): Observable<any>{
   return  this.http.post<any>(this.url + 'xml', this.declarationIR);
  }


  public findCard(){
    this.http.get<Array<CategorieService>>('http://localhost:8036/gestion-comptabilite/categorieService' + '/').subscribe(
        data => {
          this.categorieServices = data;
          console.log(this.categorieServices);




        }
    );
  }




  get employe(): Employe {
    if (this._employe == null){
      this._employe = new Employe();
    }
    return this._employe;
  }

  set employe(value: Employe) {
    this._employe = value;
  }

  /*private _total:number;*/
  // constructor(private messageService: MessageService,
  //             private confirmationService: ConfirmationService, private http: HttpClient) {
  // }
  constructor(private http: HttpClient,private demandeService:DemandeService) {
  }


  public calculTotal(){
    let total = 0;
    for (let i = 0; i < this.items.length; i++){
      total += this.items[i].montantIR;
    }
    this.declarationIR.total = total;
  }



  public creeDeclarationIR(): Observable<Array<DeclarationIREmploye>> {
    console.log("haa declaration IR li ghatsifet");
    console.log(this.declarationIR);
    return this.http.post<Array<DeclarationIREmploye>>(this.url + 'createDeclarationIr', this.declarationIR);
  }


  public findAll(): Observable<Array<DeclarationIREmploye>> {
    return this.http.get<Array<DeclarationIREmploye>>(this.url);
  }

  public save(): Observable<DeclarationIREmploye> {
    return this.http.post<DeclarationIREmploye>(this.url + 'saveModification', this.declarationIR);
  }

  public edit(): Observable<DeclarationIREmploye> {
    return this.http.put<DeclarationIREmploye>(this.url, this.selected);
  }

  public deleteByReference(): Observable<number> {
    return this.http.delete<number>(this.url + 'reference/' + '/*this.selected.reference*/');
  }

  public deleteMultipleByReference(): Observable<number> {
    return this.http.post<number>(this.url + 'delete-multiple-by-reference' , this.selectes);
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

  public deleteIndexById(id: number) {
    this.items.splice(this.findIndexById(id), 1);
  }

  public deleteMultipleIndexById() {
    for (const item of this.selectes){
      this.deleteIndexById(item.id);
    }
  }

  get items(): Array<DeclarationIREmploye> {
    return this._items;
  }

  set items(value: Array<DeclarationIREmploye>) {
    this._items = value;
  }


  get selected(): DeclarationIREmploye {

    return this._selected;
  }

  set selected(value: DeclarationIREmploye) {
    this._selected = value;
  }

  get selectes(): Array<DeclarationIREmploye> {
    return this._selectes;
  }

  set selectes(value: Array<DeclarationIREmploye>) {
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

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }


  get declarationIR(): DeclarationIR {
    if (this._declarationIR == null){
      this._declarationIR = new DeclarationIR();
    }
    if (this._declarationIR.societe==null){
      this._declarationIR.societe=new Societe();
    }
    return this._declarationIR;
  }

  set declarationIR(value: DeclarationIR) {
    this._declarationIR = value;
  }

/*  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }*/
}
