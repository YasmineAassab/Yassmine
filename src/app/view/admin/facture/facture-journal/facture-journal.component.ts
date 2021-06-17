import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FactureService} from '../../../../controller/service/facture.service';
import {MessageService} from 'primeng/api';
import {FactureVo} from '../../../../controller/model/facture-vo.model';
import {Facture} from '../../../../controller/model/facture.model';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-facture-journal',
  templateUrl: './facture-journal.component.html',
  styleUrls: ['./facture-journal.component.scss']
})
export class FactureJournalComponent implements OnInit {

  constructor(private service: FactureService, private messageService: MessageService) { }

  ngOnInit(): void {
  }
  public journal() {
    this.service.Journal().subscribe(data => {
      this.facturesJournal = data;
    });
    this.createDialog = false;
  }
  get facturesJournal(): Array<Facture> {
    return this.service.facturesJournal;
  }

  get facturevo(): FactureVo {
    return this.service.facturevo;
  }
  set facturevo(value: FactureVo) {
    this.service.facturevo = value;
  }

  set facturesJournal(value: Array<Facture>) {
    this.service.facturesJournal = value;
  }
  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }


  title = 'htmltopdf';

  @ViewChild('pdfTable') pdfTable: ElementRef;

  public downloadAsPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = {content: html};
    pdfMake.createPdf(documentDefinition).open();

  }


}
