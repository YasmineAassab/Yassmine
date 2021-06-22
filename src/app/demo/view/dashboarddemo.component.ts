import {Component, Injectable, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EventService } from '../service/eventservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProductService } from '../service/productservice';
import {DeclarationISService} from "../../controller/service/declaration-is.service";
import {DeclarationIrService} from "../../controller/service/declaration-ir.service";
import {DeclarationTvaService} from "../../controller/service/declaration-tva.service";
import {FactureService} from "../../controller/service/facture.service";
import {DemandeService} from "../../controller/service/demande.service";
import {TokenStorageService} from "../../Security/_services/token-storage.service";
import {SocieteService} from "../../controller/service/societe.service";
import {ComptableService} from "../../controller/service/comptable.service";
import {AcomptesService} from "../../controller/service/acomptes.service";
import {Societe} from "../../controller/model/societe.model";
import {Acomptes} from "../../controller/model/acomptes.model";

@Injectable({
    providedIn: 'root',
})

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./tabledemo.scss']
})
export class DashboardDemoComponent implements OnInit {

    nbrFact: number;
    nbrIs: number;
    nbrIr: number;
    nbrTva: number;
    nbrDemande: number;
    nbrcpt: number;
    nbrste: number;
    nbracomptes: number;

    societeDialog: boolean;
    submitted: boolean;
    societe: Societe;

    data: any;

    products: any[];

    tauxis: any[];
    tauxir: any[];

    items: MenuItem[];

    chartData: any;

    chartOptions: any;

    events: any[];

    fullcalendarOptions: any;

    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username: string;
    roleUser: string;
    admin = false;
    cpt = false;
    ste = false;

    constructor(private eventService: EventService, private productService: ProductService,
                private serviceIS: DeclarationISService, private serviceIR: DeclarationIrService, private serviceTVA: DeclarationTvaService,
                private serviceFact: FactureService, private serviceDem: DemandeService,
                private servSte: SocieteService, private servCpt: ComptableService, private servacompt: AcomptesService,
                private tokenStorageService: TokenStorageService) {

        this.data = {
            labels: ['Industrie', 'Services aux entreprises', 'Commerce, réparations automobile et d\'articles domestiques', 'Bâtiment et travaux publics', 'Transports et communications',
                'Activités financières', 'Services collectifs, sociaux et personnels', 'Hôtels et restaurants'],
            datasets: [
                {
                    data: [52, 18, 12, 9, 6, 1, 1, 1],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#1f8d66",
                        "#a45dd6",
                        "orange",
                        "#054e0d",
                        "#ff6384",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#1f8d66",
                        "#a45dd6",
                        "orange",
                        "#054e0d",
                        "#ff6384",
                    ]
                }]
        };
    }

    ngOnInit() {

        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_COMPTABLE');

            this.username = user.username;
            if (user.roles[0] == 'ROLE_ADMIN'){
                this.roleUser = 'ADMIN';
                this.admin = true;
            }
            if (user.roles[0] == 'ROLE_COMPTABLE'){
                this.roleUser = 'COMPTABLE';
                this.cpt = true;
            }
            if (user.roles[0] == 'ROLE_SOCIETE'){
                this.roleUser = 'SOCIÉTÉ';
                this.ste = true;
            }
        }

        this.serviceDem.findAll().subscribe( data =>{
            this.nbrDemande = data.length;
            console.log('nbr demandes' + this.nbrDemande);
        })
        this.serviceIS.findAll().subscribe( data =>{
            this.nbrIs = data.length;
            console.log('nbr IS' + this.nbrIs);
        })

        this.serviceIR.findAll().subscribe( data =>{
            this.nbrIr = data.length;
            console.log('nbr Ir' + this.nbrIr);
        })

        this.serviceTVA.findAll().subscribe( data =>{
            this.nbrTva = data.length;
            console.log('nbr TVA' + this.nbrTva);
        })

        this.serviceIS.findAll().subscribe( data =>{
            this.nbrFact = data.length;
            console.log('nbr facture' + this.nbrFact);
        })
        this.servSte.findAll().subscribe( data =>{
            this.nbrste = data.length;
            console.log('nbr ste' + this.nbrste);
        })
        this.servCpt.findAll().subscribe( data =>{
            this.nbrcpt = data.length;
            console.log('nbr facture' + this.nbrcpt);
        })
        this.servacompt.findAll().subscribe( data =>{
            this.nbracomptes = data.length;
            console.log('nbr facture' + this.nbrcpt);
        })

        this.productService.getProducts().then(data => this.products = data);

        this.tauxis = [
            {beneficeMin: '0.00', beneficeMax: '300 000.00', taux: '10%'},
            {beneficeMin: '300 001.00', beneficeMax: '1 000 000.00', taux: '20%'},
            {beneficeMin: '1 000 001.00', beneficeMax: '+', taux: '30%'},
        ];
        this.tauxir = [
            {salMin: '0.00', salMax: '2 500.00', taux: '0%'},
            {salMin: '2 501.00', salMax: '4 166.00', taux: '10%'},
            {salMin: '4 167.00', salMax: '5 000.00', taux: '20%'},
            {salMin: '5 001.00', salMax: '6 666.00', taux: '30%'},
        ];

        this.items = [
            { label: 'Save', icon: 'pi pi-check' },
            { label: 'Update', icon: 'pi pi-refresh' },
            { label: 'Delete', icon: 'pi pi-trash' },
        ];

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3, 9],
                borderColor: [
                    '#0F97C7',
                ],
                borderWidth: 3,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 3
            }, {
                label: 'Income',
                data: [1, 2, 5, 3, 12, 7, 15],
                backgroundColor: [
                    'rgba(187,222,251,0.2)',
                ],
                borderColor: [
                    '#578697',
                ],
                borderWidth: 3,
                fill: true
            },
                {
                    label: 'Expenses',
                    data: [7, 12, 15, 5, 3, 13, 21],
                    borderColor: [
                        '#1BA7AF',
                    ],
                    borderWidth: 3,
                    fill: false,
                    pointRadius: [4, 6, 4, 12, 8, 0, 4]
                },
                {
                    label: 'New Users',
                    data: [3, 7, 2, 17, 15, 13, 19],
                    borderColor: [
                        '#E2841A',
                    ],
                    borderWidth: 3,
                    fill: false
                }]
        };

        this.chartOptions = {
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        };

        this.eventService.getEvents().then(events => { this.events = events; });

        this.fullcalendarOptions = {
            plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: '2017-02-12',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true
        };

        this.servSte.findAll().subscribe( data => this.itemsSte = data);
    }

    goToHome(){
        document.getElementById("header").scrollIntoView({behavior: "smooth"});
    }

    viewSociete(selected: Societe) {
        this.societe = {...selected};
        this.societeDialog = true;
    }

    hideDialog() {
        this.societeDialog = false;
        this.submitted = false;
    }

    get itemsSte(): Array<Societe> {
        return this.servSte.items;
    }
    set itemsSte(value: Array<Societe>) {
        this.servSte.items = value;
    }
}
