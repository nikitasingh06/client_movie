import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Allpaths } from './url';


@Injectable()
export class ProductsCartService {

  
  public data;
  public data1;  
  
  constructor(public http: Http, public url: Allpaths) { }


  postCartProduct(product) {
    return this.http.post(this.url.UrlObj.postCartProduct, product).map(
      data => data.json()
    );
  }


  getCartProducts() {
    return this.http.get(this.url.UrlObj.getCartProducts).map(
      data1 => data1.json()
    );
  }


  deleteProduct(product){
    return this.http.delete(this.url.UrlObj.deleteCartProduct + '/' + product).map(
      data => data.json()
    );
    
  }
  

}
