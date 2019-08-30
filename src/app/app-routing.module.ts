import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistercomponentComponent } from './registercomponent/registercomponent.component';
import { ProductshomeComponent } from './productshome/productshome.component';
import { SellercomponentComponent } from './sellercomponent/sellercomponent.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';


const routes: Routes = [


  { path:  'Login',pathMatch: 'full', component:  LogincomponentComponent},
  { path:  'Register',pathMatch: 'full', component:  RegistercomponentComponent},
  { path:  '',pathMatch: 'full', component:  ProductshomeComponent},
  { path:  'dashboard' ,pathMatch: 'full', component:  SellercomponentComponent},
  { path:'viewproduct/:id',pathMatch:'full',component:SingleproductComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
