
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment } from './../environments/environment';

import axios from 'axios';

@Injectable()
export class SellerService {
    baseurl= environment.url+"sellers/";
  constructor(private http: HttpClient) {
      console.log(this.baseurl)
   }

  login(email,password) {
      return new Promise((resolve,reject)=>{
          axios.post(this.baseurl+'login?Email='+email+'&Password='+password).then(res=>{
              resolve(res);
          }).catch(res=>{
              reject(res);
          })
      })
  }

  register(username,Email,compnany,Addrress,Mobile,password,GST) {
      console.log(username,Email,compnany,Addrress,Mobile,password,GST)
    return new Promise((resolve,reject)=>{
      axios.post(this.baseurl+'register?userName='+username+'&Email='+Email+'&Password='+password+'&CompanyName='+compnany+'&Mobile='+Mobile+'&password='+password+'&Address='+Addrress+'&GST='+GST).then(res=>{
          resolve(res);
      }).catch(res=>{
          reject(res);
      })

    })
}


} 