import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import {TokenStorageService} from "./Security/_services/token-storage.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    animations: [
        trigger('inline', [
            state('hidden', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*',
            })),
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuComponent implements OnInit {

    model: any[];
    isLoggedIn = false;

    constructor(public app: AppComponent, public appMain: AppMainComponent, private tokenStorageService: TokenStorageService) { }

    ngOnInit() {

        this.isLoggedIn = !!this.tokenStorageService.getToken();

        this.model = [
            {
                label: 'Home', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            {
                label: 'Demandes', icon: 'pi pi-fw pi-inbox',
                items: [
                    {
                        label: 'Liste des demandes - a', icon: 'pi pi-fw pi-list', routerLink: ['demandes']
                    },
                    {
                        label: 'Liste des demandes - c', icon: 'pi pi-fw pi-list', routerLink: ['demande/list']
                    },
                    {
                        label: 'demandes - s', icon: 'pi pi-fw pi-list',
                        items: [
                            {
                                label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['demande']
                            },
                            {
                                label: 'Visualisation', icon: 'pi pi-fw pi-search', routerLink: ['vis']
                            }
                        ]
                    },
                ]
            },
            {
                label: 'Factures', icon: 'bi bi-clipboard-check',
                items: [
                    {label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['facture']},
                    {label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['/']},
                    {label: 'Journal', icon: 'bi bi-journals', routerLink: ['/']},
                ]
            },
            {
                label: 'Déclarations IS', icon: 'bi bi-file-earmark-check-fill',
                items: [
                    {
                        label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['/declarations-is/create'],
                    },
                    {
                        label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['declarations-is/list'],
                    },
                    {
                        label: 'Statistiques', icon: 'pi pi-fw pi-chart-bar', routerLink: ['declarations-is/chart'],
                    },
                ]
            },
            {
                label: 'Déclarations IR', icon: 'bi bi-file-earmark-check-fill',
                items: [
                    {
                        label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['declaration-ir']
                    },
                    {
                        label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['declaration-ir/list']
                    },
                    {
                        label: 'Statistiques', icon: 'pi pi-fw pi-chart-bar', routerLink: ['statistique'],
                    },
                ]
            },
            {
                label: 'Déclarations TVA', icon: 'bi bi-file-earmark-check-fill',
                items: [
                    {
                        label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['declaration-tva/create']
                    },
                    {
                        label: 'Recherche', icon: 'pi pi-fw pi-search', routerLink: ['declaration-tva']
                    },
                ]

            },
            {
                label: 'Acomptes', icon: 'bi bi-cash-coin',
                items: [
                    {label: 'Liste des acomptes', icon: 'pi pi-fw pi-list', routerLink: ['acomptes/list']},
                ]
            },
            {
                label: 'Plan comptable', icon: 'pi pi-fw pi-slack',
                items: [
                    {label: 'Plan comptable', icon: 'pi pi-fw pi-check', routerLink: ['/']},
                ]
            },
            {
                label: 'CPC', icon: 'pi pi-fw pi-dollar',
                items: [
                    {label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['/']},
                    {label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['/']},
                    {label: 'Statistiques', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/']},
                ]
            },
    ];
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
