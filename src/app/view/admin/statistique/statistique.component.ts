import { Component, OnInit } from '@angular/core';
import {DemandeService} from '../../../controller/service/demande.service';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {DeclarationIR} from '../../../controller/model/declaration-ir.model';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  basicData: any;
  public myData= new Array<DeclarationIR>();
  totalDeclaration: any;
  basicOptions: any;
  public labels = new Array<string>();
  public data1 = new Array<number>();
  public data2 = new Array<number>();
  constructor(private service: DeclarationIrService) { }


  get searchAnnee(): number {
    return this.service.searchAnnee;
  }

  set searchAnnee(value: number) {
    this.service.searchAnnee = value;
  }
  get searchIce(): string {
    return this.service.searchIce;
  }

  set searchIce(value: string) {
    this.service.searchIce = value;
  }

  public declarationSociete(){
    this.service.declarationSociete().subscribe(
        data =>{
          console.log("************************");
          console.log(data);
         // this.myData=data;
          this.myData = data;
          console.log(this.myData);

          for (var i=0; i < this.myData.length; i++){

             // this.labels.push(this.items[i].societe.raisonSociale + ' [' + this.items[i].societe.ice + ']' );
              this.data1.push(this.myData[i].total);
           //   this.data2.push(this.items[i].totalHTCharge);

          }
 /* for (let i=0;i< myData.length();i++){
    this.basicData.datasets.data.push(this.myData[i].total);

  }*/

        },error => {
          console.log(error);
        }
    );
  }

  ngOnInit(): void {


    this.basicData = {
      /*labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],*/
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: this.data1
        }/*,
        {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
        }*/
      ]
    };

  }

}
