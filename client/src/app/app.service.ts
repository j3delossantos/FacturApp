import { Injectable } from '@angular/core';
import{HttpClient}from'@angular/common/http';
import {observable}from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URI ='http://localhost:3000';

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`${this.API_URI}/users`);
    
  }
}
