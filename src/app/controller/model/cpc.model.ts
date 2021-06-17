import {Facture} from './facture.model';
import {CpcFacture} from './cpc-facture.model';

export class Cpc {
    public id: number;
    public totalProdEx: number;
    public totalChargEx: number;
    public totalProdFin: number;
    public totalChargFin: number;
    public totalProdNCour: number;
    public totalChargNCour: number;
    public dateMinCpc: Date;
    public dateMaxCpc: Date;
    //public factureList = new Array<Facture>();
    public cpcFactures = new Array<CpcFacture>();
}
