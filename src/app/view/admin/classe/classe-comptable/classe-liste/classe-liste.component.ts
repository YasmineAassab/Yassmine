import { Component, OnInit } from '@angular/core';
import {ClasseComptable} from '../../../../../controller/model/classeComptable.model';
import {CompteComptableService} from '../../../../../controller/service/compteComptable.service';
import {ClasseComptableService} from '../../../../../controller/service/classeComptable.service';

@Component({
  selector: 'app-classe-liste',
  templateUrl: './classe-liste.component.html',
  styleUrls: ['./classe-liste.component.scss']
})
export class ClasseListeComponent implements OnInit {

  constructor(private service: ClasseComptableService , private service2: CompteComptableService) { }
  cols: any[];
  ngOnInit(): void {
    this.getAll();
  }
  private initCol() {
    this.cols = [
      {field: 'classe comptable', header: 'Classe Comptable'},
      {field: 'action', header: 'Action'}
    ];
  }
  public getAll(){
    return this.service.getAll().subscribe(
        data => {console.log(data);
          this.service.items = data;
        }, error  => {
          console.log(error);
        }
    );
  }
  get num(): number {
    return this.service.num1;
  }

  set num(value: number) {
    this.service.num1 = value;
  }
  get create(): number {
    return this.service.create;
  }

  set create(value: number) {
    this.service.create = value;
  }
  get create2(): number {
    return this.service.create2;
  }

  set create2(value: number) {
    this.service.create2 = value;
  }
  get items(): Array<ClasseComptable> {
    return this.service.items;
  }

  set items(value: Array<ClasseComptable>) {
    this.service.items = value;
  }

  findByNumero(numero: number) {
    this.service.findByNumeo(numero).subscribe(
        data => {console.log(data);
          this.service.items2 = data;
          this.service2.items = null;
          this.create = this.num;
          this.create2 = null;
        }, error  => {
          console.log(error);
        }
    );
  }

  delete(numero: number) {
    return this.service.delete(numero).subscribe(
        data => {
          console.log(data);
          this.getAll();
          this.service.items2 = null;
        }
    );
  }
  public openCreate() {
    this.service.createDialog = true;
  }

}
