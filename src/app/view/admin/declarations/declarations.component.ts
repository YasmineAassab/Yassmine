import { Component, OnInit } from '@angular/core';
import {DemandeService} from '../../../controller/service/demande.service';
import {Demande} from '../../../controller/model/demande';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {DeclarationIREmploye} from '../../../controller/model/declaration-iremploye.model';
import {Employe} from '../../../controller/model/employe.model';
import {DeclarationIR} from '../../../controller/model/declaration-ir.model';
import {User} from '../../../Security/model/user.model';
import {UserService} from '../../../Security/_services/user.service';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})
export class DeclarationsComponent implements OnInit {
  cols: any[];
  isCreated:boolean=false;
  isSaved:boolean=true;
  // total:number;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,private service: DemandeService,private userService:UserService) {
  }

  ngOnInit(): void {

    this.initCol();
    this.service.findAllDemande();
    this.userService.getUsersComptable();

    //  this.service.findAll().subscribe(data => this.items = data);
  }

  /*  get total(): number {
      return this.service.total;
    }*/

 /* public convert() {

    this.declarationIR.declarationsIREmployes = this.items;
    return this.service.convert().subscribe(
        data => {
          /!* this.file = data;
           console.log(this.file.type);

           const a = document.createElement('a');
           document.body.appendChild(a);
           const blob = new Blob([data], { type: '.xml' });
           const url = window.URL.createObjectURL(blob);
           a.href = url;
           a.download = "hello";
           a.click();
           window.URL.revokeObjectURL(url);*!/


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

          console.log('ela slaaamtna 2');
        }
    );

  }
*/

  public save() {

   /* this.declarationIR.declarationsIREmployes = this.items;*/

    return this.service.save().subscribe(
        data => {
          this.items = null;
          this.isSaved=true;
          this.isCreated=false;

          // this.declarationIR=null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Declarations saved',
            life: 3000
          });
          console.log('3la slaaamtna');
        }, error => {
          console.log(error);
        }
    );
  }






  public delete(selected: Demande) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Are you sure you want to refuse this Request ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteDemande(selected).subscribe(
            data=>{
              console.log("safi mchat");
            },error => {
              console.log(error);
            }
        );

        /*this.generateID();*/
      //  console.log("*****dkuuul");
        console.log(this.items);
        console.log(this.selected);
        this.items = this.items.filter(val => val.id !== selected.id);
     // console.log("*****khreeej");
        this.selected = new Demande();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Declaration IR Employe Deleted',
          life: 3000
        });

      }
    });
  }
  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

  get user(): User {

    return this.service.user;
  }

  set user(value: User) {
    this.service.user = value;
  }


  public accept(selected: Demande) {
    this.viewDialog= true;
    this.selected = selected;

          this.viewDialog=true;

              console.log(this.selected);


      }






  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected declaration ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

       /* this.service.deleteMultipleIndexById();
        this.service.calculTotal();*/
        this.selectes = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Declarations Deleted',
          life: 3000
        });

      }
    });
  }

  public openCreate() {
    this.selected = new Demande();
   // this.selected.employe=new Employe();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(commande: Demande) {
    this.selected = {...commande};
    this.editDialog = true;
  }

  public view(commande: Demande) {
    this.selected = {...commande};
    this.viewDialog = true;
  }



  private initCol() {
    this.cols = [
      {field: 'ID', header: 'Id'},
      {field: 'ref', header: 'reference'},
      {field: 'operation', header: 'Total'},
      {field: 'mois', header: 'Mois'},
      {field: 'annee', header: 'Annee'},
      {field: 'ice ', header: 'Ice de Societe'}
    ];
  }

  get selected(): Demande {
    return this.service.selected;
  }

  set selected(value: Demande) {
    this.service.selected = value;
  }

  get items(): Array<Demande> {
    return this.service.items;
  }

  set items(value: Array<Demande>) {
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



  get selectes(): Array<Demande> {
    return this.service.selectes;
  }

  set selectes(value: Array<Demande>) {
    this.service.selectes = value;
  }














}
