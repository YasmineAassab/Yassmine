import {Facture} from "./facture.model";

export class DeclarationTvaVo2 {
  public listfacturevente = new Array<Facture>();
  public listfactureachat = new Array<Facture>();
  public tvacollecter: number;
  public tvadeductible: number;
  public differencetva: number;

}
