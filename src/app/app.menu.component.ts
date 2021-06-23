import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import {TokenStorageService} from "./Security/_services/token-storage.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.css'],
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

    modelAdmin: any[];
    modelCpt: any[];
    modelSociete: any[];
    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username: string;
    roleUser: string;
    admin = false;
    cpt = false;
    ste = false;

    constructor(public app: AppComponent, public appMain: AppMainComponent, private tokenStorageService: TokenStorageService) {
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

        this.modelAdmin = [
            {
                label: 'Home', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Page d\'accueil', icon: 'pi pi-fw pi-home', routerLink: ['/home']}
                ]
            },
            {
                label: 'Demandes', icon: 'pi pi-fw pi-inbox',
                items: [
                    {
                        label: 'Liste des demandes', icon: 'pi pi-fw pi-list', routerLink: ['demandes']
                    },
                ]
            },
            {
                label: 'Factures', icon: 'bi bi-clipboard-check',
                items: [
                    {label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['facture']},
                    {label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['/home']},
                    {label: 'Journal', icon: 'bi bi-journals', routerLink: ['/home']},
                ]
            },
            {
                label: 'Déclarations IS', icon: 'bi bi-file-earmark-check-fill',
                items: [
                    {
                        label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['declarations-is/create'],
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
                label: 'Acomptes', icon: 'bi bi-cash-coin',
                items: [
                    {label: 'Liste des acomptes', icon: 'pi pi-fw pi-list', routerLink: ['acomptes/list']},
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
                label: 'Plan comptable', icon: 'pi pi-fw pi-slack',
                items: [
                    {label: 'Plan comptable', icon: 'pi pi-fw pi-check', routerLink: ['/home']},
                ]
            },
            {
                label: 'CPC', icon: 'pi pi-fw pi-dollar',
                items: [
                    {label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['/home']},
                    {label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['/home']},
                    {label: 'Statistiques', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home']},
                ]
            },
            {
                label: 'Paiement', icon: 'pi pi-fw pi-dollar',
                items: [
                    {label: 'Liste des paiements', icon: 'pi pi-fw pi-plus', routerLink: ['paiement/list']},
                ]
            },
        ];
        this.modelCpt = [
            {
                label: 'Home', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Page d\'accueil', icon: 'pi pi-fw pi-home', routerLink: ['/home']}
                ]
            },
            {
                label: 'Demandes', icon: 'pi pi-fw pi-inbox',
                items: [

                    {
                        label: 'Traitement des demandes', icon: 'pi pi-fw pi-list', routerLink: ['demande/list']
                    },
                    {
                        label: 'Validation des demandes', icon: 'pi pi-fw pi-list', routerLink: ['validation']
                    },
                ]
            },
            {
                label: 'Factures', icon: 'bi bi-clipboard-check',
                items: [
                    {label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['facture']},
                    {label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['/home']},
                    {label: 'Journal', icon: 'bi bi-journals', routerLink: ['/home']},
                ]
            },
            {
                label: 'Déclarations IS', icon: 'bi bi-file-earmark-check-fill',
                items: [
                    {
                        label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['declarations-is/create'],
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
                    {label: 'Plan comptable', icon: 'pi pi-fw pi-check', routerLink: ['/home']},
                ]
            },
            {
                label: 'CPC', icon: 'pi pi-fw pi-dollar',
                items: [
                    {label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['/home']},
                    {label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['/home']},
                    {label: 'Statistiques', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home']},
                ]
            },
        ];
        this.modelSociete = [
            {
                label: 'Home', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Page d\'accueil', icon: 'pi pi-fw pi-home', routerLink: ['/home']}
                ]
            },
            {
                label: 'Demandes', icon: 'pi pi-fw pi-inbox',
                items: [
                    {
                        label: 'Demandes', icon: 'pi pi-fw pi-list',
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
                    {label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['/home']},
                    {label: 'Journal', icon: 'bi bi-journals', routerLink: ['/home']},
                ]
            },
            {
                label: 'Déclarations IS', icon: 'bi bi-file-earmark-check-fill',
                items: [
                    {
                        label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['declarations-is/list'],
                    },
                ]
            },
            {
                label: 'Déclarations IR', icon: 'bi bi-file-earmark-check-fill',
                items: [
                    {
                        label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['declaration-ir/list']
                    },
                ]
            },
            {
                label: 'Déclarations TVA', icon: 'bi bi-file-earmark-check-fill',
                items: [
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
                    {label: 'Plan comptable', icon: 'pi pi-fw pi-check', routerLink: ['/home']},
                ]
            },
            {
                label: 'CPC', icon: 'pi pi-fw pi-dollar',
                items: [
                    {label: 'Créer', icon: 'pi pi-fw pi-plus', routerLink: ['/home']},
                    {label: 'Rechercher', icon: 'pi pi-fw pi-search', routerLink: ['/home']},
                    {label: 'Statistiques', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home']},
                ]
            },
        ];
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
