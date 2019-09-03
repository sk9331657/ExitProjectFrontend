import { ProductsService } from 'src/services/ProductsService';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-managecategories',
  templateUrl: './managecategories.component.html',
  styleUrls: ['./managecategories.component.css']
})
export class ManagecategoriesComponent implements OnInit {

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
  categories;
  products;
  update:Boolean = false;
  updateproductid;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ProductsService:ProductsService,
    
  ) {
    if(!localStorage.getItem('userdata')) {
      this.router.navigate(['/Login']);
    }

    this.ProductsService.getcategories().then(res=>{
      this.categories = res['data'];
    })

    this.all();
    
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) { 
    //     this.router.navigate(['/']);
    // }
  }

  all() 
  {
    this.ProductsService.getcategories().then(res=>{
      this.categories = res['data'];
    })
  }

  ngOnInit() {
    this.addproductForm = this.formBuilder.group({
      Name: ['', Validators.required],
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

    this.ProductsService.addcategory(this.f.Name.value).then((res) => {
      console.log(res);
      alert(res['Data']);
      this.all();
    })


}




}
