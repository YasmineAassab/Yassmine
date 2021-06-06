import { Component, OnInit } from '@angular/core';
import {DeclarationISService} from "../../../controller/service/declaration-is.service";
import {DeclarationIS} from "../../../controller/model/declaration-is.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  basicData: any;
  basicOptions: any;
  multiAxisData: any;
  chartOptions: any;
  multiAxisOptions: any;
  stackedOptions: any;
  subscription: Subscription;
  options: any;

  public annee: number;
  public labels = new Array<string>();
  public data1 = new Array<number>();
  public data2 = new Array<number>();

  constructor(private service: DeclarationISService, private router: Router) { }

  public return(){
    this.router.navigateByUrl('demande/list');
  }

  public findAll(){
    this.service.findAll().subscribe(data => {
          this.items = data;
          for (var i=0; i < this.items.length; i++){
            if (this.items[i].annee == this.annee){
              this.labels.push(this.items[i].societe.raisonSociale + ' [' + this.items[i].societe.ice + ']' );
              this.data1.push(this.items[i].totalHTGain);
              this.data2.push(this.items[i].totalHTCharge);
            }
          }
        }
    );
  }

  ngOnInit() {

    this.basicData = {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      labels: this.labels,
      datasets: [
        {
          label: 'Total hors taxe gain',
          backgroundColor: '#42A5F5',
          //data: [65, 59, 80, 81, 56, 55, 40]
          data: this.data1
        },
        {
          label: 'Total hors taxe charge',
          backgroundColor: '#FFA726',
          //data: [28, 48, 40, 19, 86, 27, 90]
          data: this.data2
        }
      ]
    };

    this.options = {
      //display labels on data elements in graph
      plugins: {
        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 4,
          backgroundColor: 'teal',
          color: 'white',
          font: {
            weight: 'bold',
          },
        },
        // display chart title
        title: {
          display: true,
          fontSize: 16,
        },
        legend: {
          position: 'bottom',
        },
      },
    };

  }

  applyDarkTheme() {
    this.basicOptions = {
      legend: {
        labels: {
          fontColor: '#ebedef'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#ebedef'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#ebedef'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }]
      }
    };

    this.stackedOptions.scales.xAxes[0].ticks = {
      fontColor: '#ebedef'
    };
    this.stackedOptions.scales.xAxes[0].gridLines = {
      color: 'rgba(255,255,255,0.2)'
    };
    this.stackedOptions.scales.yAxes[0].ticks = {
      fontColor: '#ebedef'
    };
    this.stackedOptions.scales.yAxes[0].gridLines = {
      color: 'rgba(255,255,255,0.2)'
    };
    this.stackedOptions.legend = {
      labels:  {
        fontColor: '#ebedef'
      }
    };
    this.stackedOptions = {...this.stackedOptions};

    this.multiAxisOptions.scales.xAxes = [{
      ticks: {
        fontColor: '#ebedef'
      },
      gridLines: {
        color: 'rgba(255,255,255,0.2)'
      }
    }
    ];
    this.multiAxisOptions.scales.yAxes[0].ticks = {
      fontColor: '#ebedef'
    };
    this.multiAxisOptions.scales.yAxes[0].gridLines = {
      color: 'rgba(255,255,255,0.2)'
    };
    this.multiAxisOptions.scales.yAxes[1].ticks = {
      fontColor: '#ebedef'
    };
    this.multiAxisOptions.scales.yAxes[1].gridLines = {
      color: 'rgba(255,255,255,0.2)'
    };
    this.multiAxisOptions.legend = {
      labels:  {
        fontColor: '#ebedef'
      }
    };
    this.multiAxisOptions = {...this.multiAxisOptions};
  }



  get items(): Array<DeclarationIS> {
    return this.service.items;
  }

  set items(value: Array<DeclarationIS>) {
    this.service.items = value;
  }


}
