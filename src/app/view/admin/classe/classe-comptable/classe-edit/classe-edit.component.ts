import { Component, OnInit } from '@angular/core';
import {ClasseComptableService} from '../../../../../controller/service/classeComptable.service';

@Component({
  selector: 'app-classe-edit',
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.scss']
})
export class ClasseEditComponent implements OnInit {

  constructor(private service: ClasseComptableService) { }

  ngOnInit(): void {
  }

}
