
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment } from './../environments/environment';

import axios from 'axios';
import { encode } from 'punycode';

@Injectable()
export class ProductsService {
  
  baseurl= environment.url;
  constructor(private http: HttpClient) { }

  postimage(file:File) {
      return new Promise((resolve,reject)=>{
          const formData = new FormData(); 
          console.log(file)
          formData.append('file',file);
          console.log(formData);
          axios.post(this.baseurl+'products/uploadimage',formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
              resolve(res);
          }).catch(res=>{
              reject(res);
          })
      })
  }


  addproduct(sellerid,Name,long_Description,short_Description,seller_productCode,MRP,SSP,YMP,warranty,Images,dimension) {
      console.log(sellerid,Name,long_Description,short_Description,seller_productCode,MRP,SSP,YMP,warranty,Images,dimension)
    return new Promise((resolve,reject)=>{
        axios.post(encodeURI(this.baseurl+'products/addproduct?SellerID='+sellerid+'&Name='+Name+'&longdes='+long_Description+'&shortdes='+short_Description+'&sellercode='+seller_productCode+'&MRP='+MRP+'&SSP='+SSP+'&YMP='+YMP+'&warranty='+warranty+'&MRP='+MRP+'&Images='+Images+'&Dimensions='+dimension)).then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })
  }

  getallproducts() {
    return new Promise((resolve,reject)=>{
        axios.get(this.baseurl+'products/getallproducts').then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })

  }

  getproduct(arg0: any) {
    return new Promise((resolve,reject)=>{
        axios.get(this.baseurl+'products/getproduct?productid='+arg0).then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })  }


  



} 