import {Societe} from "./societe.model";

export class Acomptes {
    public id: number;
    public numero: number;
    public anneePaye: number;
    public montant: number;
    public societe = new Societe();
}
