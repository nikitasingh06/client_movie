/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductsCartService } from './products-cart.service';

describe('ProductsCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsCartService]
    });
  });

  it('should ...', inject([ProductsCartService], (service: ProductsCartService) => {
    expect(service).toBeTruthy();
  }));
});
