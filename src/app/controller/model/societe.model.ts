import {DeclarationIR} from './declaration-ir.model';
import {Employe} from './employe.model';

export class Societe {
  public id: number;
  public ice: string;
  public adresse: string;
  public raisonSociale: string;
  public dateCreation: string;
  public anneeExploitation: number;
  public age: number;
  public dateDeclaration: Date;
  public nom:string;
  public DeclarationIRs: Array<DeclarationIR>;
  public  employes: Array<Employe>;



}
