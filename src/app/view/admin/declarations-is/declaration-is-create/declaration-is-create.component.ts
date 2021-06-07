import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {DeclarationIsObject} from "../../../../controller/model/declaration-is-object.model";
import {DeclarationIS} from "../../../../controller/model/declaration-is.model";
import {Facture} from "../../../../controller/model/facture.model";
import {Router} from "@angular/router";
import {AcomptesService} from "../../../../controller/service/acomptes.service";
import {Acomptes} from "../../../../controller/model/acomptes.model";

@Component({
  selector: 'app-declaration-is-create',
  templateUrl: './declaration-is-create.component.html',
  styleUrls: ['./declaration-is-create.component.scss', './declaration-is-create.component.css']
})
export class DeclarationIsCreateComponent implements OnInit {

    ice: string;
    annee: number;
    fileName: string;
    public a: boolean;
    public val: boolean;
    public bro: boolean;



  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private service: DeclarationISService,
              private router: Router, private service2: AcomptesService) {

    this.disabledSave = false;
    this.service.calculMontantIS(this.object.totalHTDiff).subscribe(data => {
      this.object.montantISCalcule = null;
      this.object.montantISCalcule = data;
      this.service.montant = data;
      console.log('data' + data);
      console.log('cal cal cal' + this.object.montantISCalcule);
      console.log('montant' + this.service.montant);
    });
  }

  public calculMontantIS(resultatFiscal: number){
     this.service.calculMontantIS(resultatFiscal).subscribe(data => {
      this.object.montantISCalcule = data;

    });
  }

  public deleteFact(selectedFact: Facture){
    console.log('dekhlna');
    this.selectedFact = selectedFact;
    console.log('fact    ' + selectedFact.montantHorsTaxe);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete facture ' + selectedFact.ref + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteFactByRef(selectedFact).subscribe(data => {
          if (selectedFact.typeOperation == "credit"){
            this.object.factureC = this.object.factureC.filter(val => val.id !== this.selectedFact.id);
            this.object.totalHTGain -= this.selectedFact.montantHorsTaxe;
          }
          if (selectedFact.typeOperation == "debit"){
            this.object.factureD = this.object.factureD.filter(val => val.id !== this.selectedFact.id);
            this.object.totalHTCharge -= this.selectedFact.montantHorsTaxe;
          }

          this.object.totalHTDiff = this.object.totalHTGain - this.object.totalHTCharge;
          this.calculMontantIS(this.object.totalHTDiff);
          this.findTauxIS(this.object.totalHTDiff);
          console.log('age ' + this.object.societe.age);
          console.log('cm ' + this.object.tauxIsConfig.cotisationMinimale);
          console.log('mc ' + this.object.montantISCalcule);
          this.montantPaye(this.object.societe.age, this.object.tauxIsConfig.cotisationMinimale, this.object.montantISCalcule);

          console.log('accept');
          this.selectedFact = new Facture();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Facture deleted',
            life: 3000
          });
        });
      }
    });
  }



  public findTauxIS(totalDiff: number) {
    return this.service.findTauxIS(totalDiff).subscribe(data => this.object.tauxIS = data);
  }

  public montantPaye(age: number, cm:number, m: number) {
    console.log('montant qbel '+this.object.montantISPaye);
    this.service.montantPaye(age, cm, m).subscribe(data => {
      this.object.montantISPaye = data;
      console.log('montant be3eed '+data);
    });
  }

  public viewFact(facture: Facture) {
    this.selectedFact = {...facture};
    this.viewDialog2 = true;
  }

  public validateSave(): boolean{
    return this.service.validateSave();
  }

  ngOnInit(): void {
  }

  public return(){
    this.router.navigateByUrl('demande/list');
  }

  public afficheObject() {
    return this.service.afficheObject().subscribe(data => {
      this.object = data;
      this.disabledSave = false;
      if (this.object.declarationIS.etatDeclaration == null){
        this.val = false;
        this.bro = false;
      }
      else if (this.object.declarationIS.etatDeclaration.libelle == 'valider'){
        this.val = true;
        this.bro = false;
      }
      else if (this.object.declarationIS.etatDeclaration.libelle == 'brouillon'){
        this.bro = true;
        this.val = false;
      }
    });
  }

  public save(etat: string){
    this.ice = this.object.societe.ice;
    this.annee = this.object.annee;
    return this.service.save(this.ice, this.annee, etat).subscribe(data => {
      console.log(data);
      if (data > 0){
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Declaration IS Created', life: 4000});
        this.selected = null;
        this.object = null;
        this.annee = null;
        this.ice = null;
      }else {
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Declaration IS is NOT created !       ( data = ' + data + ' )', life: 4000});
      }
    }, error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error !', life: 4000});
        }
    );
  }

  public openCreate() {
    this.selectedFact.typeOperation = "credit";
    this.selectedFact.societeSource.ice = this.object.societe.ice;
    this.submitted = false;
    this.createDialog = true;
  }

  public openCreate1() {
    this.selectedFact.typeOperation = "debit";
    this.selectedFact.societeSource.ice = this.object.societe.ice;
    this.submitted = false;
    this.createDialog = true;
  }

  public openCreate2() {
    this.acomptes.societe.ice = this.object.societe.ice;
    this.acomptes.numero = 1;
    this.acomptes.anneePaye = this.object.annee + 1;
    this.acomptes.montant = this.object.montantISPaye/4;
    this.submitted = false;
    this.createDialog2 = true;
  }

  public edit(DeclarationIS: DeclarationIS) {
    this.selected = {...DeclarationIS};
    this.editDialog = true;
  }

  get selected(): DeclarationIS {
    return this.service.selected;
  }

  set selected(value: DeclarationIS) {
    this.service.selected = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog2(): boolean {
    return this.service2.createDialog;
  }

  set createDialog2(value: boolean) {
    this.service2.createDialog = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog2(): boolean {
    return this.service.viewDialog2;
  }

  set viewDialog2(value: boolean) {
    this.service.viewDialog2 = value;
  }

  get selectedFact(): Facture {
    return this.service.selectedFact;
  }

  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
  }

  get object(): DeclarationIsObject {
    return this.service.object;
  }

  set object(value: DeclarationIsObject) {
    this.service.object = value;
  }

  get acomptes(): Acomptes {
    return this.service2.acomptes;
  }

  set acomptes(value: Acomptes) {
    this.service2.acomptes = value;
  }

  get disabledSave(): boolean {
    return this.service.disabledSave;
  }

  set disabledSave(value: boolean) {
    this.service.disabledSave = value;
  }

  fileChanged(e) {
    this.fileName = e.target.files[0].name;
    this.a = true;
    console.log('name of file  ' + this.fileName); // name of file
  }
}
