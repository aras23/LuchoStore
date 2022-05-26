import { Injectable } from '@angular/core';
import { Rol } from '../api/models/rol';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  URL_ENDPOINT:string = "http://localhost:3000";

    constructor(private httpClient: HttpClient) { }

    // crud products :)
    getAllRoles(){
        let path = this.URL_ENDPOINT+"/getRol";
        return this.httpClient.get(path);
    }

    postRol(rol: Rol){
        let path = this.URL_ENDPOINT+"/postRol";
        return this.httpClient.post(path,rol);
    }

    deleteRol(rol: Rol){
        let path = this.URL_ENDPOINT+"/deleteRol/"+rol._id;
        return this.httpClient.delete(path,rol._id);
    }

    putRol(rol: Rol){
        let path = this.URL_ENDPOINT+"/putRol/"+rol._id;
        return this.httpClient.put(path,rol);
    }
  
}
