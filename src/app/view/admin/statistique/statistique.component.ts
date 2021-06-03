import { Component, OnInit } from '@angular/core';
import {DemandeService} from '../../../controller/service/demande.service';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  basicData: any;
  myData: any;
  totalDeclaration: any;
  basicOptions: any;
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
        data=>{
          console.log(data);
          this.myData=data;
          console.log(this.myData);
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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
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
