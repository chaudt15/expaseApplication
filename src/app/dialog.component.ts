import { 
  Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import { Auth }      from './auth.service';
import { Headers, RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';
import { ProductService } from './products.service';
import { Product }    from './product';
import { BuyItemSectionComponent } from './buy-item-section.component';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import { TimeService } from './time.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
var braintree = require('../../node_modules/braintree-web/dist/braintree.js');

@Component({
  selector: 'app-dialog',
  providers: [ProductService, TimeService, FormBuilder],
  templateUrl: 'src/app/dialog.html',
  styles: [`

 .transaction-page{
   width: 100%;
   height: 100%;
   padding-top: 0px;
  }

  .transaction-page a{
       text-decoration: none;
  }

  .steal-header{
    width: 100%;
    height: 90px;
    margin-top: 0px;
    background: #36ce48;
    text-align: center;
  }

  .steal-header a{
    font-family: "azo-sans-web",sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 70px;
    color: white;
    text-decoration: none;
    text-shadow: 1px 1px 2px rgba(150, 150, 150, 0.35);
  }

  .order-success-header{
    width: 100%;
    height: 40px;
    background: #efefef;
    border-bottom: 1px solid #d9dbd9;
    margin-bottom: 15px;
    text-align: center;
    padding-top: 5px;
  }

  .checkmark{
    margin-top: -2px;
    width: 22px;
    height: 22px;
    margin-right: 7px;
  }

  .end-product{
    text-align: center;
    margin-top: 10px;
  }
  .end-product a{
    font-family: "balboa-plus-fill",sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 35px;
    color: black;
    text-decoration: none;
  }

    .end-orderid{
    text-align: center;
    margin-top: 5px;
  }
  .end-orderid a{
  font-family: "futura-pt",sans-serif;
font-style: normal;
font-weight: 400;
    font-size: 24px;
    color: black;
    text-decoration: none;
  }

   .end-email{
    text-align: center;
    margin-top: 5px;
  }
  .end-email a{
  font-family: "futura-pt",sans-serif;
font-style: normal;
font-weight: 400;
    font-size: 20px;
    color: black;
    text-decoration: none;
  }

    .end-come{
    text-align: center;
    margin-top: 15px;
    background: #191919;
    height: 40px;
    padding-top: 5px;
  }
  .end-come a{
 font-family: "azo-sans-web",sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: #f7f7f7;
    text-decoration: none;
  }


  .button-flow{
    margin-top: 20px;
  }


  .order-success-header a{
    font-family: "myriad-pro",sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #0c0c0c;
  }

.quantity-image-overlay{
  position: absolute;
  width: 50px;
  height: 35px;
  background-color: #FFF;
  border-top: 1px #DDDDDD solid;
  border-right: 1px #DDDDDD solid;
  border-radius: 2px;
  margin-left: 4px;
  margin-top: 87px;
  text-align: center;
}
.quantity-image-overlay a{
  margin-top: 7px;
  margin-left: 2px;
  font-size: 22px;
  color: #202121;
}
.quantity-image-overlay span{
  font-family: "signo",sans-serif;
  font-style: normal;
  font-weight: 700;
  margin-top: 7px;
  margin-left: 2px;
  font-size: 26px;
  color: black;
}
.image-product-overlap{
}

.box-quan{
  height: 65px;
  border: 1px #01BAEF solid;
  text-align: center;
  #f5f7f6; 
  cursor:pointer;     
  border-radius: 1px;   
}

.inactive:hover{
  border-radius: 2px;
  height: 65px;
  border: 1px #C6C6C6 solid;
  text-align: center;
  background: #FFFFFF!important;
 -webkit-box-shadow: inset 1px 1px 2px 0px rgba(0,0,0,0.28);
-moz-box-shadow: inset 1px 1px 2px 0px rgba(0,0,0,0.28);
box-shadow: inset 1px 1px 2px 0px rgba(0,0,0,0.28);
  cursor:pointer;
}

.active{
background: #FFFFFF!important;  
border: 2px #151616 solid;
cursor:pointer;

}

.box-quan span{
  font-size: 45px;
  text-shadow: 1px 1px 2px rgba(150, 150, 150, 0.55);
}

.logos-img img{
  display: inline-block;
  float: left;
  width: 80%;
  margin-left: 10%;
}

.modal-footer{
  display: inline-block;
  height: 55px;
  width: 100%;
  border-top: 1px #a3a3a3 solid;
  background-color: #F9F9F9;
}

.time-remaining-header{
  width: 100%;
  height: 30px;
  background: #202323;
  border-left: 1px #E2E2E2 solid;
  border-right: 1px #E2E2E2 solid;
  border-top: 1px #E2E2E2 solid;
  text-align: center;
  font-weight: 300;
  padding-top: 4px;
}

.time-remaining-header a{
  text-decoration: none;
  font-size: 16px;
  color: #ffffff;
}
.time-remaining-header span{
  margin-right: 5px;
}

.secured-header{
  width: 100%;
  height: 40px;
  background: #3ac569; 
  background: -moz-linear-gradient(top,  #3ac569 0%, #21c457 100%); 
  background: -webkit-linear-gradient(top,  #3ac569 0%,#21c457 100%);
  background: linear-gradient(to bottom,  #3ac569 0%,#21c457 100%); 
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3ac569', endColorstr='#21c457',GradientType=0 );
  text-align: center;
  padding-top: 9px;
  border-bottom: 2px #33A055 solid;
}

.secured-header a{
  font-family: "Nunito", sans-serif; font-size: 15px;
color: #F2F2F2;
text-shadow: 0px 1px 2px rgba(150, 150, 150, 0.28);
text-decoration: none;
}

.secured-header span{
  color: #F2F2F2;
  text-shadow: 0px 1px 2px rgba(150, 150, 150, 0.28);
  margin-right: 4px;
}

.main-checkout-container{
padding: 25px;
}

.checkout-header{
  width: 100%;
  padding-top: 5px;
  height: 75px;
  background-color: #35dc9b;
  margin-bottom: 10px;
}



.form-style-6{
  font-family: "myriad-pro",sans-serif;
  font-style: normal;
  font-weight: 400;
    font-size: 22px; 
    max-width: 100%;
    margin: 10px auto;
    padding: 16px;
}

.headd{
  
background: #00c6ff; /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #1EB5D8 , #01BAEF); /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #1EB5D8 , #01BAEF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
    padding: 20px 0;
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    color: #fff;
    margin: -10px -10px 10px -10px;
}
.form-style-6 input[type="text"],
.form-style-6 input[type="date"],
.form-style-6 input[type="datetime"],
.form-style-6 input[type="email"],
.form-style-6 input[type="number"],
.form-style-6 input[type="search"],
.form-style-6 input[type="time"],
.form-style-6 input[type="url"],
.form-style-6 textarea,
.form-style-6 select 
{
    -webkit-transition: all 0.30s ease-in-out;
    -moz-transition: all 0.30s ease-in-out;
    -ms-transition: all 0.30s ease-in-out;
    -o-transition: all 0.30s ease-in-out;
    outline: none;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: 100%;
    background: #fff;
    margin-bottom: 4%;
    border: 1px solid #ccc;
    padding: 3%;
    border-radius: 0px;
    color: #555;
    font-size: 20px; 
}
.form-style-6 input[type="text"]:focus,
.form-style-6 input[type="date"]:focus,
.form-style-6 input[type="datetime"]:focus,
.form-style-6 input[type="email"]:focus,
.form-style-6 input[type="number"]:focus,
.form-style-6 input[type="search"]:focus,
.form-style-6 input[type="time"]:focus,
.form-style-6 input[type="url"]:focus,
.form-style-6 textarea:focus,
.form-style-6 select:focus
{
    box-shadow: 0 0 5px #3ac569;
    padding-left: 5%;
    border: 1px solid #3ac569;
    font-size: 20px;

}

.form-control{
    font-family: "myriad-pro",sans-serif;
  font-style: normal;
  font-weight: 400;
    font-size: 22px; 
    max-width: 100%;
    margin: 10px auto;
    padding: 16px;
      -webkit-transition: all 0.30s ease-in-out;
    -moz-transition: all 0.30s ease-in-out;
    -ms-transition: all 0.30s ease-in-out;
    -o-transition: all 0.30s ease-in-out;
    outline: none;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: 100%;
    background: #fff;
    margin-bottom: 4%;
    border: 1px solid #ccc;
    padding: 3%;
    border-radius: 0px;
    color: #555;
    font-size: 20px; 
}

.form-control:focus{
    box-shadow: 0 0 5px #01BAEF;
    padding-left: 5%;
    border: 1px solid #01BAEF;
    font-size: 20px;
}

.form-control.ng-valid[required], .ng-touched.ng-valid.required  {
  background: white;
  background-color: white;
  border-left: 5px solid green; /* red */
}

.form-control.ng-touched.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}


.trans-button-row{
  margin-bottom: 10px;
}


.form-style-6 input[type="submit"],
.form-style-6 input[type="button"]{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: 100%;
    padding: 3%;
    background: #3ac569;
    border-bottom: 2px solid #30C29E;
    border-top-style: none;
    border-right-style: none;
    border-left-style: none;    
    color: #fff;
}
.form-style-6 input[type="submit"]:hover,
.form-style-6 input[type="button"]:hover{
    background: #2EBC99;
}

.shipping-row{
  padding-top: 2px;
  width: 100%;
  height: 30px;
  display: inline-block;
  background: #444444;
  border-radius: 2px;  
  margin-bottom: 5px;                      
}
.shipping-row a{
color: white;
text-decoration: none;
font-size: 18px;
}
.billing-row{
  padding-top: 2px;
  width: 100%;
  height: 30px;
  display: inline-block;
  background: #444444;
  border-radius: 2px;   
  margin-bottom: 5px;                          
}
.billing-row a{
color: white;
text-decoration: none;
font-size: 18px;
}

.product-details-row{
  padding-top: 2px;
  text-align: center;
  margin-top: 10px;
  width: 100%;
  height: 30px;
  display: inline-block;
  background: #444444;
  border-radius: 2px;   
  margin-bottom: 5px;  
}

.product-details-row a{
color: white;
text-decoration: none;
font-size: 18px;
}

.button-transaction{
  height: 70px;
  width: 60%;
  margin-left: 20%;
  background-color: #14b5e0;
  border: 0px;
  margin-top: 15px;
  margin-bottom: 20px;
  border-bottom: 4px #158dad solid;
  outline: 0;
}

.shipping-billing-row{
  text-align: center;
}

.button-transaction:hover{
  height: 70px;
  width: 60%;
  margin-left: 20%;
  background-color: #29bde5;
  border: 0px;
  margin-top: 15px;
  border-bottom: 4px #158dad solid;
  outline: 0;
}

.button-transaction span{
  color: white;
  font-size: 23px;
}

.shipping-summary{
  text-align: center;
}
.shipping-summary a{
  font-size: 16px;
  color: #262626;
  text-decoration: none;
}

.end-close{
  width: 10%;
  margin-left: 45%;
  height: 50px;
  text-align: center;
  background-color: #ea4747;
  border: 1px solid #af2828;
  border-radius: 2px;
}

.end-close:hover{
  width: 10%;
  margin-left: 45%;
  height: 50px;
  text-align: center;
  background-color: #dd4343;
  border: 1px solid #af2828;
  border-radius: 2px;
}

.end-close a{
color: black;
text-decoration: none;
font-size: 20px;
}

.billing-summary{
  text-align: center;
}

.billing-summary a{
  font-size: 16px;
  color: #262626;
  text-decoration: none;
}


  @import url(http://fonts.googleapis.com/css?family=Nunito:300);

button-next a{ font-family: "Nunito", sans-serif; font-size: 24px; text-decoration: none;}

.button-next
{
  display: inline-block;
  float: right;
  letter-spacing: 1px;
  text-align: center;
  color: #0C5;
  font-size: 20px;
  font-family: "Nunito", sans-serif;
  font-weight: 300;
  margin: 0em auto;
  margin-right: 27px;
  position: relative;
  padding: 8px;
  width: 100px;
  background: #0D6;
  border: 1px solid #0D6;
  color: #FFF;
  overflow: hidden;
  transition: all 0.5s;
}

.button-next:disabled
{
  cursor: not-allowed;
}

.button-next:disabled:hover{
 display: inline-block;
  float: right;
  letter-spacing: 1px;
  text-align: center;
  color: #0C5;
  font-size: 20px;
  font-family: "Nunito", sans-serif;
  font-weight: 300;
  margin: 0em auto;
  margin-right: 27px;
  position: relative;
  padding: 8px;
  width: 100px;
  background: #c1c1c1;
  border: 1px solid #c1c1c1;
  color: #FFF;
  overflow: hidden;
  transition: all 0.5s;
}

.button-next:hover, .button:active 
{
  text-decoration: none;
  color: #0C5;
  border-color: #0C5;
  background: #FFF;
}

.button-next span 
{
  display: inline-block;
  position: relative;
  padding-right: 0;
  transition: padding-right 0.5s;
}

.button-next span:after 
{
  content: ' ';  
  position: absolute;
  top: 0;
  right: -18px;
  opacity: 0;
  width: 10px;
  height: 10px;
  margin-top: -7px;
  background: rgba(0, 0, 0, 0);
  border: 3px solid #FFF;
  border-top: none;
  border-right: none;
  transition: opacity 0.5s, top 0.5s, right 0.5s;
  transform: rotate(-135deg);
}

.button-next:hover span, .button-next:active span 
{
  padding-right: 20px;
}

.button-next:hover span:after, .button-next:active span:after 
{
  transition: opacity 0.5s, top 0.5s, right 0.5s;
  opacity: 1;
  border-color: #0C5;
  right: 0;
  top: 50%;
}
.button-next:disabled:hover span:after, .button-next:active span:after 
{
  transition: opacity 0.5s, top 0.5s, right 0.5s;
  opacity: 1;
  border-color: #4f4f4f;
  right: 0;
  top: 50%;
}

.button-back a { font-family: "Nunito", sans-serif; font-size: 24px; text-decoration: none; }


.button-back a { font-family: "Nunito", sans-serif; font-size: 24px; text-decoration: none; }



.button-back
{
  display: inline-block;
  float: left;
  letter-spacing: 1px;
  text-align: center;
  color: #0C5;
  font-size: 20px;
  font-family: "Nunito", sans-serif;
  font-weight: 300;
  margin: 0em auto;
  margin-left: 27px;
  position: relative;
  padding: 8px;
  width: 100px;
  background: #c1c1c1;
  border: 1px solid #c1c1c1;
  color: #FFF;
  overflow: hidden;
  transition: all 0.5s;
}

.button-back:hover, .button:active 
{
  text-decoration: none;
  color: #c1c1c1;
  border-color: #c1c1c1;
  background: #FFF;
}

.button-back span 
{
  display: inline-block;
  position: relative;
  padding-left: 0;
  transition: padding-left 0.5s;
}

.button-back span:after 
{
  content: '';  
  position: absolute;
  top: 0;
  left: -18px;
  opacity: 0;
  width: 10px;
  height: 10px;
  margin-top: -7px;
  background: rgba(0, 0, 0, 0);
  border: 3px solid #FFF;
  border-top: none;
  border-left: none;
  transition: opacity 0.5s, top 0.5s, left 0.5s;
  transform: rotate(-225deg);
}

.button-back:hover span, .button-back:active span 
{
  padding-left: 20px;
}

.button-back:hover span:after, .button-back:active span:after 
{
  transition: opacity 0.5s, top 0.5s, left 0.5s;
  opacity: 1;
  border-color: #c1c1c1;
  left: 0;
  top: 50%;
}
  .step-nav{
    margin-bottom: 10px;
    width: 100%;
    height: auto;
  }

 .list-group li{
  font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
 
   font-size: 16px;
 }

 .list-group span{
 font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
   font-size: 17px;
 }

 .order-summary-container{
   margin-top: 10px;
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

.checkout-logo{
  width: 40%;
  height: auto;

}

centeredz{
  text-align: center;
}

.close-button{
  width: 100%;
  height: 40px;
  background-color: #F45656;
  border-radius: 3px;
  border: 1px #D33131 solid;
  outline: 0;
  transition: all 0.1s;
  -webkit-transition: all 0.1s;
}

.close-button a{
 font-size: 14px;
 color: #F9F4F4;
 text-decoration: none;
}

.order-summary{
  text-align: center;
}

.order-summary-title{
  font-size: 25px;
  font-family: "futura-pt",sans-serif;
font-style: normal;
font-weight: 400;
}

.white-bg{
  background-color: #FFFFFF;
  width: 100%;
  padding: 25px;
  border: 1px #E2E2E2 solid;
}


.dialog {
  z-index: 1000;
  position: absolute !important;
  right: 0;
  left: 0;
  top: 20px;
  margin-bottom: 40px;
  margin-right: auto;
  border-radius: 1px;
  margin-left: auto;
  min-height: 600px;
  width: 95%;
  max-width: 1000px;
  background-color: #f9f9f9;
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
}

@media (min-width: 768px) {
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

export class DialogComponent implements OnInit {
/*////////////////////////////////////////////*/
/*///////////////////////////////////////////*/
/*/////////////FORM VARIABLES///////////////*/

myForm: FormGroup;

/*///////////////////////////////////////*/
/*//////////////////////////////////////*/
/*/////////////////////////////////////*/

  //********INFO ABOUT USER ID AND TRANSACTION STATE************
  customerId: string;
  formReceived: false;
  //************************************************************
  checkoutFinalized = false;
  //-----TIMER SAVED PRICE------
  savedPrice: number;
  minutes = 4;
  nonReceived = false;
  seconds = 59;
  dollars: number;
  cents: number;
  priceDollars: number;
  priceCents: number;
  unitPrice: number ;
  addonDollars: number;
  amount = 1;
  shippingTotal = 5;
  totalPrice: number;
  //----------------------------
  section1 = true;
  section2 = false;
  section3 = false;
  private formAdditions: string;
  products = [];
  priceArray = [];
  userRole: any;
  total: number;
  newToken = [];
  userInfo: any;
  finalToken = "";
  name: string;
  userEmail: string;
  date: string;
  userID: string;
  result: any;
  error: any;
  //----------------
  returnedObject = [];
  rfirstName: string;
  rlastName: string;
  rshippingStreet: string;
  rshippingCity: string;
  rshippingState: string;
  rshippingZip: string;
  rbillingStreet: string;
  rbillingCity: string;
  rbillingState: string;
  rbillingZip: string;
  rbillingFirst: string;
  rbillingLast: string;
  rtransactionID: string;
  ramount: string;
  rcardType: string;
  rlastFour: string;
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  model = new UserCheckout('','', 1, this.userID,'','','','','','','','','','', this.userEmail, this.date, '', '');
constructor(private http:Http, private productService: ProductService, private timeService: TimeService, private auth: Auth, private router: Router, private formBuilder: FormBuilder){
  this.name = '';
    let dp = new DatePipe('de-DE');
    this.name = dp.transform(new Date(), 'ddMMyyyy');
    setInterval(()=>this.tick(),1000);
    this.date = this.name;
    this.timeService.fetchPrice().subscribe(
        (data) => {
            this.priceArray = data;
            this.priceDollars = data.dollars;
            this.priceCents = data.cents;
            this.updatePrice(this.priceDollars, this.priceCents, this.addonDollars);
            this.updateModel();
        }); 

   this.productService.fetchData(this.date).subscribe(
      (data) => {
        this.products = data
        this.addonDollars = data.price;
        this.reset(); 
      });  
   //******FORM DETAILS*********
   //***************************
  
} 

  get diagnostic() { return JSON.stringify(this.model); }
 
   getToken(){
      this.updateToken(this.newToken);
      return true;
    }

   updateModel(){
     this.amount = this.model.amount;
     this.shippingTotal = this.amount*0;
     this.totalPrice = (Math.round(((this.amount*0) + (this.unitPrice*this.amount)) * 100) /100);
   }
     thisInterval;
    updateToken(token){
      var updatedToken = JSON.stringify(token);
      this.finalToken = updatedToken;
      this.finalizeToken();
      this.thisInterval = setInterval(()=>this.waitForToken(),500);
    }
waitForToken(){
 // console.log('looking..');
  if (localStorage.getItem('nonceAdded')=='true'){
    this.nonReceived = true;
    clearInterval(this.thisInterval);
   // console.log('found!');
  }
  else{
    this.nonReceived = false;
  //  console.log('not found:(');
  }
}    

updatePrice(dollars, cents, addon){
        this.dollars = dollars + addon;
        this.cents = cents.toFixed(2) * 0.01;
        this.unitPrice = this.dollars + this.cents;
        this.amount = this.model.amount;
     this.shippingTotal = this.amount*0;
     this.totalPrice = (Math.round(((this.amount*0) + (this.unitPrice*this.amount)) * 100) /100);
    } 

backSection1(){
   this.section1 = true;
   this.section2 = false;
   this.section3 = false;
   localStorage.removeItem('nonce');
   localStorage.removeItem('nonceAdded');
}

backSection2(){
  localStorage.removeItem('nonce');
  localStorage.removeItem('nonceAdded');
  this.section1 = false;
  this.section2 = true;
  this.section3 = false;
  this.getToken();
}

changeSection(){
  this.section2 = true;
  this.section1 = false;
  this.section3 = false;
  this.getToken();
}

changeSection2(){
  let profile = localStorage.getItem('profile');
  let object = JSON.parse(profile);
  let mail = object.email;
  this.customerId = object.clientID;
 // console.log('ID is:  ' + this.customerId);
  this.userEmail = mail;
  this.section2 = false;
  this.section1 = false;
  this.section3 = true;
  this.searchCustomerId(this.customerId);
  clearInterval(this.thisInterval);
}

  searchCustomerId(id){
     var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var data = JSON.stringify({
      "customerId": id
    });

    this.http.post('http://expase.com:3300/findCustomer', data, {headers: headers}).map( (res) => res.json())
    .subscribe(
        (res) => {
         var returnedCustomer = JSON.stringify(res);
         var isUser = JSON.stringify(res.isUser);
         if (isUser === 'false'){
           //This section will be activated if no user exists yet by the current id from Auth0
           this.createNewCustomer(id);
         }
         else{
           //This section will be activated if the current user does exist, and the info was already retrieved
           //console.log('Hahaha')
         }

         //console.log('Response ' + JSON.stringify(res));
        },
        (error) => {console.log(error)}
      );
  //  console.log("Successfully returned customer information");
}

createNewCustomer(id){

 var headers = new Headers();
    headers.append('Content-Type', 'application/json');
 var data = JSON.stringify({
      "customerId": id,
      "email": this.userEmail
    });

 this.http.post('http://expase.com:3300/createCustomer', data, {headers: headers}).map( (res) => res.json())
    .subscribe(
        (res) => {
         var newCustomer = JSON.stringify(res);
      //   console.log('Response ' + JSON.stringify(res));
        },
        (error) => {console.log(error)}
      );
}

onClickForm(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var data = JSON.stringify({
      "nonce": localStorage.getItem('nonce'),
      "amount": this.totalPrice,
      "unitPrice": this.unitPrice,
      "quantity": this.amount,
      "firstName": this.model.firstName,
      "lastName": this.model.lastName,
      "customerId": this.customerId,
      "shippingStreet": this.model.shippingStreet,
      "shippingCity": this.model.shippingCity,
      "shippingZip": this.model.shippingZip,
      "shippingState": this.model.shippingState,
      "billingStreet": this.model.billingStreet,
      "billingZip": this.model.billingZip,
      "billingState": this.model.billingState,
      "billingCity": this.model.billingCity,
      "email": this.userEmail,
      "date": this.date,
      "billingFirst": this.model.billingFirst,
      "billingLast": this.model.billingLast
    });

    this.http.post('http://expase.com:3300/checkouts/'+this.date, data, {headers: headers}).map( (res) => res.json())
    .subscribe(
        (res) => {
      //   console.log(res);
         this.ramount = res.amount;
         this.rtransactionID = res.orderId;
         this.rbillingCity = res.billingCity;
         this.rbillingState = res.billingState;
         this.rbillingStreet = res.billingStreet;
         this.rbillingZip = res.billingZip;
         this.rfirstName = res.shippingFirstName;
         this.rlastName = res.shippingLastName;
         this.rlastFour = res.cardLastFour;
         this.rcardType = res.cardType;
         this.checkoutFinalized = true;
        },
        (error) => {console.log(error)}
      );
   // console.log(data);
   // console.log("Successfully submitted data to API server...");
}



finalizeToken(){
  braintree.setup(JSON.parse(this.finalToken), 'dropin', {
     container: 'dropin-container',
     defaultFirst: true,
      form: 'checkout-form',
      onPaymentMethodReceived: function (obj) {
      localStorage.setItem('nonce', obj.nonce);
      localStorage.setItem('nonceAdded', 'true');
    }
  });
}




quan1 = true;
quan2 = false;
quan3 = false;
quan4 = false;

quantity1(){
this.model.amount = 1;
this.amount = 1;
this.updateModel();
this.quan1 = true;
this.quan2 = false;
this.quan3 = false;
this.quan4 = false;
}

quantity2(){
this.amount = 2;
this.model.amount = 2; 
this.updateModel();
this.quan1 = false;
this.quan2 = true;
this.quan3 = false;
this.quan4 = false;
}

quantity3(){
this.amount = 3;
this.model.amount = 3;
this.updateModel();
this.quan1 = false;
this.quan2 = false;
this.quan3 = true;
this.quan4 = false;
}

quantity4(){
this.amount = 4;  
this.model.amount = 4;
this.updateModel();
this.quan1 = false;
this.quan2 = false;
this.quan3 = false;
this.quan4 = true;
}


checkAdmin(){
      if (this.userRole == 'administrator'){
        return true;
      }
        else{
          return false;
        }
    }


  
  onClickAdmin(){
    if (this.userRole == 'administrator'){
    //  console.log(this.userInfo);
    //  console.log(this.userRole);
      this.router.navigate(['/admin-dashboard']);
    }
    else{
    //  console.log("User does not have required permission to access");
    }
  }



    onClick() {
    this.router.navigate(['/checkout']);
    //console.log(this.total);
    var foo = <any>{};
    foo.total = this.total;
    var jsonString = JSON.stringify(foo);
    localStorage.setItem("total", jsonString);
    //console.log(jsonString);
  }


 ngOnInit(){
   this.minutes = 5;
   this.seconds = 0;
   this.reset();
   let date = this.name;
    this.productService.fetchData(date).subscribe(
      (data) => this.products = data);
    this.timeService.fetchPrice().subscribe(
        (data) => {
            this.priceArray = data;
        });
      this.timeService.fetchToken().subscribe(
        (data) => {
          this.newToken = data;  
        });
       if (this.auth.authenticated()){
       this.userInfo = JSON.parse(localStorage.getItem('profile'));
       this.userRole = this.userInfo.app_metadata.roles[0];
    }

 }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.reset();
  }

  reset(){
    localStorage.removeItem('nonce');
    localStorage.removeItem('nonceAdded');
    this.checkoutFinalized = false;
    clearInterval(this.thisInterval);
    this.section1 = true;
    this.section2 = false;
    this.section3 = false;
    this.resetTimer();
    this.timeService.fetchPrice().subscribe(
        (data) => {
            this.priceArray = data;
            this.priceDollars = data.dollars;
            this.priceCents = data.cents;
            this.updatePrice(this.priceDollars, this.priceCents, this.addonDollars);
        }); 

  }

  resetTimer(){
        this.minutes = 6;
        this.seconds = 59;
    }
    private tick(): void{
        if (--this.seconds < 0){
            this.seconds =59;
            if(--this.minutes < 0){
                this.close();
            }
        }
    }
}


export class UserCheckout {
  constructor(
    public firstName: string,
    public lastName: string,
    public amount: number,
    public userID: string,
    public shippingStreet: string,
    public shippingZip: string,
    public shippingCity: string,
    public shippingState: string,
    public shippingEtendedAddress: string,
    public billingStreet: string,
    public billingZip: string,
    public billingCity: string,
    public billingState: string,
    public billingEtendedAddress: string,
    public email: string,
    public date: string,
    public billingFirst: string,
    public billingLast: string
  ){}
}