import {Societe} from "./societe.model";
import {User} from "../../Security/model/user.model";

export class Demande {
    public id: number;
    public ref: string;
    public operation: string;
    public annee: number;
    public mois: number;
    public dateDemande: string;
    public societe: Societe;
    public user: User;
}
