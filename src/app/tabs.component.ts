import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import { ProductService } from './products.service';
import { TimeService } from './time.service';

@Component({
    selector: 'tabs',
    styles: [`

.panel-group{
  width: 100%;
  float: left;
}

.description a{
  text-align: left;
  font-family: "acumin-pro",sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  text-decoration: none;
  color: black;
}

.description p{
  font-family: "acumin-pro",sans-serif;
  text-align: left;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #151616;
}

.panel-title a{
  display: block;
}

i{
  margin-right:5px;
}

#accordion1{
  margin-right: 25px;
}

.smallBox{
  width: 100%;
  height: 400px;
}

.header {
    width: 100%;
}

.button a {
    float: right;
    padding: 15px;
    display: block;
    text-decoration: none;
    color: #999;
    border: 2px solid #999;
    border-radius: 3px;
}

.button a:hover {
    color: #000;
    border: 2px solid #000;
    transition: 2s;
}

img {
    max-width: 100%;
}

.related {
    text-align: center;
    padding: 5em 0;
}

.related > a {
  width: calc(100% - 20px);
  max-width: 340px;
  border: 3px solid #f0f0f0;
  border-color: initial;
  display: inline-block;
  text-align: center;
  margin: 20px 10px;
  padding: 25px;
  border-radius: 3px;
}

.related a img {
  max-width: 100%;
  opacity: 0.8;
}

.related a h3 {
  margin: 0;
  padding: 0.5em 0 0.3em;
  max-width: 300px;
  text-align: left;
}

.related p{
  font-size: 1.4em;
  color: #ccc;
}

*,
*:after,
*:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}

.clearfix:after {
    clear: both;
}

body {
    font-family: sans-serif;
    background: #f6f9fa;
}

h1 {
    color: #ccc;
    text-align: center;
}

a {
  text-decoration: none;
  outline: none;
}

/*Fun begins*/
.tab_container {
    width: 100%;
    margin: 0 auto;
    padding-top: 10px;
    position: relative;
}

input, section {
  clear: both;
  padding-top: 10px;
  display: none;
}

label {
  font-weight: 700;
  font-size: 18px;
  display: block;
  float: left;
  width: 20%;
  padding: 1.5em;
  color: #757575;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  background: #f0f0f0;
}

.label2 {
  
  width: 25%!important;
 
}

#tab1:checked ~ #content1,
#tab2:checked ~ #content2,
#tab3:checked ~ #content3,
#tab4:checked ~ #content4,
#tab5:checked ~ #content5 {
  display: block;

  background: #fff;


}

.tab_container .tab-content p,
.tab_container .tab-content a {
  -webkit-animation: fadeInScale 0.7s ease-in-out;
  -moz-animation: fadeInScale 0.7s ease-in-out;
  animation: fadeInScale 0.7s ease-in-out;
}
.tab_container .tab-content h3  {
  text-align: center;
}

.tab_container [id^="tab"]:checked + label {
  background: #fff;
  box-shadow: inset 0 3px #01BAEF;
}

.tab_container [id^="tab"]:checked + label .fa {
  color: #01BAEF;
}

label .fa {
  font-size: 1.3em;
  margin: 0 0.4em 0 0;
}

/*Media query*/
@media only screen and (max-width: 930px) {
  label span {
    font-size: 14px;
  }
  label .fa {
    font-size: 14px;
  }
}

@media only screen and (max-width: 768px) {
  label span {
    display: none;
  }

  label .fa {
    font-size: 16px;
  }

  .tab_container {
    width: 98%;
  }
}

/*Content Animation*/
@keyframes fadeInScale {
  0% {
      transform: scale(0.96);
      opacity: 0;
  }
  
  100% {
      transform: scale(1);
      opacity: 1;
  }
}

    `],
    providers: [ProductService, TimeService],
    template:`
   

    <div class="tab_container" *ngIf="!round3">
            <input id="tab1" type="radio" name="tabs" checked>
            <label for="tab1"><i class="fa fa-barcode"></i><span>Description</span></label>

            <input id="tab2" type="radio" name="tabs">
            <label for="tab2"><i class="fa fa-check-circle"></i><span>About</span></label>

            <input id="tab3" type="radio" name="tabs">
            <label for="tab3"><i class="fa fa-info"></i><span>FAQs</span></label>

            <input id="tab4" type="radio" name="tabs">
            <label for="tab4"><i class="fa fa-truck"></i><span>Shipping</span></label>

            <input id="tab5" type="radio" name="tabs">
            <label for="tab5"><i class="fa fa-users"></i><span>Support</span></label>

            <section id="content1" class="tab-content">

            <div class="col-md-12">
              <div class="row description" [ngStyle]="{'margin-bottom': '15px'}">
              <div class="col-md-6">
                <a>Product Overview</a>
                  <p>{{description}}

                  </p><br>
                  </div>
                  <div class="col-md-6">
                  <a>Features</a>
                 
                  <ul>
                    <li>{{feature1}}</li>
                    <li>{{feature2}}</li>
                    <li>{{feature3}}</li>
                    <li>{{feature4}}</li>
                    <li>{{feature5}}</li>
                  </ul>
                  <br>

                  <a>Condition</a>
                  <p>{{condition}}</p><br>

                  <a>Packaging</a>
                  <p>{{packaging}}</p>
                  </div>
              </div>
            </div>
            </section>

            <section id="content2" class="tab-content">
               <div class="col-md-12">
              <div class="row" [ngStyle]="{'margin-bottom': '15px'}">
                <h3>About Expase</h3>
                  <p>
                  Expase is the newest place to buy different products everyday at a fraction of the cost of retail. Each day at Noon and 6 P.M. EST, a different product or bundle
                  will go on sale, starting at a base price. Every two minutes, the price increases by a set amount (price inrease varies per product). After the 6 hours that each item is live, 
                  the item will no longer be for sale. Additionally, if the item sells out before it's time limit is reached, the item will no longer be for sale. Expase introduces a fun 
                  new way to shop for hot products at a much lower price than anywhere else online!
                  </p>
              </div>
            </div>
            </section>

            <section id="content3" class="tab-content">
               <div class="col-md-12">
              <div class="row" [ngStyle]="{'margin-bottom': '15px'}">
                  <div class="smallBox">
                    <div class="col-md-12">

             
                    

<div class="panel-group" id="accordion1">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseOne">
          Why do the deals start at Noon and 6 P.M. EST?
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in">
      <div class="panel-body">
       We only sell to the United Sates, and we sell in two rounds, one deal from 12:00-5:59 P.M. EST, and another deal from 6:00 P.M. to 11:59 P.M. EST. We picked these times so that people from every time zone in the country have an equal chance to buy the same products at incredible prices.
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseTwo">
          Can I buy any products after Midnight up till Noon EST? 
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse">
      <div class="panel-body">

        After midnight up till the next deal the following day is the "intermission" period. We are preparing the next big deal for the next day, and you will not be able to purchase anything from the site during this time. A timer will be displayed on the website to countdown the hours until the next deal begins.

      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseThree">
           Why is Expase only one page?</a>

      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse">
      <div class="panel-body">
      Espase.com was developed with simplicity in mind. We want to give you a great product at a great price, twice a day. Because of this vision in mind, we developed a web application that would make it as easy as possible for customers to sign up, log in, and checkout without any hassles or unnecessary steps to navigate through. 
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseFour">
          What does the "Grab It" button do?
        </a>
      </h4>
    </div>
    <div id="collapseFour" class="panel-collapse collapse">
      <div class="panel-body">

      The "Grab It button is how you lock in your price that the current deal is at. When you press the button, it takes you to the check out screen (if you are logged in). Form the checkout screen, you have a limited time to check out before your price is released and you have to start over again. Hurry!
        
      </div>
    </div>
  </div>



</div>
</div> 
</div> 
            
              </div>
            </div>
            </section>

            <section id="content4" class="tab-content">
               <div class="col-md-12">
              <div class="row" [ngStyle]="{'margin-bottom': '15px'}">
                <h3>Expase Shipping</h3>
                  <p>
                  We ship 100% free anywhere in the United States (except Alaska and Hawaii). Depending on the item's size, we may ship FedEx or USPS, and tracking is always provided for all orders. We ship next day, except for deals on saturday, which ship monday (as well as deals on sunday).
                  </p>
              </div>
            </div>
            </section>

            <section id="content5" class="tab-content">
              <div class="col-md-12">
              <div class="row" [ngStyle]="{'margin-bottom': '15px'}">
                <h3>Headline 1</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            </div>
            </section>
        </div>












    <div class="tab_container" *ngIf="round3">
            
           

            <input id="tab2" type="radio" name="tabs" checked>
            <label for="tab2" class="label2"><i class="fa fa-check-circle"></i><span>About</span></label>

            <input id="tab3" type="radio" name="tabs">
            <label for="tab3" class="label2"><i class="fa fa-info"></i><span>FAQs</span></label>

            <input id="tab4" type="radio" name="tabs">
            <label for="tab4" class="label2"><i class="fa fa-truck"></i><span>Shipping</span></label>

            <input id="tab5" type="radio" name="tabs">
            <label for="tab5" class="label2"><i class="fa fa-users"></i><span>Support</span></label>



          

            <section id="content2" class="tab-content">
               <div class="col-md-12">
              <div class="row" [ngStyle]="{'margin-bottom': '15px'}">
                <h3>About Expase</h3>
                  <p>
                  Expase is the newest place to buy different products everyday at a fraction of the cost of retail. Each day at Noon and 6 P.M. EST, a different product or bundle
                  will go on sale, starting at a base price. Every two minutes, the price increases by a set amount (price inrease varies per product). After the 6 hours that each item is live, 
                  the item will no longer be for sale. Additionally, if the item sells out before it's time limit is reached, the item will no longer be for sale. Expase introduces a fun 
                  new way to shop for hot products at a much lower price than anywhere else online!
                  </p>
              </div>
            </div>
            </section>

            <section id="content3" class="tab-content">
               <div class="col-md-12">
              <div class="row" [ngStyle]="{'margin-bottom': '15px'}">
                  <div class="smallBox">
                    <div class="col-md-12">

             
                    

<div class="panel-group" id="accordion1">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseOne">
          Question 1
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in">
      <div class="panel-body">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseTwo">
          Question 2
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse">
      <div class="panel-body">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseThree">
           Question 3</a>

      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse">
      <div class="panel-body">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseFour">
          Question 4
        </a>
      </h4>
    </div>
    <div id="collapseFour" class="panel-collapse collapse">
      <div class="panel-body">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseFive">
          Question 5
        </a>
      </h4>
    </div>
    <div id="collapseFive" class="panel-collapse collapse">
      <div class="panel-body">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </div>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion1" href="#collapseSix">
          Question 6
        </a>
      </h4>
    </div>
    <div id="collapseSix" class="panel-collapse collapse">
      <div class="panel-body">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </div>
    </div>
  </div>
</div>
</div> 
</div> 
            
              </div>
            </div>
            </section>

            <section id="content4" class="tab-content">
               <div class="col-md-12">
              <div class="row" [ngStyle]="{'margin-bottom': '15px'}">
                <h3>Headline 1</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            </div>
            </section>

            <section id="content5" class="tab-content">
              <div class="col-md-12">
              <div class="row" [ngStyle]="{'margin-bottom': '15px'}">
                <h3>Headline 1</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            </div>
            </section>
        </div>
`})


export class TabsComponent{
     products = [];
    roundNumber = 0;
    round2: boolean;
    round1: boolean;
    round3: boolean;
    remainingInt: number;
    isActive = false;
    result = [];
    description: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    feature5: string;
    condition: string;
    packaging: string;
    name: string;
    constructor(private productService: ProductService, private timeService: TimeService){
      this.updateTabs();


     this.timeService.fetchActive().subscribe(
      (data) => {
          this.result = data;
          this.isActive = data.isActive;
          this.roundNumber = data.round;
          this.updateRoundNumber();
      });
     setInterval(()=>this.updateRoundNumber(), 10000);
     setInterval(()=>this.resetStartEnd(), 10000);
        
        this.resetStartEnd();
        this.updateRoundNumber();
  }


    updateTabs(){
      let remaining: number;
         this.name = '';
    let dp = new DatePipe('de-DE');
    this.name = dp.transform(new Date(), 'ddMMyyyy');
    let date = this.name;

      this.productService.fetchData(date).subscribe(
      (data) => {
       this.products = data;
       this.feature1 = data.feature1;
       this.feature2 = data.feature2;
       this.feature3 = data.feature3;
       this.feature4 = data.feature4;
       this.feature5 = data.feature5;
       this.condition = data.condition;
       this.description = data.description;
       this.packaging = data.shipping;
      });
    }

    resetStartEnd(){
    this.timeService.fetchActive().subscribe(
      (data) => {
          this.result = data;
          this.isActive = data.isActive;
      });
  
    }

    

   updateRoundNumber(){
     console.log(this.roundNumber);
     console.log('Round 1 is '+this.round1);
     console.log('Round 2 is '+this.round2);
     console.log('Round 3 is '+this.round3);
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
             this.round3 = true;

           }
    }


}