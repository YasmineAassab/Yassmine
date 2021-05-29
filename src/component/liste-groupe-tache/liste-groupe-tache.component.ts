import {Component, OnInit} from '@angular/core';
import {GroupeTacheService} from '../../controller/service/groupe-tache.service';
import {TacheService} from '../../controller/service/tache.service';
import {GroupeTache} from '../../controller/model/groupe-tache.model';

@Component({
  selector: 'app-liste-groupe-tache',
  templateUrl: './liste-groupe-tache.component.html',
  styleUrls: ['./liste-groupe-tache.component.css']
})
export class ListeGroupeTacheComponent implements OnInit {

  constructor(private groupeTacheService: GroupeTacheService,
              private tacheService: TacheService) {
  }

  ngOnInit(): void {
    this.groupeTacheService.findAllGroupeTache();
  }

  get groupeTaches(): Array<GroupeTache> {
    return this.groupeTacheService.groupeTaches;
  }

  findTaches(groupeTache: GroupeTache) {
    this.tacheService.findTachesByGroupe(groupeTache);
  }

  deleteGroupeTache(index: number) {
    this.groupeTacheService.deleteGroupeTache(index);
  }


}
