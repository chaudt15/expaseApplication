import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import {HeaderComponent} from './header.component';
import {ScrollerComponent} from './scroller.component';
import {ItemSectionComponent} from './item-section.component';
import {BuyItemSectionComponent} from './buy-item-section.component';
import {RestfulComponent} from './restful.component';
import {TabsComponent} from './tabs.component';
import {FooterComponent} from './footer.component';
import { TimeService } from './time.service';


@Component({
  providers: [TimeService],
  selector: 'main',
  styles:[`
    .container-main{
   
        border: 0.3pt #d6d6d6 solid;
        background-color: #ffffff;
        margin-top: 30px;
    }
    @media only screen and (max-width: 404px) {
      .container-main{
        margin-top: 0px;
      }
}

.intermission{
display: inline-block;
height: auto;
width: 100%;
text-align: center;
}
.intermission a{
text-decoration: none;
font-family: "myriad-pro",sans-serif;
font-style: normal;
font-weight: 400;
font-size: 55px;
color: #151615;
}    
  `],
  template: `
  <header-component></header-component>
    <div class="container container-main">   
    <scroller-component></scroller-component>

        <div class="row" *ngIf = "round1 || round2">
            <pictures></pictures>
            <buyitemsection></buyitemsection>
        </div>

        <div class="row" *ngIf = "round3">
          <div class="intermission">
            <div class="col-md-12">
              <a>Next Deal Begins In:<br> <span>{{hoursLeft}}</span> Hours and <span>{{minsUntilStart}}</span> Minutes</a>
            </div>
          </div>
        </div>
      
        <tabs></tabs>
    </div>
   <footer-component></footer-component> 
  `
})



export class HomeScreenComponent {
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
  constructor(private auth: Auth, private timeService: TimeService) {
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
};

