import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {HeaderComponent} from './header.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import {ScrollerComponent} from './scroller.component';
import {ItemSectionComponent} from './item-section.component';
import {BuyItemSectionComponent} from './buy-item-section.component';
import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { routing, appRoutingProviders } from './app.routes';
import {HomeScreenComponent} from './homescreen.component';
import { HttpModule } from '@angular/http';
import { DialogComponent } from './dialog.component.ts';
import {AccountDialogComponent} from './account-dialog.component';
import {TabsComponent} from './tabs.component';
import {FooterComponent} from './footer.component';
import {enableProdMode} from '@angular/core';
enableProdMode();

@NgModule({
  providers:    [
      appRoutingProviders,
      AUTH_PROVIDERS,
      Auth
    ],
     imports:      [
        HttpModule,
        BrowserModule,
        routing,
        FormsModule,
        ReactiveFormsModule

    ],
  declarations: [ AppComponent, HeaderComponent, ScrollerComponent, ItemSectionComponent, BuyItemSectionComponent, 
   HomeScreenComponent, DialogComponent, AccountDialogComponent, TabsComponent, FooterComponent],
  bootstrap:    [AppComponent]

})
export class AppModule { }