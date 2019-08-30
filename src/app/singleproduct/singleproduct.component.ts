import { ProductsService } from 'src/services/ProductsService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {

  productdata;
  images ;
  imagefetchurl = environment.url+"products/getimage?imageid=";
  showothers: Boolean;
  imageslength;

  constructor(private route: ActivatedRoute,private ProductsService:ProductsService) { 
    
  }
 
  ngOnInit() {
   this.route.paramMap.subscribe(params=>{
     console.log(params)
    this.ProductsService.getproduct(params.get('id')).then(c =>{
      
      console.log(c);
      this.productdata = c['data'][0];

      this.images = c['data'][0]['Images'].split(',');
      this.imageslength = this.images.length;
      this.images > 0 ? this.showothers = true : this.showothers =false;
  })   
   })

  }
  

}
