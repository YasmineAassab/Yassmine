import {Cpc} from './cpc.model';
import {Facture} from './facture.model';

export class CpcFacture {
    public id: number;
    public cpc: Cpc;
    public facture: Facture;
    public included: boolean;
}
