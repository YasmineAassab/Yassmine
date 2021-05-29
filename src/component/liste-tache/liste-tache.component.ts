import {Component, OnInit} from '@angular/core';
import {TacheService} from '../../controller/service/tache.service';
import {GroupeTache} from '../../controller/model/groupe-tache.model';
import {GroupeTacheService} from '../../controller/service/groupe-tache.service';
import {Tache} from '../../controller/model/tache.model';

@Component({
  selector: 'app-liste-tache',
  templateUrl: './liste-tache.component.html',
  styleUrls: ['./liste-tache.component.css']
})
export class ListeTacheComponent implements OnInit {

  constructor(private tacheService: TacheService,
              private groupeTacheService: GroupeTacheService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  findTacheByGroupe(groupe: GroupeTache) {
    this.tacheService.findTachesByGroupe(groupe);
  }

  get taches(): Array<Tache> {
    return this.tacheService.taches;
  }

}


