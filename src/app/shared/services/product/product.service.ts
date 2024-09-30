import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/enviroment';
import { Observable } from 'rxjs';
import { ProductRes } from '../../interfaces/product';
import { productDetailsRes } from '../../interfaces/productdetails';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProduct(page:number, limit:number):Observable<ProductRes>{
    return this._HttpClient.get<ProductRes>(`${Enviroment.baseUrl}/api/v1/products?limit=${limit}&page=${page}`)
  }

  getProductById(productId:string):Observable<productDetailsRes>{
   return this._HttpClient.get<productDetailsRes>(`${Enviroment.baseUrl}/api/v1/products/${productId}`)
  }
}
