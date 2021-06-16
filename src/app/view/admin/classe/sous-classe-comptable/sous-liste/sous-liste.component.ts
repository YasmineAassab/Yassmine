import { Component, OnInit } from '@angular/core';
import {SousClasseComptable} from '../../../../../controller/model/sousClasseComptable.model';
import {ClasseComptableService} from '../../../../../controller/service/classeComptable.service';
import {CompteComptableService} from '../../../../../controller/service/compteComptable.service';
import {SousClasseComptableService} from '../../../../../controller/service/sousClasseComptable.service';

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
  get create(): number {
    return this.service.create;
  }

  public find(numero: number) {
    this.service2.find(numero).subscribe(
        data => {console.log(data);
          this.service2.items = data;
          this.create2 = this.num2;
        }, error  => {
          console.log(error);
        }
    );
  }

  delete(numero: number) {
    return this.service3.delete(numero).subscribe(
        data => {
          console.log(data);
          this.service2.items = null;
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
  get create2(): number {
    return this.service.create2;
  }

  set create2(value: number) {
    this.service.create2 = value;
  }
}
