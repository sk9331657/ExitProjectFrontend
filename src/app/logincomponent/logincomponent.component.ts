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
  adminurl = environment.baseurl +'adminLogin';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private SellerService:SellerService,
  ) {
      console.log(this.adminurl)
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
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
      
     

     
      this.SellerService.login(this.f.email.value, this.f.password.value).then(res=>{
          console.log(res);
          this.loading =   false;
          console.log(res['data']['User'])
          if(res['data']['Status']!="User Found") {
            alert("Invalid Login");
          } 
          else if(res['data']['User']['Status']==="NEW") {
              alert("You account is under review");
          }
          else {
            localStorage.setItem("userdata",res['data']['User'])
            this.router.navigate(['/dashboard']); 
          }
      }).catch(res=>{
          console.log(res);
      })
  }

  enablelogin() {
      this.loading = false;

  }

 

}
