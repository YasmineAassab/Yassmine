import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DeclarationTvaService} from "../../../../controller/service/declaration-tva.service";
import {DeclarationTvaVo2} from "../../../../controller/model/declaration-tva-vo2.model";
import {DeclarationTva} from "../../../../controller/model/declaration-tva.model";
import {Facture} from "../../../../controller/model/facture.model";
import {DeclarationISService} from "../../../../controller/service/declaration-is.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-declaration-tva-create',
  templateUrl: './declaration-tva-create.component.html',
  styleUrls: ['./declaration-tva-create.component.scss']
})
export class DeclarationTvaCreateComponent implements OnInit {
    fileName: string;
    public a2: boolean;
    public val: boolean;
    public bro: boolean;
  constructor(private messageService: MessageService,private confirmationService: ConfirmationService, private service: DeclarationTvaService) { }

  ngOnInit(): void {
  }
  public save(){
    return this.service.save().subscribe(
        data => {
          if (data > 0){
            console.log('bravo save declaration tva');
            alert('Declaration tva bien enregistrée');
            this.selected = null;
            this.object2 = null;
          }else {
              this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Declaration TVA  is NOT created !       ( data = ' + data + ' )', life: 4000});
          }
        }, error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error !', life: 4000});
        }
    );
  }
  public savebrouillon(){
    return this.service.savebrouillon().subscribe(
        data => {
          if (data > 0){
            console.log('bravo save brouillon declaration tva');
            alert('Declaration tva brouillon bien enregistrée');
          }else {
              this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Declaration TVA est non créer en tant que brouillon !       ( data = ' + data + ' )', life: 4000});
          }
        }, error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error !', life: 4000});
        }
    );
  }
  public delete(index: number, facture: Facture){
    return this.service.delete(index, facture).subscribe(
        data =>{
          if (facture.typeOperation == "type-1"){
            this.object2.listfacturevente.splice(index,1);
            this.object2.tvacollecter = this.object2.tvacollecter - facture.montantTVA;
            alert('vous avez supp ' + data + 'Facture Vente.');
          }
          else {
            this.object2.listfactureachat.splice(index,1);
            this.object2.tvadeductible = this.object2.tvadeductible - facture.montantTVA;
            alert('vous avez supp ' + data + 'Facture Achat.');
          }
          console.log('bravo supp facture');
          alert('vous avez supp ' + data + 'Facture.');
        }
    );
  }
  public afficheObject(){
    return this.service.afficheObject().subscribe(
        data => {
          this.object2 = data;
          console.log('bravo trvfacuresandcalcultva');
        }
    );
  }
  public test() {
    this.service.test();
  }
  fileChanged(e) {
        this.fileName = e.target.files[0].name;
        this.a2 = true;
        console.log('name of file  ' + this.fileName); // name of file
    }
    public openCreate() {
        this.selectedFact.typeOperation = "credit";
        this.selectedFact.societeSource.ice = this.selected.societe.ice;
        this.submitted = false;
        this.createDialog = true;
    }

    public openCreate1() {
        this.selectedFact.typeOperation = "debit";
        this.selectedFact.societeSource.ice = this.selected.societe.ice;
        this.submitted = false;
        this.createDialog = true;
    }
    public deleteFacture(selectedFact: Facture){
     this.selectedFact = selectedFact;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete facture ' + selectedFact.ref + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteFacture(selectedFact).subscribe(
                    data => {
                        console.log('bravo delete facture');
                        this.afficheObject();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Facture deleted',
                            life: 3000
                        });
                        this.selectedFact = null;
                    }, error => {
                        console.log('erreur delete facture');
                    }
                );
            }
        });
    }
    public viewFact(facture: Facture) {
        this.selectedFact = {...facture};
        this.viewDialog = true;
    }
    public editFact(facture: Facture){
      this.selectedFact = {...facture};
      this.editDialog = true;
    }
    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }
  get selected(): DeclarationTva {
    return this.service.selected;
  }
  set selected(value: DeclarationTva) {
    this.service.selected = value;
  }
  get object2(): DeclarationTvaVo2 {
    return this.service.object2;
  }
  set object2(value: DeclarationTvaVo2) {
    this.service.object2 = value;
  }
  get a(): boolean {
    return this.service.a;
  }
  get b(): boolean {
    return this.service.b;
  }
  get c(): boolean {
    return this.service.c;
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

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }
    get selectedFact(): Facture {
        return this.service.selectedFact;
    }
    set selectedFact(value: Facture) {
        this.service.selectedFact = value;
    }

}
