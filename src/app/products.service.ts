import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Allpaths } from './url';


@Injectable()
export class ProductsService {

  public data;    
  // private url: string = "/api/v1/getProducts"
  // private url2: string = "/api/v1/postProduct"
  
  constructor(public http: Http, public url: Allpaths) { }


  getProducts() {
    return this.http.get(this.url.UrlObj.getProducts).map(
      data => data.json()
    );
  }

  PostProduct(p) {
    return this.http.post(this.url.UrlObj.postProduct, p).map(
      data => data.json()
    );
  }
}
