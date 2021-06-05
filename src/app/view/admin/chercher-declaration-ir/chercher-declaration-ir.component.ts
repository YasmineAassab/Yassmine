import { Component, OnInit } from '@angular/core';
import {DeclarationIrService} from '../../../controller/service/declaration-ir.service';
import {DeclarationIR} from '../../../controller/model/declaration-ir.model';
import {DeclarationIREmploye} from '../../../controller/model/declaration-iremploye.model';

@Component({
  selector: 'app-chercher-declaration-ir',
  templateUrl: './chercher-declaration-ir.component.html',
  styleUrls: ['./chercher-declaration-ir.component.scss']
})
export class ChercherDeclarationIRComponent implements OnInit {
  searched:boolean=false;
  moiMin: number;
  moisMax: number;
  annee: number;
  searchItems= new Array<DeclarationIR>();
  searchItemsEmploye= new Array<DeclarationIREmploye>();
  constructor(private service: DeclarationIrService) { }
  search(annee:number,moiMin:number,moisMax:number){
  this.service.search(annee, moiMin, moisMax).subscribe(
      data=>{
        this.searchItems=data;

      }
  );
  }

  details(declaration: DeclarationIR){

  this.service.details(declaration).subscribe(
      data=>{
        this.searched=true;
        this.searchItemsEmploye=data;
        console.log(data);

      },error => {
        console.log(error);
      }
  );
  }

  get selected(): DeclarationIREmploye {

    return this.service.selected;
  }

  set selected(value: DeclarationIREmploye) {
    this.service.selected = value;
  }


  ngOnInit(): void {
  }


  get declarationIRSearch(): DeclarationIR {

    return this.service.declarationIRSearch;
  }

  set declarationIRSearch(value: DeclarationIR) {
    this.service.declarationIRSearch = value;
  }

}
