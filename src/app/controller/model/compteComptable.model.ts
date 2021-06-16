import {SousClasseComptable} from './sousClasseComptable.model';

export class CompteComptable {
  public id: number;
  public code: string;
  public libelle: string;
  public sousClasseComptable: SousClasseComptable;
}
