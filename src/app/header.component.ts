import {Component} from '@angular/core';
import { Auth }      from './auth.service';
import {ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Http, Response} from '@angular/http';
import { ProductService } from './products.service';
import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';
import { TimeService } from './time.service';


@Component({
    selector: 'header-component',
    styles: [`
   


    .navbar-right{
    padding-top: 10px;
    padding-bottom: 10px;

    }    
    
.tabular{
    margin-top: 15px;
    }



.navbar.white {
  min-height: 100px;
  margin-bottom: 0;
  border-radius: 0;
  background: #fff;
  border: 0;

  z-index: 999;
  -webkit-font-smoothing: antialiased; }
  @media (min-width: 360px) {
    .navbar.white {
       } }
  @media (min-width: 1200px) {
    .navbar.white .container {
      width: 1200px; } }
  
  @media only screen and (max-width: 768px) {
.slider{
    margin: 0px;
    padding-top: 0px;
    }
.shipping-notification{
    display: none;
    }

.navbar.white{
    min-height: 60px;
    }    
.body{
    padding-top: 150px;
    }            
}
#logo{
    min-width: 200px;

    margin-top: 22px;
    float: left;
    width: 200px;
    display: block;
}
    a, a:visited {
  text-decoration: none;
  color: #2b90d9;
  font-weight: 500;
}
a:hover, a:visited:hover {
  text-decoration: underline;
  color: #2482c7;
}


.button-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  margin: 10px;
  padding: 12px 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 60ms ease-in-out;
  transition: all 60ms ease-in-out;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;
  color: #fff;
  border: 0 none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 160px;
      -ms-flex: 0 0 160px;
          flex: 0 0 160px;
}
.welcome-back{
    margin-top: 9px;
    padding: 0.73em;
    border: 0.5pt black solid;
    border-radius: 4px;
}
.welcome-back span{
    font-size: 14px;
    text-decoration: none;
    color: black;
}

.button:hover {
  -webkit-transition: all 60ms ease;
  transition: all 60ms ease;
  opacity: .85;
}
.button:active {
  -webkit-transition: all 60ms ease;
  transition: all 60ms ease;
  opacity: .75;
}
.button:focus {
  outline: 1px dotted #959595;
  outline-offset: -4px;
}

.button.-regular {
  color: #202129;
  background-color: #edeeee;
}
.button.-regular:hover {
  color: #202129;
  background-color: #e1e2e2;
  opacity: 1;
}
.button.-regular:active {
  background-color: #d5d6d6;
  opacity: 1;
}

.button.-dark {
  color: #FFFFFF;
  background: #333030;
}
.button.-dark:focus {
  outline: 1px dotted white;
  outline-offset: -4px;
}

.button.-green {
  color: #FFFFFF;
  background: #01BAEF;
}

.welcome-back a{
  color: black;
  font-weight: bold;
  cursor: pointer;
}

.mainnn{
      padding-top: 10px;
}
.slider{
      width: 100%;
      position: absolute;
}

.upper-banner-container{
  width: 100%;
  height: 55px;
  background-image: url('/topbanner.jpg');
    background-size:     contain;                      
    background-repeat:   no-repeat;
    background-position: center center;   
}

.large-banner-container{
  background-image: url('/snowbg.png');
  width:100%;
  margin-top: 100px;
  height: 240px;
    background-size:     cover;                   
    background-repeat:   no-repeat;
    background-position: center center;   

}

.images-container{
  marign-top: 5px;
}

.upper-banner{
padding-top: 12px;
color: #343535;
text-align: center;
}
.upper-banner a{
  font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  text-decoration: none;
  color: #343535;
}
.upper-banner span{
  font-family: "filson-soft",sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #252626;
}

.col-centered{
    float: none;
    margin: 0 auto;
}

.welcome-back{
  text-align: center;
}

.heading1{
  text-align: center;
  margin-top: -3px;
}
.heading1 a{
  font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
  text-decoration: none;
  color: #131414;
  font-size: 30px;
  margin-top: 4px;

}

.heading2{
  text-align: center;
      margin-top: -4px;
      margin-bottom: 6px;
}
.heading2 a{
  font-family: "filson-soft",sans-serif;
  font-style: normal;
  font-weight: 400;
  text-decoration: none;
  color: #131414;
  font-size: 34px;

}

.gradient-banner{
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#60daff+0,a3e7ff+100 */
background: #60daff; /* Old browsers */
background: -moz-linear-gradient(top,  #60daff 0%, #a3e7ff 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  #60daff 0%,#a3e7ff 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  #60daff 0%,#a3e7ff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#60daff', endColorstr='#a3e7ff',GradientType=0 ); /* IE6-9 */

}

.imagez img{
  width: 100%;
  max-width: 120px;
}

.textz{
  text-align: center;
}

.textz a{
  color: #2B2B2B;
  text-decoration: none;
  font-family: "futura-pt",sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
}


.col-xs-3{

    padding-left: 0px;
  padding-right: 0px;

}
.col-xs-10{
  padding-left: 0px;
  padding-right: 0px;
  width: 45%;
  margin-left: 27.5%;
}


@media only screen and (max-width: 1145px) {
  .upper-banner-container {
  
    background-size: cover;

}
}
 


 @media only screen and (max-width: 610px) {
   .upper-banner-container{
     height: 75px;
   }
}


 @media only screen and (max-width: 770px) {

    .heading1 a{
    font-size: 23px;
    }
    .heading2 a {
    font-size: 30px;
}
   
}

 @media only screen and (max-width: 767px) {
   #logo{
    min-width: 200px;
    margin: 0 auto;
    margin-top: 22px;
    width: 200px;
    float: none;
    display: block;
}
.large-banner-container{
  margin-top: 230px;
   }
}

@media only screen and (max-width: 404px) {
   .heading2 a{
    font-size: 23px;
}
.heading1{
  margin-top: 3px;
}
.heading1 a{
    font-size: 19px;
}
.images-container {

    display: none;
}
.large-banner-container {
    height: 90px;
}


}

    `],
    template:`
  <div class="gradient-banner">
    <div class="upper-banner-container">
      <div class="upper-banner">
        <a><span>New Deals Everyday </span>Starting At 12:00 PM EST & 6:00 PM EST</a>
      </div>
    </div>
</div>
    <header class="navbar white slider" role="banner">
    
          <div class="container mainnn">
            <div class="navbar-header">
                  <a href="#" id="logo"><img src="/logo.svg" style="pointer-events: none;"></a>
            </div>
            <nav role="navigation" *ngIf="!auth.authenticated()">
                  <ul class="nav navbar-nav navbar-right">
                <li><div class="button -dark center" type="button" (click)="logIn()">Sign In</div></li>
                <li><div class="button -green center" type="button" (click)="signUp()">Create Account</div></li>
                  </ul>
            </nav>
             <nav role="navigation" *ngIf="auth.authenticated()">
                  <ul class="nav navbar-nav navbar-right">
                <li><div *ngIf="isActive" class="welcome-back"><span>Welcome, <a (click)="showAccount = !showAccount">{{message}}</a>!</span></div></li>
                <li><div class="button -green center" (click)="logOut()">Log Out</div></li>
                  </ul>
            </nav>
          </div>
    </header>

    <div class="large-banner-container">
      <div class="large-banner">
        <div class="col-md-12">
            <div class="row">
                <div class="heading1">
                <a>Buy the latest electronic, fashion, and household products</a>
                </div>
            </div>

            <div class="row">
               <div class="heading2">
                <a>Up To 90% Off Retail Prices</a>
                </div>
            </div>

            <div class="row">
              <div class="images-container">
                <div class="col-cs-11 col-centered imagez">



                  <div class="col-xs-3">
                    <div class="col-xs-10">
                      <img src="/pic1.png" >
                    </div>
                    <div class="col-xs-12 textz"><a>Buy Early, Save More </a></div>
                  </div>


                  <div class="col-xs-3">
                    <div class="col-xs-10">
                      <img src="/pic3.png" >
                    </div>
                    <div class="col-xs-12 textz"><a>Free U.S. Shipping </a></div>
                  </div>


                  <div class="col-xs-3">
                    <div class="col-xs-10">
                      <img src="/pic2.png">
                    </div>
                    <div class="col-xs-12 textz"><a>New Deals Everyday </a></div>
                  </div>


                  <div class="col-xs-3">
                    <div class="col-xs-10">
                      <img src="/pic4.png">
                    </div>
                    <div class="col-xs-12 textz"><a>Unbeatable Prices </a></div>
                  </div>



                </div>
              </div>
            </div>
      </div>
      </div>
    </div>


    <account-dialog [(visible)]="showAccount"> 
                          
    </account-dialog>

`
})
export class HeaderComponent{
message = 'Loading...';
email: string;
isActive = false;
  constructor(private auth: Auth) {
      setInterval(()=>this.check(),800);  
  }
   

/** This may be CPU intensive. This is checking for local storage every 0.4 sec.*/

   check(){
     if (localStorage.getItem("profile") !== null) {
       let profile = localStorage.getItem('profile');
       let object = JSON.parse(profile);
       let mail = object.email;
       this.isActive = true;
       this.message = mail;
  }
 }



 

  signUp(){
    this.auth.signUp();
  }
  logIn(){
    this.auth.login();
  }
  logOut(){
    this.auth.logout();

  }




}


