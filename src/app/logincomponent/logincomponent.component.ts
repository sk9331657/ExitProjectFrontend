import { HeadercomponentComponent } from './../headercomponent/headercomponent.component';
import { SellerService } from 'src/services/SellerService';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css']
})
export class LogincomponentComponent implements OnInit {

  loginForm: FormGroup;
  loading = true;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private SellerService:SellerService,
      private HeadercomponentComponent : HeadercomponentComponent
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
      if(localStorage.getItem('userdata')&&localStorage.getItem('isSeller')==='true') {
        this.HeadercomponentComponent.setSeller();
        this.router.navigate(['/sellerdashboard']);  
    }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
          role: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      
     

     
      this.SellerService.login(this.f.email.value, this.f.password.value,this.f.role.value).then(res=>{
          console.log(res);
          this.loading =   false;
          console.log(res['data']['User'])
          if(this.f.role.value==="Seller") {
            if(res['data']['Status']!="User Found") {
                alert("Invalid Login");
                this.loading = false;
    
              } 
              else if(JSON.parse(res['data']['User'])['Status']==="NEED_APPROVAL") {
                  alert("You account is under review. Please contact Admin.");
              }
              else if(JSON.parse(res['data']['User'])['Status']==="REJECTED") {
                alert("You account is rejected. Please contact Admin.");
             }
              else {
                localStorage.setItem("userdata",res['data']['User']);
                localStorage.setItem("isSeller",'true');
                this.HeadercomponentComponent.setSeller();
                window.location.href="/sellerdashboard"
                this.router.navigate(['/sellerdashboard']); 
              }
          } else {

            if(res['data']['Status']!="User Found") {
                alert("Invalid Admin Login");
                this.loading = false;
    
              } 
              else {
                localStorage.setItem("userdata",res['data']['User']);
                localStorage.setItem("isAdmin",'true');
                this.HeadercomponentComponent.setAdmin();
                window.location.href="/admindashboard"
              }

          }
         
      }).catch(res=>{
          console.log(res);
      })
  }

  enablelogin() {
      this.loading = false;

  }

  resolved(captchaResponse: string) {
    this.enablelogin();  
}
 

}
