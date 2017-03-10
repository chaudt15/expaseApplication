import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import { Auth }      from './auth.service';
import { Headers, RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';
import { ProductService } from './products.service';
import { Product }    from './product';
import { BuyItemSectionComponent } from './buy-item-section.component';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import { TimeService } from './time.service';
import { AccountOrderService } from './account-orders.component';
var braintree = require('../../node_modules/braintree-web/dist/braintree.js');


@Component({
  selector: 'account-dialog',
  providers: [ProductService, TimeService, AccountOrderService],
  template: `

  <div [@dialog] *ngIf="visible"  class="dialog">
  <div class="settings-header"><a>My Account</a></div>
  <button *ngIf ="!clicked" (click)="grabOrders()">Grab Orders</button>


  <div class="transaction-list-container col-md-12 col-centered" *ngIf = "clicked">
  <img *ngIf ="!activated" src="/cube.svg">

  <ul *ngIf = "activated">
  <li *ngFor="let order of orders; let i = index;" >

  <div class="list-group">
  <a href="#" class="list-group-item active">
    <h4 class="list-group-item-heading">Product Name Goes Here and Will Be Replaced Shortly</h4>
    <p class="list-group-item-text">Order Number: {{order.aid}}</p>
  </a>
  <a class="list-group-item">Name: {{order.billingFirst}} {{order.billingLast}}</a>
  <a class="list-group-item">Unit Price: $ {{order.amount}}</a>
</div>
    </li>
</ul>
</div>

<div *ngIf="admin">
  <button (click)="onClickAdmin()">Go to admin board</button>
</div>

</div>
<div *ngIf="visible" class="overlay" (click)="close()"></div>

  `,
  styles: [`
  .transaction-list-container ul{
    list-style-type: none;
  }

 .settings-header{
   width: 100%;
   height: 75px;
   background-color: #FCFCFC;
   margin: 0 auto;
   text-align: center;
   padding-top: 5px;
   
 } 
 .settings-header a{
   color: #01BAEF;
   font-size: 45px;
   text-decoration: none;
 }

 .overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.94);
  z-index: 999;
}

.dialog {
  z-index: 1000;
  position: absolute !important;
  right: 0;
  left: 0;
  top: 20px;
  margin-bottom: 40px;
  margin-right: auto;
  border-radius: 2px;
  margin-left: auto;
  min-height: 650px;
  width: 75%!important;
  max-width: 800px;
  border: 1px solid #000a00;



background: #FCFCFC; /* fallback for old browsers */

        
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
}

@media (min-width: 568px) {
  .dialog {
    top: 40px;
  }
}

.dialog__close-btn {
  border: 0;
  background: none;
  color: #2d2d2d;
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.2em;
}
  `],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class AccountDialogComponent{
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  customerId: string;
  clicked = false;
  amount: string;
  transactionId: string;
  userInfo: any;
  shippingFirst: string;
  postOrder: string;
  profile = localStorage.getItem('profile');
  object = JSON.parse(this.profile);
  postData: string;
  orders = [];
  activated = false;
  userRole: any;
  admin = false;
  mailFinal = "";
constructor(private http:Http, private productService: ProductService, private timeService: TimeService, private auth: Auth, private router: Router, private accountService: AccountOrderService){
this.checkAdmin();

}

grabOrders(){
 this.clicked = true;
 let mail = this.object.email;
 var json = {"email": mail};
 this.mailFinal = this.object.email;
 this.accountService.getOrder(json).subscribe(
   (data) => {
     this.orders = data.orders;

     if (this.orders !== []){
        this.activated = true;
     }
    });

}



ngOnInit(){
       if (this.auth.authenticated()){
       this.userInfo = JSON.parse(localStorage.getItem('profile'));
       this.userRole = this.userInfo.app_metadata.roles[0];
    }
 }



checkAdmin(){
  //console.log('CheckAdmin() initiated');
    /*  if (this.object.email == 'lestrischris@gmail.com'){
        this.admin = true;
        console.log('Admin is true');
      }
      else{
        this.admin = false;
        console.log('Admin is false');
        }*/
    }

  
  onClickAdmin(){
    if (this.userRole == 'administrator'){
      this.router.navigate(['/admin-dashboard']);
    }
    else{
      //console.log("User does not have required permission to access");
    }
  }


close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
