import { environment } from './../../environments/environment';
import { SellerService } from 'src/services/SellerService';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from './../../services/ProductsService';



@Component({
  selector: 'app-registercomponent',
  templateUrl: './registercomponent.component.html',
  styleUrls: ['./registercomponent.component.css']
})
export class RegistercomponentComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matchpassword: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SellerService: SellerService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) { 
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      Email: ['', Validators.required],
      CompanyName: ['', Validators.required],
      Address: ['', Validators.required],
      Mobile: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      password: ['', [ Validators.required, 
        Validators.pattern(/^(?=\D*\d)(?=.*[$@$!%*?&])(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      GST: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log(this.registerForm.controls)
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }


    console.log(this.f.password.value != this.f.confirmPassword.value)
    if (this.f.password.value != this.f.confirmPassword.value) {
      this.matchpassword = true;
      return;
    }
    this.loading = true;
    this.SellerService.register(this.f.username.value, this.f.Email.value, this.f.CompanyName.value, this.f.Address.value, this.f.Mobile.value, this.f.password.value, this.f.GST.value).then(res => {
      console.log(res)
      if(res['data']==="Created") {
        this.loading = false;
        alert('Created');
        this.router.navigate(['/Login']); 

      }
    }).catch(res => {
      console.log(res);
    })
  }



}
