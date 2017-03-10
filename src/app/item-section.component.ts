import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import { ProductService } from './products.service';
import { TimeService } from './time.service';

@Component({
    selector: 'pictures',
    styles: [`

    .deal-ends{
        text-decoration: none;
    }
    .entry-social {margin-top: 10px; margin-bottom: 20px;color: rgb(126, 126, 126);display: block;font-family: 'Open Sans',Tahoma, Verdana, Arial, sans-serif, Faruma, Faseyha;font-size: 14px;font-weight: normal;height: auto;line-height:23.799999237060547px;margin-bottom: 20px;width: 100%;
width: 100%;float:left;border: solid 0px #aaa;text-align: center;}
.entry-social div {display: block;width:138px;margin:2px;display: inline-block;  
    vertical-align: middle;}
.entry-social a {text-decoration:none;display: block;padding-left: 20px;color: #FFFFFF !important;font-weight: bold;transition:background-color .3s;    }
.entry-social .fb a {padding: 7px 10px 7px 26px;background: #3B5999 url('http://3.bp.blogspot.com/-yqD2363XuAo/UeDk98twSlI/AAAAAAAAArg/kXIzFBWmczM/s1600/fb14.png') no-repeat 10px center;}
.entry-social .twitter a {padding: 7px 10px 7px 32px;background: #01BBF6 url('http://3.bp.blogspot.com/-0u8P4VQmEeU/UeDlVdilwcI/AAAAAAAAAro/lGTnlvHGyVw/s1600/twitter14.png') no-repeat 8px center;}
.entry-social .gplus a {padding: 7px 10px 7px 32px;background: #D54135 url('http://3.bp.blogspot.com/-A8fFRexz_zk/UeDlgadvpiI/AAAAAAAAArw/TRd7NWNwo9s/s1600/gplus14.png') no-repeat 10px center;}
.entry-social .pinterest a {padding: 7px 10px 7px 32px;background: #CB2027 url('http://1.bp.blogspot.com/-v-ZkEQhYpug/UeDl6uIio-I/AAAAAAAAAsA/9rqq2cXT08k/s320/pinterest14.png') no-repeat 10px center;}
.entry-social .fb a:hover {background-color: rgb(50, 75, 129);}
.entry-social .twitter a:hover {background-color: rgb(1, 159, 211);}
.entry-social .gplus a:hover {background-color: rgb(191, 52, 40);}
.entry-social .linkedin a:hover {background-color: rgb(15, 89, 125);}
.entry-social .pinterest a:hover {background-color: rgb(174, 28, 35);}
.glyphicon-time {
    font-size: 20px;
    color: #05dd7b!important;
}
.slider{
    width: 640px; /*Same as width of the large image*/
    position: relative;
    /*Instead of height we will use padding*/
    padding-top: 320px; /*That helps bring the labels down*/
    margin: 50px auto;
    margin-top: 15px;
}



.gradient-overlay{
 display: block;
  position: absolute;
    background: -moz-radial-gradient(center, ellipse cover,  rgba(21,21,21,0.85) 0%, rgba(33,33,33,0.85) 100%);
    background: -webkit-radial-gradient(center, ellipse cover,  rgba(21,21,21,0.85) 0%,rgba(33,33,33,0.85) 100%);
    background: radial-gradient(ellipse at center,  rgba(21,21,21,0.85) 0%,rgba(33,33,33,0.85) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6151515', endColorstr='#00212121',GradientType=1 );
  top: 0px;
  height: 100%;
  width: 100%;
  content: '';
}

.sold-out-overlay{
    display: block;
    position: absolute;
    background: -moz-radial-gradient(center, ellipse cover,  rgba(26,26,26,1) 0%, rgba(0,0,0,0.5) 100%);
background: -webkit-radial-gradient(center, ellipse cover,  rgba(26,26,26,1) 0%,rgba(0,0,0,0.5) 100%);
background: radial-gradient(ellipse at center,  rgba(26,26,26,1) 0%,rgba(0,0,0,0.5) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a61a1a1a', endColorstr='#00000000',GradientType=1 );

    width: 45%;
    margin-left: 27.5%;
    height: 100px;
    margin-top: 100px;
    top: 0px;
    border: 2px #F45151 solid;
    text-align: center;
}
.sold-out-overlay-text{
    margin-top: 18px;
}

.sold-out-overlay-text a{
    color: #F7F5F5;
    font-family: "myriad-pro",sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    text-decoration: none;

}


.slider>img{
    position: absolute;
    left: 0; top: 0;
    transition: all 0.5s;
}
.slider input[name='slide_switch'] {
    display: none;
}
.slider label {
    /*Lets add some spacing for the thumbnails*/
    margin: 18px 0 0 18px;
    border: 2px solid #FFF;
    float: left;
    cursor: pointer;
    transition: all 0.5s;
    /*Default style = low opacity*/
    opacity: 0.9;
}
.slider label img{
    display: block;
}
/*Time to add the click effects*/
.slider input[name='slide_switch']:checked+label {
    border-color: #2B2B2B;
    opacity: 1;
}
/*Clicking any thumbnail now should change its opacity(style)*/
/*Time to work on the main images*/
.slider input[name='slide_switch'] ~ img {
    opacity: 0;
    transform: scale(1);
}
/*That hides all main images at a 110% size
On click the images will be displayed at normal size to complete the effect
*/
.slider input[name='slide_switch']:checked+label+img {
    opacity: 1;
    transform: scale(1);
}    
.more-item-details{
    text-align: center;
    margin-top: 5px;
    }

.more-item-details a{
        font-family: "futura-pt",sans-serif;
        font-style: normal;
        font-weight: 400;
        text-decoration: none;
        font-size: 2em;
        color: #101110;
        margin-left: 7px;
        }   
    .more-item-details span{
        color: #39b54a;
        }





@media only screen and (max-width: 670px) {
    .slider{
    width: 400px; /*Same as width of the large image*/
    position: relative;
    /*Instead of height we will use padding*/
    padding-top: 200px; /*That helps bring the labels down*/
    
    margin: 50px auto;
    margin-top: 15px;
    
}

.slider>img{
    position: absolute;
    left: 0; top: 0;
    transition: all 0.5s;
  max-width:100%;
max-height:100%;
}
.slider input[name='slide_switch'] {
    display: none;
}
.slider label {
    /*Lets add some spacing for the thumbnails*/
    margin: 18px 0 0 18px;
    float: left;
    cursor: pointer;
    transition: all 0.5s;
    /*Default style = low opacity*/
    opacity: 0.9;
}
.slider label img{
    display: block;
}
/*Time to add the click effects*/
.slider input[name='slide_switch']:checked+label {
    border-color: #2B2B2B;
    opacity: 1;
}
/*Clicking any thumbnail now should change its opacity(style)*/
/*Time to work on the main images*/
.slider input[name='slide_switch'] ~ img {
    opacity: 0;
    transform: scale(1);
}
/*That hides all main images at a 110% size
On click the images will be displayed at normal size to complete the effect
*/
.slider input[name='slide_switch']:checked+label+img {
    opacity: 1;
    transform: scale(1);
}    



.sold-out-overlay{
    height: 60px;
    margin-top: 70px;
}
.sold-out-overlay-text{
   margin-top: 6px;
}

.sold-out-overlay-text a{
    font-size: 30px;
}



}

@media only screen and (max-width: 404px) {
.slider {
    width: 300px;
    position: relative;
    padding-top: 150px;
    margin: 0px auto;
    margin-top: 15px;
}
.sold-out-overlay{
    height: 50px;
    margin-top: 50px;
}
.sold-out-overlay-text{
   margin-top: 6px;
}

.sold-out-overlay-text a{
    font-size: 25px;
}
}

    `],
    providers: [ProductService, TimeService],
    template:`
      <div class="col-md-8 image-section">        
                <div class="item-image-section">
        <div class="row">
        <div class="slider">

    <input type="radio" name="slide_switch" id="id1"/>
    <label for="id1">
        <img src="{{products.imageOne}}" width="100"/>
    </label>
    <img src="{{products.imageOne}}" />
    
    <!--Lets show the second image by default on page load-->
    <input type="radio" name="slide_switch" id="id2" checked="checked"/>
    <label for="id2">
        <img src="{{products.imageTwo}}" width="100"/>
    </label>
    <img src="{{products.imageTwo}}"/>
    
    <input type="radio" name="slide_switch" id="id3"/>
    <label for="id3">
        <img src="{{products.imageThree}}" width="100"/>
    </label>
    <img src="{{products.imageThree}}"/>
    
    <input type="radio" name="slide_switch" id="id4"/>
    <label for="id4">
        <img src="{{products.imageFour}}" width="100"/>
    </label>
    <img src="{{products.imageFour}}"/>
    
    <input type="radio" name="slide_switch" id="id5"/>
    <label for="id5">
        <img src="{{products.imageFive}}" width="100"/>
    </label>
    <img src="{{products.imageFive}}"/>
    <div class="gradient-overlay" *ngIf="soldOut"></div>
    <div class="sold-out-overlay" *ngIf="soldOut">
        <div class="sold-out-overlay-text" *ngIf="soldOut">
            <a>SOLD OUT</a>
        </div>
    </div>
</div>
    </div>   
    </div>   
<!--
        <div class="row">
        <div *ngIf ="!isActive" class="more-item-details">
            <span class="glyphicon glyphicon-time"></span><a>Deal Starts In: <span>{{hoursLeft}}</span> Hours and <span>{{minsUntilStart}}</span> Minutes</a> 
        </div>
        <div *ngIf = "isActive" class="more-item-details">
        <span class="glyphicon glyphicon-time"></span><a class="deal-ends">Deal Ends In: <span>{{hoursLeft}}</span> Hours and <span>{{minsUntilEnd}}</span> Minutes</a>
        </div>
        </div>
-->


        <div class="row">
         <div class="entry-social">
<div class="fb">
<a href="Your_Facebok_Page" target="_blank">Facebook</a>
</div>
<div class="twitter">
<a href="Your_twitter_Profile" target="_blank">Twitter</a>
</div>
<div class="gplus">
<a href="Your_Googleplus_Follow" target="_blank">Google+</a>
</div>
<div class="pinterest">
<a href="You_Pinterest_Page" target="_blank">Pinterest</a>
</div>

</div>
        </div>
            </div>
`
})
export class ItemSectionComponent{
    hours: number;
    soldOut: boolean;
    inStock: boolean;
    result = [];
    now = new Date().getHours(); 
    nowMins = new Date().getMinutes();
    minsUntilStart = 60-this.nowMins;
    minsUntilEnd = 60-this.nowMins;
    isActive = false;
    minutes: number;
    seconds: number;
    hoursLeft: number;
    products = [];
    roundNumber = 0;
    round2 = false;
    round1 = false;
    name:string;
      value: number;
    remainingInt: number;
    constructor(private productService: ProductService, private timeService: TimeService){
        setInterval(()=>this.completeUpdate(), 10000);
        this.name = '';
        let remaining: number;
        let quantity: number;
        let dp = new DatePipe('de-DE');
        this.name = dp.transform(new Date(), 'ddMMyyyy');
        this.timeService.fetchActive().subscribe(
      (data) => {
          this.result = data;
          this.isActive = data.isActive;
          this.hoursLeft = data.hoursLeft;
          this.roundNumber = data.round;
        remaining = data.remaining;
        quantity = data.quantity;
        this.value = Math.round((remaining/quantity)*(100));
        this.remainingInt = remaining;
        this.checkSoldOut(this.remainingInt);
      });
        setInterval(()=>this.resetStartEnd(), 10000);
        setInterval(()=>this.updateRoundNumber(), 10000);
        this.resetStartEnd();

    }

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


       completeUpdate(){
    let dp = new DatePipe('de-DE');
    this.name = dp.transform(new Date(), 'ddMMyyyy');

    let date = this.name;
    let addonDollars: number;
    let remaining: number;
    let quantity: number;

       
     this.productService.fetchData(date).subscribe(

      (data) => {
        this.products = data
        remaining = data.remaining;
        quantity = data.quantity;
        this.value = Math.round((remaining/quantity)*(100));
     //   console.log(addonDollars + typeof addonDollars);
     //   console.log('Remaining ' + this.value);
     //   console.log('Remaining integer '+remaining);
        this.remainingInt = remaining;
      });
     this.checkSoldOut(this.remainingInt);
}


    checkSoldOut(remaining){
      if (remaining == 0){
     //   console.log('SOLD OUT');
        this.soldOut = true;
        this.inStock = false;
      }
      else{
      //  console.log('IN STOCK');
        this.inStock = true;
        this.soldOut = false;
      }
    }

    ngOnInit(){
    let date = this.name;
    this.productService.fetchData(date).subscribe(
      (data) => this.products = data
      );
  }
   

}