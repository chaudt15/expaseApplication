import { Component } from '@angular/core';
import {HeaderComponent} from './header.component';
import {ScrollerComponent} from './scroller.component';
import {ItemSectionComponent} from './item-section.component';
import {BuyItemSectionComponent} from './buy-item-section.component';
import { Auth } from './auth.service';

import {HomeScreenComponent} from './homescreen.component'



@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
  `
 
})
export class AppComponent { 
 
}