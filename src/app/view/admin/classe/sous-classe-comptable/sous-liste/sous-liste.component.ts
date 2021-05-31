import { Component, OnInit } from '@angular/core';
import {SousClasseComptableService} from "../../../../../Controller/Service/sousClasseComptable.service";
import {SousClasseComptable} from "../../../../../Controller/Model/sousClasseComptable.model";
import {ClasseComptableService} from "../../../../../Controller/Service/classeComptable.service";
import {CompteComptableService} from "../../../../../Controller/Service/compteComptable.service";

@Component({
  selector: 'app-sous-liste',
  templateUrl: './sous-liste.component.html',
  styleUrls: ['./sous-liste.component.scss']
})
export class SousListeComponent implements OnInit {
  cols: any[];
    // tslint:disable-next-line:max-line-length
  constructor(private service: ClasseComptableService , private service2: CompteComptableService , private service3: SousClasseComptableService) { }

  ngOnInit(): void {
  }
 /* public getAll(){
    return this.service.findByNumeo(this.service.num).subscribe(
        data => {console.log(data);
                 this.items = data;
        }, error  => {
          console.log(error);
        }
    );
  }*/
  private initCol() {
    this.cols = [
      {field: 'Sous classe Comptable', header: 'Sous classe Comptable'},
      {field: 'action', header: 'Action'}
    ];
  }
  get items(): Array<SousClasseComptable> {
    return this.service.items2;
  }

  set items(value: Array<SousClasseComptable>) {
    this.service.items2 = value;
  }

 public find(numero: number) {
    this.service2.find(numero).subscribe(
        data => {console.log(data);
                 this.service2.items = data;
        }, error  => {
          console.log(error);
        }
    );
  }

    delete(numero: number) {
        return this.service3.delete(numero).subscribe(
            data => {
                console.log(data);
            }
        );
    }

    openCreate() {
        this.service3.createDialog = true;
    }
    get num2(): number {
        return this.service2.num2;
    }

    set num2(value: number) {
        this.service2.num2 = value;
    }
}
