import {DeclarationIS} from "./declaration-is.model";
import {DeclarationTva} from "./declaration-tva.model";
import {DeclarationIR} from "./declaration-ir.model";

export class Paiement2 {
    public id: number;
    public ref: string;
    public datePaiement: Date;
    public total: number;
    public montantCptTraiteur: number;
    public montantCptValidateur: number;
    public reste: number;
    public declarationIS = new DeclarationIS();
    public declarationTva = new DeclarationTva();
    public declarationIR = new DeclarationIR();
}
