
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment } from './../environments/environment';

import axios from 'axios';

import * as $ from "jquery";

@Injectable()
export class SellerService {
   filtersellers(arg0: string | number | string[]) {
    return new Promise((resolve,reject)=>{
        axios.get(this.sellersbaseurl+'filtersellers?query='+arg0).then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })  }
  
    sellersbaseurl= environment.url+"sellers/";
    adminbaseurl = environment.baseurl;
  constructor(private http: HttpClient) {
   }

  login(email,password,role) {

    if(role==="Seller") {
        return new Promise((resolve,reject)=>{
            axios.post(this.sellersbaseurl+'login?Email='+email+'&Password='+password).then(res=>{
                resolve(res);
            }).catch(res=>{
                reject(res);
            })
        })
    } else {
        return new Promise((resolve,reject)=>{
            axios.post(this.adminbaseurl+'login?Email='+email+'&Password='+password).then(res=>{
                resolve(res);
            }).catch(res=>{
                reject(res);
            })
        })
    }
      
  }

  register(username,Email,compnany,Addrress,Mobile,password,GST) {
      console.log(username,Email,compnany,Addrress,Mobile,password,GST)
    return new Promise((resolve,reject)=>{
      axios.post(this.sellersbaseurl+'register?userName='+username+'&Email='+Email+'&Password='+password+'&CompanyName='+compnany+'&Mobile='+Mobile+'&password='+password+'&Address='+Addrress+'&GST='+GST).then(res=>{
          resolve(res);
      }).catch(res=>{
          reject(res);
      })

    })
}

    getallSellers() {
        return new Promise((resolve,reject)=>{
            axios.get(this.sellersbaseurl+'getsellers').then(res=>{
                resolve(res);
            }).catch(res=>{
                reject(res);
            })
      
          })

    }

    updatestatus(id: any, value: any) {
        return new Promise((resolve,reject)=>{
            axios.post(this.sellersbaseurl+'updatestatus?ID='+id+'&Value='+value).then(res=>{
                resolve(res);
            }).catch(res=>{
                reject(res);
            })
      
          })

      }

      searchsellers(query,options) {
        return new Promise((resolve,reject)=>{
            axios.get(this.sellersbaseurl+'searchsellers?query='+query+'&options='+options).then(res=>{
                resolve(res);
            }).catch(res=>{
                reject(res);
            })
      
          })
      }

} 