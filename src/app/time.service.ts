import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Headers} from "@angular/http";
import {RequestOptions} from "@angular/http";
import {DatePipe} from '@angular/common';

@Injectable()
export class TimeService{
   
  constructor(private http:Http){}

  fetchTime(){
    return this.http.get('http://expase.com:3300/time').map(
      (res) => res.json()
      );
  }

  fetchActive(){
    return this.http.get('http://expase.com:3300/active').map(
      (res) => res.json()
      );
  }

  fetchToken(){
    return this.http.get('http://expase.com:3300/client_token').map(
      (res) => res.json()
      );
  }

  fetchPrice(){
     return this.http.get('http://expase.com:3300/price').map(
      (res) => res.json()
      );
  }

}