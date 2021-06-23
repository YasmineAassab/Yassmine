import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {FactureService} from '../../../../controller/service/facture.service';
import {Facture} from '../../../../controller/model/facture.model';

@Component({
    selector: 'app-facture-create',
    templateUrl: './facture-create.component.html',
    styleUrls: ['./facture-create.component.scss']
})
export class FactureCreateComponent implements OnInit {

    constructor(private messageService: MessageService, private service: FactureService) {
    }

    ngOnInit(): void {
    }

    public hideCreateDialog() {
        this.createDialog = false;
        this.submitted = false;
    }

    public save() {
        this.submitted = true;
        if (this.selected.ref.trim()) {
            this.service.save().subscribe(data => {
                if (data > 0){
                    console.log(this.selected);
                    this.items.push({...this.selected});
                    console.log(this.items);
                    this.selected = new Facture();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'facture Created',
                        life: 3000
                    });
                }
            });
            this.createDialog = false;
        }
    }

    get selected(): Facture {
        return this.service.selected;
    }

    set selected(value: Facture) {
        this.service.selected = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get items(): Array<Facture> {
        return this.service.items;
    }

    set items(value: Array<Facture>) {
        this.service.items = value;
    }


}
