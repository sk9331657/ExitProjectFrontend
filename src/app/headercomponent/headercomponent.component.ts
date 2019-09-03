import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-headercomponent',
  templateUrl: './headercomponent.component.html',
  styleUrls: ['./headercomponent.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class HeadercomponentComponent implements OnInit {
  isAdmin:Boolean;
  isSeller:Boolean

  constructor(private router:Router) {
    if(localStorage.getItem('isAdmin')==='true') {
      this.isAdmin = true;
    }
    if(localStorage.getItem('isSeller')==='true') {
      this.isSeller = true;
    }
    console.log(this.isAdmin||this.isSeller)
   }

  ngOnInit() {
  }

  redirecttohome() {
    console.log("CLicked")
    localStorage.clear();
    this.isAdmin= false;
    this.isSeller = false;
    this.router.navigate(['/Login']); 
  }

  setAdmin () {
    this.isAdmin = true;
  }

  setSeller() {
    this.isSeller = true;
  }

}
