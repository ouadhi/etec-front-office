'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">rms documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountsModule.html" data-type="entity-link" >AccountsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountsModule-471d9dfa1cd9f73d01bbb5e32f917944"' : 'data-target="#xs-components-links-module-AccountsModule-471d9dfa1cd9f73d01bbb5e32f917944"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountsModule-471d9dfa1cd9f73d01bbb5e32f917944"' :
                                            'id="xs-components-links-module-AccountsModule-471d9dfa1cd9f73d01bbb5e32f917944"' }>
                                            <li class="link">
                                                <a href="components/AccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EntityProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EntityProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountsRouterModule.html" data-type="entity-link" >AccountsRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdsModule.html" data-type="entity-link" >AdsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdsModule-1e9b031fb880a3170f0133f13f6cc1fc"' : 'data-target="#xs-components-links-module-AdsModule-1e9b031fb880a3170f0133f13f6cc1fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdsModule-1e9b031fb880a3170f0133f13f6cc1fc"' :
                                            'id="xs-components-links-module-AdsModule-1e9b031fb880a3170f0133f13f6cc1fc"' }>
                                            <li class="link">
                                                <a href="components/AdsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdsDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdsDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdsRouterModule.html" data-type="entity-link" >AdsRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4108532d7097722a387a0888d5144bb8"' : 'data-target="#xs-components-links-module-AppModule-4108532d7097722a387a0888d5144bb8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4108532d7097722a387a0888d5144bb8"' :
                                            'id="xs-components-links-module-AppModule-4108532d7097722a387a0888d5144bb8"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppRoutingModule-0ec1701c7d0a00efc5b30ce686e3788a"' : 'data-target="#xs-injectables-links-module-AppRoutingModule-0ec1701c7d0a00efc5b30ce686e3788a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppRoutingModule-0ec1701c7d0a00efc5b30ce686e3788a"' :
                                        'id="xs-injectables-links-module-AppRoutingModule-0ec1701c7d0a00efc5b30ce686e3788a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleGuard</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-4db9b01e1b00706f8f11c172bd1928e2"' : 'data-target="#xs-components-links-module-DashboardModule-4db9b01e1b00706f8f11c172bd1928e2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-4db9b01e1b00706f8f11c172bd1928e2"' :
                                            'id="xs-components-links-module-DashboardModule-4db9b01e1b00706f8f11c172bd1928e2"' }>
                                            <li class="link">
                                                <a href="components/AdsSecctionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdsSecctionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsItemUiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsItemUiComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsSecctionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsSecctionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRouterModule.html" data-type="entity-link" >DashboardRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewsModule.html" data-type="entity-link" >NewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewsModule-9ff52c5d6b02865a9bc7fecf1eb26cf9"' : 'data-target="#xs-components-links-module-NewsModule-9ff52c5d6b02865a9bc7fecf1eb26cf9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewsModule-9ff52c5d6b02865a9bc7fecf1eb26cf9"' :
                                            'id="xs-components-links-module-NewsModule-9ff52c5d6b02865a9bc7fecf1eb26cf9"' }>
                                            <li class="link">
                                                <a href="components/NewsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewsRouterModule.html" data-type="entity-link" >NewsRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsModule.html" data-type="entity-link" >NotificationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotificationsModule-963b30aed6c03d9d00a78e2f5e9e6d38"' : 'data-target="#xs-components-links-module-NotificationsModule-963b30aed6c03d9d00a78e2f5e9e6d38"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificationsModule-963b30aed6c03d9d00a78e2f5e9e6d38"' :
                                            'id="xs-components-links-module-NotificationsModule-963b30aed6c03d9d00a78e2f5e9e6d38"' }>
                                            <li class="link">
                                                <a href="components/NotificationsIndexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsIndexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsRouterModule.html" data-type="entity-link" >NotificationsRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RequestsModule.html" data-type="entity-link" >RequestsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RequestsModule-f98057e41dac1ade67db2982d9a3ab6a"' : 'data-target="#xs-components-links-module-RequestsModule-f98057e41dac1ade67db2982d9a3ab6a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RequestsModule-f98057e41dac1ade67db2982d9a3ab6a"' :
                                            'id="xs-components-links-module-RequestsModule-f98057e41dac1ade67db2982d9a3ab6a"' }>
                                            <li class="link">
                                                <a href="components/AnonymousRequestDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnonymousRequestDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CaseActivitiesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaseActivitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashletFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashletFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashletTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashletTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MoreInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MoreInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyRequestsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyRequestsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestQueryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestQueryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestsRouterModule.html" data-type="entity-link" >RequestsRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesCatalogModule.html" data-type="entity-link" >ServicesCatalogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ServicesCatalogModule-72dbb5393dff00462010f36d9f67298c"' : 'data-target="#xs-components-links-module-ServicesCatalogModule-72dbb5393dff00462010f36d9f67298c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ServicesCatalogModule-72dbb5393dff00462010f36d9f67298c"' :
                                            'id="xs-components-links-module-ServicesCatalogModule-72dbb5393dff00462010f36d9f67298c"' }>
                                            <li class="link">
                                                <a href="components/ServiceCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServiceCatalogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceCatalogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServiceDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesCatalogRouterModule.html" data-type="entity-link" >ServicesCatalogRouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' : 'data-target="#xs-components-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' :
                                            'id="xs-components-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotAllowedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotAllowedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationOptionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationOptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageTitleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageTitleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' : 'data-target="#xs-directives-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' :
                                        'id="xs-directives-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' }>
                                        <li class="link">
                                            <a href="directives/HasRoleDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HasRoleDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' : 'data-target="#xs-pipes-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' :
                                            'id="xs-pipes-links-module-SharedModule-22bf69561afb58b5b0ae1dfc26144a34"' }>
                                            <li class="link">
                                                <a href="pipes/LocalizedDatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalizedDatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TimeAgoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimeAgoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseComponent.html" data-type="entity-link" >BaseComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/TranslateLoaderHelper.html" data-type="entity-link" >TranslateLoaderHelper</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link" >AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaseActivityAdapter.html" data-type="entity-link" >CaseActivityAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaseActivityService.html" data-type="entity-link" >CaseActivityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link" >ConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashletFilterAdapter.html" data-type="entity-link" >DashletFilterAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterService.html" data-type="entity-link" >FilterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link" >NotificationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginatorI18n.html" data-type="entity-link" >PaginatorI18n</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestsService.html" data-type="entity-link" >RequestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServicesService.html" data-type="entity-link" >ServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link" >SessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SwitchLangService.html" data-type="entity-link" >SwitchLangService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/LicenseInterceptor.html" data-type="entity-link" >LicenseInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/filterData.html" data-type="entity-link" >filterData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});