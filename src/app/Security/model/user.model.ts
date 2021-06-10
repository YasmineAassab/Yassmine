import {Societe} from '../../controller/model/societe.model';
import {Comptable} from '../../controller/model/comptable.model';

export class User {
  public username:string;
  public password:string;
  public email:string;
  public role:string;
  public roles: Array<any>;
  public societe:Societe;
  public comptable:Comptable;

}
