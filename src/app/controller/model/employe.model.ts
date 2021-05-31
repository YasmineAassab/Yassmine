import {Societe} from './societe.model';

export class Employe {
  public id:number;
  public cin:string;
  public nom:string;
  public prenom:string;
  public salaire:number;
  public societeEmp:Societe;
}
