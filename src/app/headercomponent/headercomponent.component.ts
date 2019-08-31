import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-headercomponent',
  templateUrl: './headercomponent.component.html',
  styleUrls: ['./headercomponent.component.css']
})
export class HeadercomponentComponent implements OnInit {
  isAdmin:Boolean;
  isSeller:Boolean

  constructor() {
    if(localStorage.getItem('isAdmin')==='true') {
      this.isAdmin = true;
    }
    if(localStorage.getItem('isSeller')==='true') {
      this.isSeller = true;
    }
   }

  ngOnInit() {
  }

}
