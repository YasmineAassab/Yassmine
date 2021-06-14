import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {FactureService} from '../../../../controller/service/facture.service';
import {Facture} from '../../../../controller/model/facture.model';

@Component({
    selector: 'app-facture-edit',
    templateUrl: './facture-edit.component.html',
    styleUrls: ['./facture-edit.component.scss']
})
export class FactureEditComponent implements OnInit {
    constructor(private messageService: MessageService, private service: FactureService) {
    }

    ngOnInit(): void {
    }

    public edit() {
        this.submitted = true;
        if (this.selected.ref.trim()) {
            if (this.selected.id) {
                this.items[this.service.findIndexById(this.selected.id)] = this.selected;
                this.service.edit().subscribe(data => {
                    this.selected = data;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Facture Updated',
                        life: 3000
                    });
                });
            }
            this.editDialog = false;
            this.selected = new Facture();
        }
    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    get selected(): Facture {
        return this.service.selected;
    }

    set selected(value: Facture) {
        this.service.selected = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
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
