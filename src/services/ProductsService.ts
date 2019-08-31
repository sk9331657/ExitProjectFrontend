
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment } from './../environments/environment';

import axios from 'axios';
import { encode } from 'punycode';
import * as $ from "jquery";

@Injectable()
export class ProductsService {
  getproductsbyid(id) {
    return new Promise((resolve,reject)=>{
        axios.get(this.productsbaseurl+'getproductsbyseller?SellerId='+id).then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })

    })  }
  getcategories() {
    return new Promise((resolve,reject)=>{
        axios.get(this.productsbaseurl+'getcategories').then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })  }

    baseurl= environment.url;
    productsbaseurl= environment.url+"products/";

  filterproducts(arg0: string | number | string[]) {
    return new Promise((resolve,reject)=>{
        axios.get(this.productsbaseurl+'filterproducts?query='+arg0+'&options=1').then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })
  }
  searchproducts(arg0: string | number | string[], arg1: string | number | string[]) {
    return new Promise((resolve,reject)=>{
        axios.get(this.productsbaseurl+'searchproducts?query='+arg0+'&options='+arg1).then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })
  }
  updatestatus(id: any, arg1: string | number | string[]) {
    return new Promise((resolve,reject)=>{
        axios.post(this.productsbaseurl+'updatestatus?ID='+id+'&Value='+arg1).then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    }) 
 }
  
  constructor(private http: HttpClient) { }

  postimage(file:File) {
      return new Promise((resolve,reject)=>{
          const formData = new FormData(); 
          console.log(file)
          formData.append('file',file);
          console.log(formData);
          axios.post(this.productsbaseurl+'uploadimage',formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
              resolve(res);
          }).catch(res=>{
              reject(res);
          })
      })
  }


  addproduct(sellerid,Name,long_Description,short_Description,seller_productCode,MRP,SSP,YMP,warranty,Images,dimension,category) {
      console.log(sellerid,Name,long_Description,short_Description,seller_productCode,MRP,SSP,YMP,warranty,Images,dimension)
    return new Promise((resolve,reject)=>{
        axios.post(encodeURI(this.productsbaseurl+'addproduct?SellerID='+sellerid+'&Name='+Name+'&longdes='+long_Description+'&shortdes='+short_Description+'&sellercode='+seller_productCode+'&MRP='+MRP+'&SSP='+SSP+'&YMP='+YMP+'&warranty='+warranty+'&MRP='+MRP+'&Images='+Images+'&Dimensions='+dimension+'&Category='+category)).then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })
  }

  getallproducts() {
    return new Promise((resolve,reject)=>{
        axios.get(this.productsbaseurl+'getallproducts').then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })

  }

  getproduct(arg0: any) {
    return new Promise((resolve,reject)=>{
        axios.get(this.productsbaseurl+'getproduct?productid='+arg0).then(res=>{
            resolve(res);
        }).catch(res=>{
            reject(res);
        })
    })  }


  



} 