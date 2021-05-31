import {TauxIR} from './taux-ir.model';
import {DeclarationIREmploye} from './declaration-iremploye.model';
import {Employe} from './employe.model';

export class Details {
  public id:number;
  public valeur:number;
  public pourcentage:number;
  public montantTrancheRevenu:number;
  public tauxIR: TauxIR;

  public declarationIREmploye: DeclarationIREmploye;


}
