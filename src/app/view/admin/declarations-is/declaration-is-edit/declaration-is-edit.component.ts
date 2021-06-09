import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DeclarationISService} from '../../../../controller/service/declaration-is.service';
import {Table} from 'primeng/table';
import {DeclarationIsObject} from '../../../../controller/model/declaration-is-object.model';
import {Facture} from '../../../../controller/model/facture.model';
import {DeclarationIS} from '../../../../controller/model/declaration-is.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-declaration-is-edit',
  templateUrl: './declaration-is-edit.component.html',
  styleUrls: ['./declaration-is-edit.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DeclarationIsEditComponent implements OnInit {

  etat: string[];
  typeOp: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: DeclarationISService, private router: Router) {
    this.etat = [
      'valider',
      'brouillon'
    ];
  }

  public return(){
    this.router.navigateByUrl('/declarations-is/list');
  }

  public editFact(facture: Facture) {
    this.selectedFact = {...facture};
    this.editDialog = true;
  }

  public viewFact(facture: Facture) {
    this.selectedFact = {...facture};
    this.viewDialog2 = true;
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
          this.selected.factures = this.selected.factures.filter(val => val.id !== this.selectedFact.id);
          if (selectedFact.typeOperation == "credit"){
            this.selected.totalHTGain -= this.selectedFact.montantHorsTaxe;
          }
          if (selectedFact.typeOperation == "debit"){
            this.selected.totalHTCharge -= this.selectedFact.montantHorsTaxe;
          }

          this.selected.totalHTDiff = this.selected.totalHTGain - this.selected.totalHTCharge;
          this.calculMontantIS(this.selected.totalHTDiff);
          this.findTauxIS(this.selected.totalHTDiff);
          this.montantPaye(this.selected.societe.age, this.selected.tauxIsConfig.cotisationMinimale, this.selected.montantISCalcule);

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

  public calculMontantIS(resultatFiscal: number) {
    return this.service.calculMontantIS(resultatFiscal).subscribe(data => {
      this.selected.montantISCalcule = data;
      console.log('cal cal cal')
    });
  }

  public findTauxIS(totalDiff: number) {
    return this.service.findTauxIS(totalDiff).subscribe(data => this.selected.tauxIS = data);
  }

  public montantPaye(age: number, cm:number, montant:number) {
    this.service.montantPaye(age, cm, montant).subscribe(data => {
      console.log('montant qbel '+this.selected.montantISPaye);
      this.selected.montantISPaye = data;
      console.log('montant be3eed '+data);
    });
  }

  ngOnInit(): void {
    this.typeOp = [
      {label: 'Débit', value: 'debit'},
      {label: 'Ctédit', value: 'credit'}
    ];
     this.service.findFactures().subscribe(data => this.selected.factures = data );
  }

  public edit(selected: DeclarationIS){
        this.service.edit().subscribe(data => {
          if (data > 0){
            console.log(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Declaration IS Updated',
              life: 3000
            });
            this.selected = new DeclarationIS();
          }
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error !!',
            life: 3000
          });
            }
        );
  }

  public openCreate() {
    this.selectedFact.societeSource.ice = this.selected.societe.ice;
    this.submitted = false;
    this.createDialog = true;
  }

  public findFactureBySocieteSourceIceAndAnneeAndTypeOperation(typeOeration: string) {
    return this.service.findFactureBySocieteSourceIceAndAnneeAndTypeOperation(typeOeration).subscribe( data => {
      this.itemsFact = data;
      console.log(data);
        }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  get selected(): DeclarationIS {
    return this.service.selected;
  }

  set selected(value: DeclarationIS) {
    this.service.selected = value;
  }

  get object(): DeclarationIsObject {
    return this.service.object;
  }

  set objet(value: DeclarationIsObject) {
    this.service.object = value;
  }

  get selectedFact(): Facture {
    return this.service.selectedFact;
  }

  set selectedFact(value: Facture) {
    this.service.selectedFact = value;
  }

  get itemsFact(): Array<Facture> {
    return this.service.itemsFact;
  }

  set itemsFact(value: Array<Facture>) {
    this.service.itemsFact = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get viewDialog2(): boolean {
    return this.service.viewDialog2;
  }

  set viewDialog2(value: boolean) {
    this.service.viewDialog2 = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

}
