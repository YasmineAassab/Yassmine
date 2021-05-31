import { Component, OnInit } from '@angular/core';
import {DeclarationIrService} from '../../controller/service/declaration-ir.service';
import {CategorieService} from '../../controller/model/categorie-service.model';


@Component({
  selector: 'app-our-service',
  templateUrl: './our-service.component.html',
  styleUrls: ['./our-service.component.scss', './our-service.component.css']
})
export class OurServiceComponent implements OnInit {

  constructor(private service: DeclarationIrService) { }


  get categorieServices(): Array<CategorieService> {

    return this.service.categorieServices;
  }

  ngOnInit(): void {
    this.service.findCard();
  }

}
