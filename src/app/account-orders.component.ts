import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Headers} from "@angular/http";
import {RequestOptions} from "@angular/http";
import {DatePipe} from '@angular/common';

@Injectable()
export class AccountOrderService{
   
  constructor(private http:Http){}


  getOrder(json){
    var params = json;
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('http://expase.com:3300/getOrder', params, {
  		headers: headers
  	}).map(res => res.json());
  }

  
}