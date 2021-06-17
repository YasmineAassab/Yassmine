import { Component, OnInit } from '@angular/core';
import {CpcService} from '../../../../controller/service/cpc.service';
import {Cpc} from '../../../../controller/model/cpc.model';

@Component({
  selector: 'app-cpc-chart',
  templateUrl: './cpc-chart.component.html',
  styleUrls: ['./cpc-chart.component.scss']
})
export class CpcChartComponent implements OnInit {
  basicData: any;
  prod = new Array<number>();
  charg = new Array<number>();
  private _items: Array<Cpc>;
  constructor(private service: CpcService) { }

  ngOnInit(): void {
this.findCpc();
  }
  public findCpc(){
    return this.service.findAll().subscribe(
        data => {console.log(data);
           this.items = data;
          console.log(data);
          this.fill();
        }, error => {
          console.log('erreur');
        }
    );
  }
  public fill(){
    let prod: Array<number>;
    prod = new Array<number>();
    let charg: Array<number>;
    charg = new Array<number>();
    this.items.forEach(function(item){
      let prod1: number = 0;
      let charg1: number = 0;
      item.cpcFactures.forEach(function(item){
        if (item.facture.compteComptable.sousClasseComptable.classeComptable.numero ===  7){
          prod1 += item.facture.montantHorsTaxe;
        }
        if (item.facture.compteComptable.sousClasseComptable.classeComptable.numero === 6){
          charg1 += item.facture.montantHorsTaxe;
        }
      });
      prod.push(prod1);
      charg.push(charg1);
    });
    this.prod = prod;
    this.charg = charg;
    this.basicData = {
      labels: ['Cpc1', 'Cpc2' , 'Cpc3' , 'Cpc4' , 'Cpc5'] ,
      datasets: [
        {
          label: 'Les Produits',
          backgroundColor: '#42A5F5',
          data: [ this.prod[this.prod.length - 5], this.prod[this.prod.length - 4], this.prod[this.prod.length - 3], this.prod[this.prod.length - 2], this.prod[this.prod.length - 1]]
        },
        {
          label: 'Les Charges',
          backgroundColor: '#FFA726',
          data: [this.charg[this.charg.length - 5], this.charg[this.charg.length - 4], this.charg[this.charg.length - 3], this.charg[this.charg.length - 2], this.charg[this.charg.length - 1]]
        }
      ]
    };
  }
  get items(): Array<Cpc> {
    if (this._items == null){
      this._items = new Array<Cpc>();
    }
    return this._items;
  }

  set items(value: Array<Cpc>) {
    this._items = value;
  }
}
