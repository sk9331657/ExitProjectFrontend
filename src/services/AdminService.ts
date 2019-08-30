
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment } from './../environments/environment';

import axios from 'axios';

@Injectable()
export class AdminService {
    baseurl= environment.url;
  constructor(private http: HttpClient) { }

  login(email,password) {
      return new Promise((resolve,reject)=>{
          axios.post(this.baseurl+'login?Email='+email+'&Password='+password,{}).then(res=>{
              resolve(res);
          }).catch(res=>{
              reject(res);
          })
      })
  }

  register() {
      return new Promise((resolve,reject)=>{

      })
  }



} 