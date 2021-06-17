import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {DeclarationIREmploye} from '../../../controller/model/declaration-iremploye.model';
import {Employe} from '../../../controller/model/employe.model';
import {DeclarationIR} from '../../../controller/model/declaration-ir.model';
import {DemandeService} from '../../../controller/service/demande.service';
import {Demande} from '../../../controller/model/demande.model';
import {Societe} from '../../../controller/model/societe.model';
import {EtatDemande} from '../../../controller/model/etat-demande.model';
import {Comptable} from '../../../controller/model/comptable.model';


@Component({
    selector: 'app-declaration-ir',
    templateUrl: './declaration-ir.component.html',
    styleUrls: ['./declaration-ir.component.scss', './declaration-ir.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class DeclarationIrComponent implements OnInit {
    xmlString: Blob;
    cols: any[];
    file: Blob;
    isCreated:boolean=false;
    isSaved:boolean=true;
    validation:boolean=false;
    demande: Demande;
    nativeDeclarationIR:any;
    // total:number;
    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private service: DeclarationIrService,private demandeService :DemandeService) {
    }



    get currentComptable(): Comptable {

        return this.demandeService.currentComptable;
    }

    set currentComptable(value: Comptable) {
        this.demandeService.currentComptable = value;
    }



    get currentDemande(): Demande {

        return this.service.currentDemande;
    }

    set currentDemande(value: Demande) {
        this.service.currentDemande = value;
    }
    get currentDeclarationIR() {

        return this.service.currentDeclarationIR;
    }

    set currentDeclarationIR(value) {
        this.service.currentDeclarationIR = value;
    }

    ngOnInit(): void {
        this.initCol();
        if (this.currentComptable.type=="validateur"){
            this.validation=true;
        }
        console.log(this.currentDemande);
        //  this.service.findAll().subscribe(data => this.items = data);
        this.declarationIR.annee=this.currentDemande.annee;
        this.declarationIR.mois=this.currentDemande.mois;



       // this.nativeDeclarationIR=this.currentDeclarationIR;
     //   console.log("**this is the native**");
      //  console.log(this.nativeDeclarationIR);
    }

    /*  get total(): number {
        return this.service.total;
      }*/

    public convert() {

        this.declarationIR.declarationsIREmployes = this.items;
        return this.service.convert().subscribe(
            data => {
               /* this.file = data;
                console.log(this.file.type);

                const a = document.createElement('a');
                document.body.appendChild(a);
                const blob = new Blob([data], { type: '.xml' });
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = "hello";
                a.click();
                window.URL.revokeObjectURL(url);*/


                //const decodedString = atob(textToDecode);
                console.log(data);
                this.file=data;
                const fileName = "fileXml1";
                const fileType = '.xml';

                const blob = new Blob([this.file], { type: fileType });

                const a = document.createElement('a');
                a.download = fileName;
                a.href = URL.createObjectURL(blob);
                a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
             /*   var convertedString=JSON.stringify(data);
                var fileContents = convertedString;
                var filename = "hello.txt";
                var filetype = "text/plain";

                var a = document.createElement("a");
                var dataURI = "data:" + filetype +
                    ";base64," + btoa(fileContents);
                a.href = dataURI;
                a['download'] = filename;
                var e = document.createEvent("MouseEvents");
// Use of deprecated function to satisfy TypeScript.
                e.initMouseEvent("click", true, false,
                    document.defaultView, 0, 0, 0, 0, 0,
                    false, false, false, false, 0, null);
                a.dispatchEvent(e);
               // a.removeNode();*/
                console.log('ela slaaamtna 2');
            }
        );
        /*return  this.service.convert().subscribe(
            data=>{

                this.xmlString=data;
              saveAs(this.xmlString,'works.xml');

              console.log(data);
              console.log(this.xmlString);
              console.log("hadchi li bghina");
            },error => {
              console.log(error);
            }
        );*/
    }

    updateEtatDemande(){



        this.service.updateEtatDemande().subscribe(
            data=>{
                console.log("succes");
            },error => {
                console.log(error);
            }
        );

    }

    get etats(): Array<EtatDemande> {

        return this.demandeService.etats;
    }

    set etats(value: Array<EtatDemande>) {
        this.demandeService.etats = value;
    }

    public valideDeclaration(nativedeclarationIR:DeclarationIR){
        console.log("luwla libit sift");
        console.log(nativedeclarationIR);
        for (let i=0;i<this.items.length;i++){
            this.items[i].id=null;
        }
        this.declarationIR.declarationsIREmployes = this.items;

        this.service.deleteDeclarationIRandIREmploye().subscribe(

            data=>{
                console.log(data);
                return this.service.save().subscribe(
                    data => {
                        this.items = null;
                        this.isSaved=true;
                        this.isCreated=false;
                        this.declarationIR.total=0;
                        this.currentDemande.etatDemande.libelle="traitée";

                        this.updateEtatDemande();

                        // this.declarationIR=null;
                        // this.declarationIR=new DeclarationIR();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Déclarations enregistrées',
                            life: 3000
                        });
                        console.log('3la slaaamtna');
                    }, error => {
                        console.log(error);
                    }
                );





            },error => {
                console.log(error);
            }
        );

    }



    public save() {

        this.declarationIR.declarationsIREmployes = this.items;

        return this.service.save().subscribe(
            data => {
                this.items = null;
                this.isSaved=true;
                this.isCreated=false;
                this.declarationIR.total=0;
                this.currentDemande.etatDemande.libelle="en cours de traitement";

                this.updateEtatDemande();

               // this.declarationIR=null;
               // this.declarationIR=new DeclarationIR();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Déclarations enregistrées',
                    life: 3000
                });
                console.log('3la slaaamtna');
            }, error => {
                console.log(error);
            }
        );
    }

    public generateID() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].id = i;
        }
    }

/*    public getDemande(){
        this.demandeService.getDemande().subscribe(
            data=>{
                console.log("d5ul lmera 2");
                console.log(data);

                this.demande= data;
                this.declarationIR.societe=this.demande.societe;
                console.log("*haaa societe am3elem li tsetaat**");
                console.log(this.declarationIR.societe);
                console.log(this.demande);
                console.log(this.demande.societe.employes);
            },error => {
                console.log(error);
            }
        );
    }*/

    public creeDeclarationIR() {
  //  this.getDemande();

        console.log("**haa demande dialek***");
        console.log(this.currentDemande);
        this.declarationIR.societe=this.currentDemande.societe;
       // console.log(this.demande);
      //  console.log("***************ha societe li setitha*****");
       // this.declarationIR.societe=this.demande.societe;
        return this.service.creeDeclarationIR().subscribe(
            data => {
                console.log(data);
                this.items = data;
                this.generateID();
                this.service.calculTotal();
                this.isCreated= true;
                this.isSaved=false;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
    }


    public delete(selected: DeclarationIREmploye) {
        this.selected = selected;
        this.confirmationService.confirm({
            message: 'Etes-vous sûr que vous voulez supprimer cette Declaration ?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.items = this.items.filter(val => val.id !== this.selected.id);
                this.service.calculTotal();
                this.selected = new DeclarationIREmploye();
                this.messageService.add({
                    severity: 'success',
                    summary: 'succès',
                    detail: 'Déclaration IR Employé Supprimée',
                    life: 3000
                });

            }
        });
    }

    public deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer la déclaration sélectionnée ?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.service.deleteMultipleIndexById();
                this.service.calculTotal();
                this.selectes = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Déclarations supprimées',
                    life: 3000
                });

            }
        });
    }

    public openCreate() {
        this.selected = new DeclarationIREmploye();
        this.selected.employe=new Employe();
        this.submitted = false;
        this.createDialog = true;
    }

    public edit(commande: DeclarationIREmploye) {
        this.selected = {...commande};
        this.editDialog = true;
    }

    public view(commande: DeclarationIREmploye) {
        this.selected = {...commande};
        this.viewDialog = true;
    }

    private initCol() {
        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'reference', header: 'Reference'},
            {field: 'total', header: 'Total'},
            {field: 'totalPaye', header: 'Total Paye'}
        ];
    }

    get selected(): DeclarationIREmploye {
        return this.service.selected;
    }

    set selected(value: DeclarationIREmploye) {
        this.service.selected = value;
    }

    get items(): Array<DeclarationIREmploye> {
        return this.service.items;
    }

    set items(value: Array<DeclarationIREmploye>) {
        this.service.items = value;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get selectes(): Array<DeclarationIREmploye> {
        return this.service.selectes;
    }

    set selectes(value: Array<DeclarationIREmploye>) {
        this.service.selectes = value;
    }

    get declarationIR(): DeclarationIR {

        return this.service.declarationIR;
    }
}
