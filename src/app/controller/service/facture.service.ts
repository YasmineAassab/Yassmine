import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Facture} from '../model/facture.model';
import {FactureVo} from '../model/facture-vo.model';

@Injectable({
    providedIn: 'root'
})
export class FactureService {
    private url = 'http://localhost:8036/gestion-comptabilite/facture/';
    private _items: Array<Facture>;
    private _facturesJournal: Array<Facture>;
    private _facturevo: FactureVo;
    private _Sommes: FactureVo;
    private _selected: Facture;
    private _selectes: Array<Facture>;

    private _createDialog: boolean;
    private _editDialog: boolean;
    private _viewDialog: boolean;
    private _submitted: boolean;


    // constructor(private messageService: MessageService,
    //             private confirmationService: ConfirmationService, private http: HttpClient) {
    // }
    constructor(private http: HttpClient) {
    }

    public findAll(): Observable<Array<Facture>> {
        return this.http.get<Array<Facture>>(this.url);
    }
    public Journal(): Observable<Array<Facture>> {
        return this.http.post<Array<Facture>>('http://localhost:8036/gestion-comptabilite/facture/MultiTache', this.facturevo);
    }
    public CalculSomme(): Observable<FactureVo> {
        return this.http.post<FactureVo>(this.url + '/CalculSomme', this.facturevo);
    }

    public save(): Observable<Facture> {
        return this.http.post<Facture>(this.url, this.selected);
    }

    public edit(): Observable<Facture> {
        return this.http.put<Facture>(this.url, this.selected);
    }

    public deleteByReference(): Observable<number> {
        return this.http.delete<number>(this.url + 'ref/' + this.selected.ref);
    }

    public deleteMultipleByReference(): Observable<number> {
        return this.http.post<number>(this.url + 'delete-multiple-by-reference', this.selectes);
    }

    public findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public deleteIndexById(id: number) {
        this.items.splice(this.findIndexById(id), 1);
    }

    public deleteMultipleIndexById() {
        for (const item of this.selectes) {
            this.deleteIndexById(item.id);
        }
    }

    get items(): Array<Facture> {
        return this._items;
    }

    set items(value: Array<Facture>) {
        this._items = value;
    }

    get selected(): Facture {
        if (this._selected == null) {
            this._selected = new Facture();
        }
        return this._selected;
    }


    get facturesJournal(): Array<Facture> {
        if (this._facturesJournal == null) {
            this._facturesJournal = new Array<Facture>();
        }
        return this._facturesJournal;
    }

    set facturesJournal(value: Array<Facture>) {
        this._facturesJournal = value;
    }


    get facturevo(): FactureVo {
        if (this._facturevo == null) {
            this._facturevo = new FactureVo();
        }
        return this._facturevo;
    }

    set facturevo(value: FactureVo) {
        this._facturevo = value;
    }


    get Sommes(): FactureVo {
        if (this._Sommes == null) {
            this._Sommes = new FactureVo();
        }
        return this._Sommes;
    }

    set Sommes(value: FactureVo) {
        this._Sommes = value;
    }

    set selected(value: Facture) {
        this._selected = value;
    }

    get selectes(): Array<Facture> {
        return this._selectes;
    }

    set selectes(value: Array<Facture>) {
        this._selectes = value;
    }


    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }

}
