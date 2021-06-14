import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';

import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
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
import {StatistiqueComponent} from './view/admin/statistique/statistique.component';
import {ComptableValidateurComponent} from './view/admin/comptable-validateur/comptable-validateur.component';
import {VisualiserDemandeComponent} from './view/admin/visualiser-demande/visualiser-demande.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: AppLoginComponent},
            {path: 'sign-up', component: SignUpComponent},
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'home-page', component: HomePageComponent},
                    {path: 'declaration-ir', component: DeclarationIrComponent},
                    {path: 'profile', component: ProfileComponent},
                    {path: 'traitement', component: ComptableBoardComponent},
                    {path: 'demandes', component: DeclarationsComponent},
                    {path: 'statistique', component: StatistiqueComponent},
                    {path: 'validation', component: ComptableValidateurComponent},
                    {path: 'vis', component: VisualiserDemandeComponent},

                   /* {path: '', component: DashboardDemoComponent},*/
                    {path: 'demande', component: DemandeDeclarationComponent},
                    {path: 'demande/list', component: DemandeListComponent},
                    {path: 'declaration-is', component: DeclarationsISComponent},
                    {path: 'declarations-is/create', component: DeclarationIsCreateComponent},
                    {path: 'declarations-is/edit', component: DeclarationIsEditComponent},
                    {path: 'declarations-is/list', component: DeclarationIsListComponent},
                    {path: 'declarations-is/chart', component: ChartsComponent},
                    {path: 'facture', component: FactureComponent},
                    {path: 'view/facture/create', component: FactureCreateComponent},
                    {path: 'declaration-tva', component: DeclarationTvaListComponent},
                    {path: 'declaration-tva/create', component: DeclarationTvaCreateComponent},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/menu', component: MenusDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/display', component: DisplayComponent},
                    {path: 'utilities/elevation', component: ElevationComponent},
                    {path: 'utilities/flexbox', component: FlexboxComponent},
                    {path: 'utilities/grid', component: GridComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'utilities/widgets', component: WidgetsComponent},
                    {path: 'utilities/spacing', component: SpacingComponent},
                    {path: 'utilities/typography', component: TypographyComponent},
                    {path: 'utilities/text', component: TextComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent}
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'accessdenied', component: AppAccessdeniedComponent},
            {path: '404', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/404'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
