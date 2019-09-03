import { AddupdateproductComponent } from './../addupdateproduct/addupdateproduct.component';
import { ProductsService } from './../../services/ProductsService';
import { SellerService } from 'src/services/SellerService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common'

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
  categories;
  products;
  update:Boolean = false;
  updateproductid;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SellerService: SellerService,
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
    this.ProductsService.getproductsbyid(JSON.parse(localStorage.getItem('userdata'))['ID']).then(res=>{
      this.products = res['data']
    })
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
      dimension: ['', Validators.required],
      Categories: ['',Validators.required]

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
   
   if(this.update) {
    this.ProductsService.updateproduct(this.updateproductid,this.f.Name.value,this.f.long_Description.value,this.f.short_Description.value,this.f.seller_productCode.value,this.f.MRP.value,this.f.SSP.value,this.f.YMP.value,this.f.warranty.value,Images,this.f.dimension.value,this.f.Categories.value ).then(res => {
      console.log(res['data'])
      if (res['data'] === "Updated") {
        this.loading = false;
        alert("Product Updated");
        $('#closemodal').click();
        this.all();
       }
    }).catch(res => {
      console.log(res);
    })

   } else {
    this.ProductsService.addproduct(JSON.parse(localStorage.getItem("userdata"))['ID'] ,this.f.Name.value,this.f.long_Description.value,this.f.short_Description.value,this.f.seller_productCode.value,this.f.MRP.value,this.f.SSP.value,this.f.YMP.value,this.f.warranty.value,Images,this.f.dimension.value,this.f.Categories.value ).then(res => {
      console.log(res)
      if (res['data'] === "Created") {
        this.loading = false;
        alert("Product Added");
        $('#closemodal').click();
        this.all();
       }
    }).catch(res => {
      console.log(res);
    })
   }
    
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
  load(id) {
    this.updateproductid = id;
    this.ProductsService.getproductbyproductid(id).then((res) => {
      res = res['data'][0];
      // var data = res['data'][0];
      // if(res['data']) {
      //   this.addproductForm.patchValue({Name: data['Name'], long_Description:data['longDes']});

      // }

      // console.log( this.addproductForm.controls['Name']);

      this.addproductForm.patchValue({ Name : res['Name']});
      this.addproductForm.patchValue({long_Description:res['longDes']})
      this.addproductForm.patchValue({short_Description:res['shortDes']})
      this.addproductForm.patchValue({seller_productCode:res['SellerProductCode']})
      this.addproductForm.patchValue({MRP:res['MRP']})
      this.addproductForm.patchValue({SSP:res['SSP']})
      this.addproductForm.patchValue({YMP:res['YMP']})
      this.addproductForm.patchValue({dimension:res['Dimensions']})
      this.addproductForm.patchValue({YMP:res['YMP']})
      this.addproductForm.patchValue({Categories:res['Categories']})
      this.addproductForm.patchValue({warranty:res['Warranty']});


      var images = res['Images'].split(',');
      console.log(images.length)
      if(images.length>0) {
        this.image1 = this.baseurl+ 'products/getimage?imageid='+images[0];
        console.log(this.image1)

      }
      if(images.length>1) {
        this.image2 = this.baseurl+ 'products/getimage?imageid='+images[1];
      }
      if(images.length>2) {
        this.image3 = this.baseurl+ 'products/getimage?imageid='+images[2];
      }
      $('#loadmodal').click();
      this.update= true;

      // this.f.Name.value = res['data']
      // this.f.long_Description.value,
      // this.f.short_Description.value,
      // this.f.seller_productCode.value,
      // this.f.MRP.value,
      // this.f.SSP.value,
      // this.f.YMP.value,
      // this.f.warranty.value,
      // this.f.dimension.value,
      // this.f.Categories.value 
      // Images,
    })
  }

  sortTable(n) {
    console.log("clciked")
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

}

