import {Route, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';

import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppLoginComponent} from './pages/app.login.component';

import {LoginComponent} from './Security/login/login.component';
import {DeclarationsISComponent} from './view/admin/declarations-is/declarations-is.component';
import {DeclarationIsCreateComponent} from './view/admin/declarations-is/declaration-is-create/declaration-is-create.component';
import {DeclarationIsEditComponent} from './view/admin/declarations-is/declaration-is-edit/declaration-is-edit.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DeclarationIrComponent} from './view/admin/declaration-ir/declaration-ir.component';
import {ProfileComponent} from './Security/profile/profile.component';
import {FactureCreateComponent} from './view/admin/facture/facture-create/facture-create.component';
import {FactureComponent} from './view/admin/facture/facture.component';
import {DeclarationTvaListComponent} from "./view/admin/declarationTva/declaration-tva-list/declaration-tva-list.component";
import {ChartsComponent} from "./view/admin/charts/charts.component";
import {DeclarationIsListComponent} from "./view/admin/declarations-is/declaration-is-list/declaration-is-list.component";
import {DemandeDeclarationComponent} from "./view/admin/demande-declaration/demande-declaration.component";
import {ComptableBoardComponent} from "./view/admin/comptable-board/comptable-board.component";
import {DeclarationsComponent} from "./view/admin/declarations/declarations.component";
import {DeclarationTvaCreateComponent} from "./view/admin/declarationTva/declaration-tva-create/declaration-tva-create.component";
import {DemandeListComponent} from "./view/admin/demande-list/demande-list.component";
import {VisualiserDemandeComponent} from "./view/admin/visualiser-demande/visualiser-demande.component";
import {ContactComponent} from "./demo/view/contact/contact.component";
import {ChercherDeclarationIRComponent} from "./view/admin/chercher-declaration-ir/chercher-declaration-ir.component";
import {StatistiqueComponent} from "./view/admin/statistique/statistique.component";
import {ComptableValidateurComponent} from "./view/admin/comptable-validateur/comptable-validateur.component";
import {FirsthomepageComponent} from "./demo/view/firsthomepage/firsthomepage.component";
import {DashboardDemoComponent} from "./demo/view/dashboarddemo.component";


import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {AcomptesListComponent} from "./view/admin/acomptes/acomptes-list/acomptes-list.component";
import {FactureJournalComponent} from './view/admin/facture/facture-journal/facture-journal.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
           // {path: '', component: AppLoginComponent},
            //{path: 'sign-up', component: SignUpComponent},
            //{path: '', component: FirsthomepageComponent},
            {path: '', component: AppMainComponent,
                children: [

                    {path: '', component: DashboardDemoComponent},
                    //{path: 'sign-up', component: SignUpComponent},
                    //{path: 'home-page', component: HomePageComponent},
                    {path: 'declaration-ir', component: DeclarationIrComponent},
                    {path: 'declaration-ir/list', component: ChercherDeclarationIRComponent},
                    {path: 'comptable', component: ComptableBoardComponent},
                    {path: 'declarations', component: DeclarationsComponent},
                    {path: 'traitement', component: ComptableBoardComponent},
                    {path: 'demandes', component: DeclarationsComponent},
                    {path: 'statistique', component: StatistiqueComponent},
                    {path: 'demande', component: DemandeDeclarationComponent},
                    {path: 'validation', component: ComptableValidateurComponent},
                    {path: 'statistique', component: StatistiqueComponent},
                    {path: 'profile', component: ProfileComponent},
                    {path: 'comptable', component: ComptableBoardComponent},
                    {path: 'declarations', component: DeclarationsComponent},
                    {path: 'contact', component: ContactComponent},
                    {path: 'demande/list', component: DemandeListComponent},
                    {path: 'demande/validation', component: ComptableValidateurComponent},
                    {path: 'vis', component: VisualiserDemandeComponent},
                    {path: 'declaration-is', component: DeclarationsISComponent},
                    {path: 'declarations-is/create', component: DeclarationIsCreateComponent},
                    {path: 'declarations-is/edit', component: DeclarationIsEditComponent},
                    {path: 'declarations-is/list', component: DeclarationIsListComponent},
                    {path: 'acomptes/list', component: AcomptesListComponent},
                    {path: 'declarations-is/chart', component: ChartsComponent},
                    {path: 'facture', component: FactureComponent},
                    {path: 'view/facture/create', component: FactureCreateComponent},
                    {path: 'view/facture/journal', component: FactureJournalComponent},
                    {path: 'declaration-tva', component: DeclarationTvaListComponent},
                    {path: 'declaration-tva/create', component: DeclarationTvaCreateComponent},
                    {path: 'utilities/display', component: DisplayComponent},
                    {path: 'utilities/elevation', component: ElevationComponent},
                    {path: 'utilities/flexbox', component: FlexboxComponent},
                    {path: 'utilities/grid', component: GridComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'utilities/widgets', component: WidgetsComponent},
                    {path: 'utilities/spacing', component: SpacingComponent},
                    {path: 'utilities/typography', component: TypographyComponent},
                    {path: 'utilities/text', component: TextComponent}
                    ]
            },
            {path: 'sign-up', component: SignUpComponent},
            {path: 'error', component: AppErrorComponent},
            {path: '404', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/404'},
        ], {scrollPositionRestoration: 'enabled'}),
    ],

    exports: [RouterModule]
})
export class AppRoutingModule {
}
