import {Societe} from "./societe.model";

export class Acomptes {
    public id: number;
    public numero: number;
    public annee: number;
    public montant: number;
    public societe = new Societe();
}
