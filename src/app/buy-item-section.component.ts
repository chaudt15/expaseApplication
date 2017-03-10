import {Component, ViewContainerRef, Input, ViewEncapsulation, trigger, state, style, transition, animate} from '@angular/core';
import {Http, Response} from '@angular/http';
import { ProductService } from './products.service';
import { DatePipe } from '@angular/common';
import { Auth }      from './auth.service';
import {Router} from '@angular/router';
import { TimeService } from './time.service';

 
@Component({
    selector: 'buyitemsection',
    providers: [ProductService, TimeService],
        styles: [`
      
@media only screen and (max-width: 991px) {
    .col-sm-11 {
    width: 100%!important;
    float: none;
}
.col-sm-4 {
    width: 100%!important;
    float: none;
}
}

  .first-row a{
    text-decoration: none;
}

        .date-header{
  margin: 0 auto;
  padding-bottom: 0px;
  width: 100%;
  display: inline-block;
  text-align: center;
  height: 80px;
  }  

  .progress{
    margin-top: 10px;
    margin-bottom: 10px!important;
  }

  .progrez{
    background-color: #01BAEF!important;
  }

  .progress-bar a{
    font-size: 15px;
    font-weight: 500;
    color: white;
    text-decoration: none;
    
  }

      .date-header img{
        height: 75px;
        display: inline-block;
      }

         #sign{
        font-family: "azo-sans-web",sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 4.5em;
        color: #181918;
        margin-right: 4px;
        }
        #lower-price-heading span{
        font-family: "azo-sans-web",sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 1.4em;
        color: #000000;
        }  
        #lower-price-heading{
           margin-top: -15px;
        margin-bottom: 10px;
        }
    #current-price{
        font-family: "azo-sans-web",sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 5em;
        color: #13D172;
} 

    .buy-section{
    text-align: center;
  }  
 


.product-title a{
font-family: "mr-eaves-xl-modern",sans-serif;
font-style: normal;
font-weight: 400;
  font-size: 28px;
  text-decoration: none;
  color: #333333;
  line-height: 30px;
  }  
.product-title{
  padding: 0px;
  text-align: center;
  display: inline-block;
  }  
.time-left{
  margin-top: 7px;
  }  

.shipping-details{
  margin-top: 8px;
  text-align: left;
  }    
.shipping-details a{
  text-decoration: none!important;
  color: black;
  font-size: 15px;
  }
.shipping-details span{
  margin-right: 7px;
  color: black;
  }  

.condition-details a{
  text-decoration: none!important;
  color: black;
  font-size: 15px;
  }  
.condition-details{
  margin-top: 8px;
  text-align: left;
  }  
.condition-details span{
  margin-right: 7px;
  color: black;
  }  
.emerald-flat-button {
  margin-top: 5px;  
  position: relative;
  vertical-align: top;
  width: 100%;
  height: 70px;
  padding-top: 7px;
  font-size: 35px;
  color: white;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  background: #2ecc71;
  border: 0;
  border-bottom: 2px solid #28be68;
  cursor: pointer;
  -webkit-box-shadow: inset 0 -2px #28be68;
  box-shadow: inset 0 -2px #28be68;
  outline: none;
}
.emerald-flat-button a{
font-size: 35px;
  color: white;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  text-decoration: none;
}
.emerald-flat-button:active {
  top: 2px;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.sold-flat-button {
  margin-top: 5px;  
  position: relative;
  vertical-align: top;
  width: 100%;
  height: 70px;
  padding-top: 7px;
  font-size: 35px;
  color: white;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  background: #F45151;
  border: 2px black solid;
  cursor: pointer;
  outline: none;
  cursor: not-allowed;
  box-shadow: none;
}
.sold-flat-button a{
  font-size: 35px;
  color: white;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  cursor: not-allowed;
}

.countdown{
  padding-top: 3px;               
  height: 34px;
  width: 100%;
  border-radius: 5px;
  border: 0.5pt #e5e5e5 solid;
  }
.countdown a{
  font-size: 18px;  
  text-decoration: none;
  color: #1e1e1d;
  }  
.countdown span{
  color: #070707;
  margin-left: 3px;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  }  
.countdown .glyphicon-info-sign{
  font-size: 15px;
  margin-left: 5px;
  color: #333131;
  text-decoration: none;
  }  
.pad-this{
padding-top: 25px;
}

    `],
    template:`
     <div class="col-sm-4 pad-this">
       
            <div class="col-sm-11 buy-section pull-left">
            <div class="row first-row">
                <div class="date-header">
                 <img src="/deals.svg">
                </div>
              </div>
            <div class="col-sm-12">
            
            <div class="buy-section">

              <div class="row">
                <div class="product-title">
                  <a *ngIf = "round1">{{products.name}}</a>
                  <a  *ngIf = "round2">{{products.name}}</a>

                  </div>
                </div>
                <div class="row">
                 <div id="item-price" *ngIf = "round1">
                            <span id="sign">$</span><span id="current-price">{{dollars}}.{{cents| number: '2.0'}}</span>
                 </div>

                 <div id="item-price" *ngIf = "round2">
                            <span id="sign">$</span><span id="current-price">{{dollars}}.{{cents| number: '2.0'}}</span>
                 </div>
                 <div id="lower-price-heading" *ngIf="inStock"><span>Current Price</span></div>
                 <div id="lower-price-heading" *ngIf="soldOut"><span>Final Price</span></div>
                </div>

              <div class="row" *ngIf="inStock">

                  <div class="countdown" [@timerState]="timeState">
                    <a>Price going up in:<span>{{minutes}}:{{seconds| number: '2.0'}}</span></a>
                   
                    </div>

               </div>
              <div class="row time-left">
                </div>

              <div class="row" *ngIf="inStock">
                <div class="progress">
              <div class="progress-bar progrez" role="progressbar"
              [attr.aria-valuenow]="value" aria-valuemin="0" aria-valuemax="100" [style.width]="value+'%'">
                 <a>Inventory Left</a>
              </div>
          </div>
                </div>


                <div class="row" *ngIf ="inStock">
                   <div class="emerald-flat-button" *ngIf="!auth.authenticated()" (click)="auth.login()">
                            <a>Grab It!</a>

                            </div>

               <div class="emerald-flat-button" *ngIf="auth.authenticated()" (click)="showDialog = !showDialog">
                            <a>Grab It!</a>
                            </div>
               </div>

               <div class="row" *ngIf="soldOut">
                 <div class="sold-flat-button">
                   <a>Sold Out</a>
                 </div>
               </div>


            </div>
            </div>
            </div>
            </div>

                        <app-dialog [(visible)]="showDialog"> 
                          
                        </app-dialog>
        `,
  animations: [
    trigger('timerState', [
       state('1',   style({
        backgroundColor: '#FCFCFC',
       
      })),
        state('2',   style({
        backgroundColor: '#FFED45',
      })),
         state('3',   style({
        backgroundColor: '#FF4545',

      })),
     transition('1 => 2', [

       style({
    backgroundColor: '#F6FFA4',
  }),animate(1000)
    ]),
    transition('2 => 3', [
       style({
    backgroundColor: '#F49090',  
  }),animate(1000)
    ]),
     transition('3 => 1', [
       style({
    backgroundColor: '#EDEDED',
  }),animate(1000)
    ])       

    ])
  ]
})

export class BuyItemSectionComponent{
  colorNone: boolean;
  colorWarn: boolean;
  colorRed: boolean;
   //-----Time and Blur--------------
  //----------------------------
  now = new Date().getHours(); 
  nowMins = new Date().getMinutes();
  isActive = false;
  hoursUntilStart = 11-this.now;
  minsUntilStart = 60-this.nowMins;
  hoursUntilEnd = 23-this.now;
  minsUntilEnd = 60-this.nowMins;
  //----------------------------
  //----------------------------
    soldOut: boolean;
    inStock: boolean;
    minutes: number;
    seconds: number;
    rate: number;
    dollars: number;
    timeState: number;
    addonDollars: number;
    timeStart: string;
    timeEnd: string;
    cents: number;
    total: number;
    name: string;
    timeArray = [];
    priceArray = [];
    priceDollars: number;
    priceCents: number;
    priceTotal: number;
    timeMinutes: number;
    timeSeconds: number;
    userInfo: any;
    products = [];
    value: number;
    remainingInt: number;
    constructor(private productService: ProductService, private auth: Auth, private router: Router, private timeService: TimeService){
        this.resetTimer();
        this.total=(this.dollars*100)+this.cents;
        setInterval(()=>this.tick(),975);
        setInterval(()=>this.completeUpdate(), 10000);
        setInterval(()=>this.updateRoundNumber(), 10000);
         this.name = '';
    let dp = new DatePipe('de-DE');
    this.name = dp.transform(new Date(), 'ddMMyyyy');

    let date = this.name;
    let addonDollars: number;
    let remaining: number;
    let quantity: number;

     this.productService.fetchData(date).subscribe(
      (data) => {
        this.products = data
        this.timeStart = data.time;
        this.timeEnd = data.timeEnd;
        this.addonDollars = data.price;
        this.rate = data.rate
        remaining = data.remaining;
        quantity = data.quantity;
        this.value = Math.round((remaining/quantity)*(100));
        this.remainingInt = remaining;
        
        this.checkSoldOut(this.remainingInt);
        //console.log(this.value);
      });

     this.timeService.fetchTime().subscribe(
        (data) => {
            this.timeArray = data;
            this.timeMinutes = data.minutes;
            this.timeSeconds = data.seconds;
            this.updateTime(this.timeMinutes, this.timeSeconds);
        });

     this.timeService.fetchPrice().subscribe(
        (data) => {
            this.priceArray = data;
            this.priceDollars = data.dollars;
            this.priceCents = data.cents;
            this.priceTotal = data.total;
            this.updatePrice(this.priceDollars, this.priceCents, this.priceTotal, this.addonDollars);
        }); 

      this.timeService.fetchActive().subscribe(
      (data) => {
          this.result = data;
          this.nowActive = data.isActive;
          this.roundNumber = data.round;
          this.updateRoundNumber();
      });

}

    nowActive = false;
    result = [];
    roundNumber = 0;
    round2 = false;
    round1 = false;

    updateRoundNumber(){
       if (this.roundNumber == 2){
             this.round2 = true;
             this.round1 = false;
           }
           if (this.roundNumber == 1){
             this.round1 = true;
             this.round2 = false;
           }
    }

    completeUpdate(){
          let dp = new DatePipe('de-DE');
    this.name = dp.transform(new Date(), 'ddMMyyyy');

    let date = this.name;
    let addonDollars: number;
    let remaining: number;
    let quantity: number;
       this.timeService.fetchTime().subscribe(
        (data) => {
            this.timeArray = data;
            this.timeMinutes = data.minutes;
            this.timeSeconds = data.seconds;
            this.updateTime(this.timeMinutes, this.timeSeconds);
        });

     this.timeService.fetchPrice().subscribe(
        (data) => {
            this.priceArray = data;
            this.priceDollars = data.dollars;
            this.priceCents = data.cents;
            this.priceTotal = data.total;
            this.updatePrice(this.priceDollars, this.priceCents, this.priceTotal, this.addonDollars);
        }); 
     this.productService.fetchData(date).subscribe(

      (data) => {
        this.products = data
        this.rate = data.rate
        remaining = data.remaining;
        quantity = data.quantity;
        this.value = Math.round((remaining/quantity)*(100));
       // console.log(addonDollars + typeof addonDollars);
       // console.log('Remaining ' + this.value);
       // console.log('Remaining integer '+remaining);
        this.remainingInt = remaining;
      });
     this.checkSoldOut(this.remainingInt);


    }

    checkSoldOut(remaining){
      if (remaining == 0){
       // console.log('SOLD OUT');
        this.soldOut = true;
        this.inStock = false;

      }
      else{
      //  console.log('IN STOCK');
        this.inStock = true;
        this.soldOut = false;
      }
    }

    updatePrice(dollars, cents, total, addon){
        this.dollars = parseInt(dollars)+addon;
        this.cents = cents;
        this.total = total;
    } 

    buyItem(): void{
       // console.log(this.total);
    }

    updateTime(minutes, seconds){
        this.minutes = minutes;
        this.seconds = seconds;
    }

    resetTimer(){
        this.minutes = this.timeMinutes;
        this.seconds = this.timeSeconds;
    }

  

    private tick(): void{
        if(this.cents>99){
            this.dollars++;
            this.cents=0;
        }
        if (--this.seconds < 0){
            this.seconds =59;
            if(--this.minutes < 0){
                this.minutes =1;
                this.seconds =59;
               this.cents = this.cents + this.rate;
               this.total = this.total + this.rate;
            }
        }

        if (this.seconds <= 30 && this.seconds > 9 && this.minutes == 0){
          this.timeState = 2;

        }
        if (this.seconds <= 9 && this.minutes == 0){
          this.timeState = 3;
        }

        if (this.seconds >= 31 || this.minutes == 1){
          this.timeState = 1;
        }
    }

    ngOnInit(){
       this.name = '';
    let dp = new DatePipe('de-DE');
    this.name = dp.transform(new Date(), 'ddMMyyyy');
    let date = this.name;
    this.productService.fetchData(date).subscribe(
      (data) => this.products = data);
   
  this.timeService.fetchPrice().subscribe(
        (data) => {
            this.priceArray = data;
            this.priceDollars = data.dollars;
            this.priceCents = data.cents;
            this.priceTotal = data.total;
            this.updatePrice(this.priceDollars, this.priceCents, this.priceTotal, this.addonDollars);
        }); 
  }

}

