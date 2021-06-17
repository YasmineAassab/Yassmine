import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';

import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KnobModule} from 'primeng/knob';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

import {AppComponent} from './app.component';
import {AppCodeModule} from './app.code.component'
import {AppMainComponent} from './app.main.component';
import {AppConfigComponent} from './app.config.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppRightMenuComponent} from './app.right-menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';
import {WidgetsComponent} from './utilities/widgets.component';

import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import {MenuService} from './app.menu.service';
import {CustomerService} from './demo/service/customerservice';
import {PhotoService} from './demo/service/photoservice';
import {ProductService} from './demo/service/productservice';
import {IconService} from './demo/service/iconservice';
import { DeclarationIsListComponent } from './view/admin/declarations-is/declaration-is-list/declaration-is-list.component';

import { DeclarationIsCreateComponent } from './view/admin/declarations-is/declaration-is-create/declaration-is-create.component';
import { DeclarationIsEditComponent } from './view/admin/declarations-is/declaration-is-edit/declaration-is-edit.component';
import { DeclarationIsViewComponent } from './view/admin/declarations-is/declaration-is-view/declaration-is-view.component';
import { FactureDialogComponent } from './view/admin/declarations-is/facture-dialog/facture-dialog.component';
import { ViewFactureComponent } from './view/admin/declarations-is/view-facture/view-facture.component';
import { DeclarationsISComponent } from './view/admin/declarations-is/declarations-is.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {HomePageComponent} from './home-page/home-page.component';
import {OurServiceComponent} from './home-page/our-service/our-service.component';
import {DeclarationIrComponent} from './view/admin/declaration-ir/declaration-ir.component';
import {DeclarationCreateComponent} from './view/admin/declaration-ir/declaration-create/declaration-create.component';
import {DeclarationEditComponent} from './view/admin/declaration-ir/declaration-edit/declaration-edit.component';
import {DeclarationViewComponent} from './view/admin/declaration-ir/declaration-view/declaration-view.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AuthInterceptor} from './Security/auth-interceptor.service';
import {ProfileComponent} from './Security/profile/profile.component';
import { FactureComponent } from './view/admin/facture/facture.component';
import { FactureCreateComponent } from './view/admin/facture/facture-create/facture-create.component';
import { FactureListComponent } from './view/admin/facture/facture-list/facture-list.component';
import { FactureEditComponent } from './view/admin/facture/facture-edit/facture-edit.component';
import { FactureViewComponent } from './view/admin/facture/facture-view/facture-view.component';
import {DeclarationTvaListComponent} from "./view/admin/declarationTva/declaration-tva-list/declaration-tva-list.component";
import {DemandeListComponent} from "./view/admin/demande-list/demande-list.component";
import {ChartsComponent} from "./view/admin/charts/charts.component";
import {DemandeDeclarationComponent} from "./view/admin/demande-declaration/demande-declaration.component";
import {ComptableBoardComponent} from "./view/admin/comptable-board/comptable-board.component";
import {DeclarationsComponent} from "./view/admin/declarations/declarations.component";
import {ViewComptableComponent} from "./view/admin/declarations/view-comptable/view-comptable.component";
import {DeclarationTvaCreateComponent} from "./view/admin/declarationTva/declaration-tva-create/declaration-tva-create.component";
import { AcomptesCreateComponent } from './view/admin/acomptes/acomptes-create/acomptes-create.component';
import {EditFactureComponent} from "./view/admin/declarations-is/edit-facture/edit-facture.component";
import { VisualiserDemandeComponent } from './view/admin/visualiser-demande/visualiser-demande.component';
import { ContactComponent } from './demo/view/contact/contact.component';
import { FirsthomepageComponent } from './demo/view/firsthomepage/firsthomepage.component';
import {GMapModule} from "primeng/gmap";
import {HttpClient} from "@angular/common/http";
import { AcomptesComponent } from './view/admin/acomptes/acomptes.component';
import { AcomptesListComponent } from './view/admin/acomptes/acomptes-list/acomptes-list.component';

import { FactureCreateDeclComponent } from './view/admin/declarationTva/facture-create-decl/facture-create-decl.component';
import { FactureEditDeclComponent } from './view/admin/declarationTva/facture-edit-decl/facture-edit-decl.component';
import { FactureViewDeclComponent } from './view/admin/declarationTva/facture-view-decl/facture-view-decl.component';
import { DeclarationTvaViewComponent } from './view/admin/declarationTva/declaration-tva-view/declaration-tva-view.component';
import {ComptableValidateurComponent} from "./view/admin/comptable-validateur/comptable-validateur.component";
import {StatistiqueComponent} from './view/admin/statistique/statistique.component';
import {ChercherDeclarationIRComponent} from './view/admin/chercher-declaration-ir/chercher-declaration-ir.component';
import {SousCreateComponent} from './view/admin/classe/sous-classe-comptable/sous-create/sous-create.component';
import {SousListeComponent} from './view/admin/classe/sous-classe-comptable/sous-liste/sous-liste.component';
import {CompteListeComponent} from './view/admin/classe/compte-comptable/compte-liste/compte-liste.component';
import {CompteCreateComponent} from './view/admin/classe/compte-comptable/compte-create/compte-create.component';
import {ClasseListeComponent} from './view/admin/classe/classe-comptable/classe-liste/classe-liste.component';
import {ClasseCreateComponent} from './view/admin/classe/classe-comptable/classe-create/classe-create.component';
import {SousClasseComptableComponent} from './view/admin/classe/sous-classe-comptable/sous-classe-comptable.component';
import {CompteComptableComponent} from './view/admin/classe/compte-comptable/compte-comptable.component';
import {ClasseComptableComponent} from './view/admin/classe/classe-comptable/classe-comptable.component';
import {ClasseComponent} from './view/admin/classe/classe.component';
import { CpcComponent } from './view/admin/cpc/cpc.component';
import { CpcListComponent } from './view/admin/cpc/cpc-list/cpc-list.component';
import { CpcRechercheComponent } from './view/admin/cpc/cpc-recherche/cpc-recherche.component';
import { CpcViewComponent } from './view/admin/cpc/cpc-view/cpc-view.component';
import { CpcChartComponent } from './view/admin/cpc/cpc-chart/cpc-chart.component';
import { ClasseEditComponent } from './view/admin/classe/classe-comptable/classe-edit/classe-edit.component';
import { CompteEditComponent } from './view/admin/classe/compte-comptable/compte-edit/compte-edit.component';
import { SousEditComponent } from './view/admin/classe/sous-classe-comptable/sous-edit/sous-edit.component';
import { FactureJournalComponent } from './view/admin/facture/facture-journal/facture-journal.component';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AppCodeModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TimelineModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        GMapModule,
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppConfigComponent,
        AppRightMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        DashboardDemoComponent,
        DisplayComponent,
        ElevationComponent,
        FlexboxComponent,
        GridComponent,
        IconsComponent,
        SpacingComponent,
        TypographyComponent,
        TextComponent,
        WidgetsComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppLoginComponent,

        DemandeListComponent,
        ChartsComponent,
        EditFactureComponent,
        DeclarationIsListComponent,
        DeclarationIsCreateComponent,
        DeclarationIsEditComponent,
        DeclarationIsViewComponent,
        FactureDialogComponent,
        ViewFactureComponent,
        DeclarationsISComponent,
        SignUpComponent,
        HomePageComponent,
        OurServiceComponent,
        DemandeDeclarationComponent,
        DeclarationIrComponent,
        DeclarationCreateComponent,
        DeclarationEditComponent,
        DeclarationViewComponent,
        ProfileComponent,
        FactureComponent,
        FactureCreateComponent,
        FactureListComponent,
        FactureEditComponent,
        FactureViewComponent,
        ClasseComponent,
        ClasseComptableComponent,
        CompteComptableComponent,
        SousClasseComptableComponent,
        ClasseCreateComponent,
        ClasseListeComponent,
        CompteCreateComponent,
        CompteListeComponent,
        SousCreateComponent,
        SousListeComponent,
        CpcComponent,
        CpcListComponent,
        CpcRechercheComponent,
        CpcViewComponent,CpcChartComponent,
        ClasseEditComponent,
        CompteEditComponent,
        SousEditComponent,

        DeclarationCreateComponent,
        DeclarationTvaListComponent,
        DeclarationTvaCreateComponent,
        ComptableBoardComponent,
        DeclarationsComponent,
        ViewComptableComponent,
        AcomptesCreateComponent,
        VisualiserDemandeComponent,
        ContactComponent,
        FirsthomepageComponent,
        AcomptesComponent,
        AcomptesListComponent,
        ComptableValidateurComponent,
        FactureCreateDeclComponent,
        FactureEditDeclComponent,
        FactureViewDeclComponent,
        DeclarationTvaViewComponent,
        StatistiqueComponent,
        ChercherDeclarationIRComponent,
        FactureJournalComponent

    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuService, MessageService, ConfirmationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
