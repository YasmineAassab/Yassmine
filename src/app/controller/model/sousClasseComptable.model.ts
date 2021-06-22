import {CompteComptable} from './compteComptable.model';
import {ClasseComptable} from './classeComptable.model';

export class SousClasseComptable {
  public id: number;
  public numero: number;
  public libelle: string;
  public classeComptable: ClasseComptable;
  public listeCompteComptable = new Array<CompteComptable> ();

}
