import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Headers} from "@angular/http";
import {RequestOptions} from "@angular/http";
import {DatePipe} from '@angular/common';


@Injectable()
export class ProductService{
    name: string;

  date: string;
  constructor(private http:Http){
  
  }


  fetchData(date){
    return this.http.get('http://expase.com:3300/currentdeal/').map(
      (res) => res.json()
      );
  }

  fetchOrder(date){
    return this.http.get('http://expase.com:3300/order/'+date).map(
      (res) => res.json()
      );
  }

  postData(json){
    var params = json;
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json')
  	return this.http.post('http://expase.com:3300/product', params, {
  		headers: headers
  	}).map(res => res.json());
  }

  
}