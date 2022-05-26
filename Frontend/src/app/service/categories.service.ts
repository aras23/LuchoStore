import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../api/models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  URL_ENDPOINT:string = "http://localhost:3000";

    constructor(private httpClient: HttpClient) { }

    // crud products :)
    getAllCategories(){
        let path = this.URL_ENDPOINT+"/getCategoria";
        return this.httpClient.get(path);
    }

    postCategories(categories: Categories){
        let path = this.URL_ENDPOINT+"/postCategoria";
        return this.httpClient.post(path,categories);
    }

    deleteCategories(categories: Categories){
        let path = this.URL_ENDPOINT+"/deleteCategoria/"+categories._id;
        return this.httpClient.delete(path,categories._id);
    }

    putCategories(categories: Categories){
        let path = this.URL_ENDPOINT+"/putCategoria/"+categories._id;
        return this.httpClient.put(path,categories);
    }
    // END crud products :)

    // data test by primeng
  //   getCategoriessSmall() {
  //     return this.httpClient.get<any>('assets/demo/data/products-small.json')
  //     .toPromise()
  //     .then(res => res.data as Categories[])
  //     .then(data => data);
  // }

  // getCategoriess() {
  //     return this.httpClient.get<any>('assets/demo/data/products.json')
  //     .toPromise()
  //     .then(res => res.data as Categories[])
  //     .then(data => data);
  // }

  // getProductsMixed() {
  //     return this.httpClient.get<any>('assets/demo/data/products-mixed.json')
  //     .toPromise()
  //     .then(res => res.data as Product[])
  //     .then(data => data);
  // }

  // getCategoriessWithOrdersSmall() {
  //     return this.httpClient.get<any>('assets/demo/data/products-orders-small.json')
  //     .toPromise()
  //     .then(res => res.data as Categories[])
  //     .then(data => data);
  // }

}
