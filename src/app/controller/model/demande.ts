import {Societe} from './societe.model';

export class Demande {
    public id:number;
    public ref:string;
    public operation:string;
    public mois:string;
    public annee:string;
    public societe: Societe;
}
