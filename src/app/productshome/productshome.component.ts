import { ProductsService } from './../../services/ProductsService';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-productshome',
  templateUrl: './productshome.component.html',
  styleUrls: ['./productshome.component.css']
})
export class ProductshomeComponent implements OnInit {

  constructor(private ProductsService:ProductsService) { }
  imagefetchurl = environment.url+"products/getimage?imageid=";

  products;
  ngOnInit() {
    this.ProductsService.getallproducts().then(res=>{
      console.log(res);
      this.products = res['data'];
    })
  }

}
