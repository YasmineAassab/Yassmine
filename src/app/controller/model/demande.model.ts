import {Societe} from "./societe.model";
import {User} from "../../Security/model/user.model";
import {Comptable} from "./comptable.model";
import {EtatDemande} from "./etat-demande.model";

export class Demande {
    public id: number;
    public ref: string;
    public operation: string;
    public annee: number;
    public mois: number;
    public trimestre: number;
    public dateDemande: string;
    public societe = new Societe();
    public user = new User();
    public comptableTraiteur = new Comptable();
    public comptableValidateur = new Comptable();
    public etatDemande = new EtatDemande();
}
