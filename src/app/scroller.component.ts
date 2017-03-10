import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';
import { ProductService } from './products.service';
import { DatePipe } from '@angular/common';
import { TimeService } from './time.service';

@Component({
    selector: 'scroller-component',
     providers: [ProductService],
      styles: [`
     .shipping-notification{
            width: 100%;
            height: 35px;
            background-image: url("http://hulte.com/noisy-texture.png");
            -webkit-box-shadow: 0px 1px 1px 0px rgba(31,30,31,0.75);
            -moz-box-shadow: 0px 1px 1px 0px rgba(31,30,31,0.75);
            box-shadow: 0px 1px 1px 0px rgba(31,30,31,0.45);
            padding-top: 9px;
            margin-bottom: 15px;
            }
            .marquee {
    width: 100%;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;    
}
.marquee span {
    display: inline-block;
    padding-left: 100%;
    text-indent: 0;
    animation: marquee 50s linear infinite;
    color: white;
   font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
    font-size: 1.4em;
    margin-top: -4px;
}
@keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
}
     `],
    template:`
    <div class="row">
        <div class="shipping-notification">
        <p class="marquee">

        <span *ngIf="round1">This deal will end in 3 hours and 20 minutes. The next deal will start at 6 p.m. EST.  </span>
        <span *ngIf="round2">This deal will end in 2 hours and 10 minutes. The next deal will start at 6 p.m. EST.  </span>
        <span *ngIf="round3">The next deal will begin at Noon (eastern standard time). All shipping is free to continental U.S. which does not include Alaska or Hawaii. Shipping only to the United States.    </span>

        </p>
    </div>
        </div>
`
})

export class ScrollerComponent{
	name: string;
	hoursLeft: number;
    products = [];
    roundNumber = 0;
    round2 = false;
    round1 = false;
    round3 = false;
    remainingInt: number;
    isActive = false;
    result = [];
    now = new Date().getHours(); 
    nowMins = new Date().getMinutes();
    minsUntilStart = 60-this.nowMins;
    minsUntilEnd = 60-this.nowMins;
    constructor(private productService: ProductService, private timeService: TimeService){
    	this.name = '';
		let dp = new DatePipe('de-DE');
    	this.name = dp.transform(new Date(), 'ddMMyyyy');
        let remaining: number;
     this.timeService.fetchActive().subscribe(
      (data) => {
          this.result = data;
          this.isActive = data.isActive;
          this.hoursLeft = data.hoursLeft;
          this.roundNumber = data.round;
          this.updateRoundNumber();
      });
     setInterval(()=>this.updateRoundNumber(), 10000);
     setInterval(()=>this.resetStartEnd(), 10000);
        
        this.resetStartEnd();
	}

	ngOnInit(){
	let date = this.name;
    this.productService.fetchData(date).subscribe(
      (data) => this.products = data);
	}

    resetStartEnd(){
    this.timeService.fetchActive().subscribe(
      (data) => {
          this.result = data;
          this.isActive = data.isActive;
          this.hoursLeft = data.hoursLeft;
      });
   // console.log(this.result);
    this.now = new Date().getHours(); 
    this.nowMins = new Date().getMinutes();
    this.minsUntilStart = 59-this.nowMins;
    this.minsUntilEnd = 59-this.nowMins;
    }

   updateRoundNumber(){
       if (this.roundNumber == 2){
             this.round2 = true;
             this.round1 = false;
             this.round3 = false;
           }
           if (this.roundNumber == 1){
             this.round1 = true;
             this.round2 = false;
             this.round3 = false;
           }
           if (this.roundNumber == 3){
             this.round3 = true;
             this.round2 = false;
             this.round1 = false;
           }
    }
	

}