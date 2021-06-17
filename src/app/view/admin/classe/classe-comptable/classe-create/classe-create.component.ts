import { Component, OnInit } from '@angular/core';
import {ClasseComptable} from '../../../../../controller/model/classeComptable.model';
import {ClasseComptableService} from '../../../../../controller/service/classeComptable.service';

@Component({
  selector: 'app-classe-create',
  templateUrl: './classe-create.component.html',
  styleUrls: ['./classe-create.component.scss']
})
export class ClasseCreateComponent implements OnInit {
  constructor(private service: ClasseComptableService) { }

  ngOnInit(): void {
  }
  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }
  get selected(): ClasseComptable {
    if (this.service.selected ==  null){
      this.service.selected = new ClasseComptable();
    }
    return this.service.selected;
  }

  set selected(value: ClasseComptable) {
    this.service.selected = value;
  }

  save() {
    return this.service.save(this.selected).subscribe(
        data => {console.log(data);
          this.getAll();
          this.selected = null;
        }
    );
  }
  public getAll(){
    return this.service.getAll().subscribe(
        data => {console.log(data);
          this.service.items = data;
        }, error  => {
          console.log(error);
        }
    );
  }
}
