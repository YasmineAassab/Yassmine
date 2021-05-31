import {Employe} from './employe.model';
import {DeclarationIR} from './declaration-ir.model';
import {Details} from './details.model';

export class DeclarationIREmploye {
  public id:number;
  public refEmp:number;
  public salaireNet:number;
  public salaireBrut:number;
  public montantIR:number;
  public employe:Employe;
  public declarationIR:DeclarationIR;
  public detailsEmploye:Array<Details>;
}
