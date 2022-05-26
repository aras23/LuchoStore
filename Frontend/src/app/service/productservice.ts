import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../api/product';
// import * as http from "http";

@Injectable()
export class ProductService {

    URL_ENDPOINT:string = "http://localhost:3000";

    constructor(private httpClient: HttpClient) { }

    // crud products :)
    getAllProducts(){
        let path = this.URL_ENDPOINT+"/getProducto";
        return this.httpClient.get(path);
    }

    postProduct(product: Product){
        let path = this.URL_ENDPOINT+"/postProducto";
        return this.httpClient.post(path,product);
    }

    deleteProduct(product: Product){
        let path = this.URL_ENDPOINT+"/deleteProducto/"+product._id;
        return this.httpClient.delete(path,product._id);
    }

    putProduct(product: Product){
        let path = this.URL_ENDPOINT+"/putProducto/"+product._id;
        return this.httpClient.put(path,product);
    }
    // END crud products :)


    // data test by primeng
    getProductsSmall() {
        return this.httpClient.get<any>('assets/demo/data/products-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProducts() {
        return this.httpClient.get<any>('assets/demo/data/products.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    // getProductsMixed() {
    //     return this.httpClient.get<any>('assets/demo/data/products-mixed.json')
    //     .toPromise()
    //     .then(res => res.data as Product[])
    //     .then(data => data);
    // }

    getProductsWithOrdersSmall() {
        return this.httpClient.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

}
