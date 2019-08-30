import { AddupdateproductComponent } from './../addupdateproduct/addupdateproduct.component';
import { ProductsService } from './../../services/ProductsService';
import { SellerService } from 'src/services/SellerService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sellercomponent',
  templateUrl: './sellercomponent.component.html',
  styleUrls: ['./sellercomponent.component.css']
})
export class SellercomponentComponent implements OnInit {
  
  baseurl= environment.url;

  addproductForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matchpassword: Boolean = false;
  image2;
  image1;
  image3;
  imagearray:Array<File>;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SellerService: SellerService,
    private ProductsService:ProductsService
    
  ) {
    if(!localStorage.getItem('userdata')) {
      this.router.navigate['/Login'];
    }
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) { 
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.addproductForm = this.formBuilder.group({
      Name: ['', Validators.required],
      long_Description: ['', Validators.required],
      short_Description: ['', Validators.required],
      seller_productCode: ['', Validators.required],
      MRP: ['', Validators.required],
      SSP: ['', Validators.required],
      YMP: ['', Validators.required],
      warranty: ['', Validators.required],
      image: ['', Validators.required],
      dimension: ['', Validators.required]

    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  get f() { return this.addproductForm.controls; }


  onSubmit() {
    this.submitted = true;

    console.log(this.addproductForm.controls)
    if (this.addproductForm.invalid) {
      return;
    }
    this.loading = true;
    var Images=  this.image1.split('=')[1]+','+this.image2.split('=')[1]+','+this.image3.split('=')[1];
    this.ProductsService.addproduct(JSON.parse(localStorage.getItem("userdata"))['ID'] ,this.f.Name.value,this.f.long_Description.value,this.f.short_Description.value,this.f.seller_productCode.value,this.f.MRP.value,this.f.SSP.value,this.f.YMP.value,this.f.warranty.value,Images,this.f.dimension.value).then(res => {
      console.log(res)
      if (res['data'] === "Created") {
        this.loading = false;
      }
    }).catch(res => {
      console.log(res);
    })
  }

   readURL(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(this.imagearray)
      // file.getAsBinary();
    
      this.ProductsService.postimage(file).then(res=>{
console.log(res['data']);
       this.image1 = this.baseurl+ 'products/getimage?imageid='+res['data'];
      })
      // const reader = new FileReader();
      // reader.onload = (e) => { this.image1 = reader.result; }

      // reader.readAsDataURL(file);
    }
  }

  readURL1(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.ProductsService.postimage(file).then(res=>{
        console.log(res['data']);
               this.image2 = this.baseurl+ 'products/getimage?imageid='+res['data'];
            })
    }
  }
  readURL2(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.ProductsService.postimage(file).then(res=>{
        console.log(res['data']);
               this.image3 = this.baseurl+ 'products/getimage?imageid='+res['data'];
              })     
    }
  }

  // convenience getter for easy access to form fields

 
}
