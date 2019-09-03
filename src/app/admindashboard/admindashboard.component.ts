import { SellerService } from './../../services/SellerService';
import { AdminService } from './../../services/AdminService';
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  sellers;
  constructor(private AdminService: AdminService, private SellerService: SellerService,private router:Router) { }

  ngOnInit() {

    if(!localStorage.getItem('userdata')) {
      this.router.navigate(['/Login']);
    }

    this.all();
  }

  all() {
    this.SellerService.getallSellers().then(res => {
      console.log(res['data'])
      this.sellers = res['data']
    })
  }
  updatestatus(id) {
    console.log(id)
    this.SellerService.updatestatus(id, $('#' + id).val()).then(res => {
      alert(res['data']);
      this.all();
    })
  }

  search() {
    this.SellerService.searchsellers($('#searchquery').val(), $('#searchoptions').val()).then(res => {
      this.sellers = res['data'];
    })

  }

  reset() {
    this.all();
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

  filter() {
    if ($('#filtersellers').val() === "") {
      this.all();
    }
    else {
      this.SellerService.filtersellers($('#filtersellers').val()).then(res => {
        this.sellers = res['data'];
      })
    }

  }

  multi() {
    $('.statusbox').show();
    $('#bulkapprove').show();
  }

  async approve() {
    if ($('.statusbox:checked').length === 0) {
      alert("Select Atleast One Seller to Approve");
    }
    else {
      var arr = $('.statusbox:checked');
      var arrcount = arr.length;
      var tempcount = 0;
      $('.statusbox:checked').each(element => {

        this.SellerService.updatestatus(arr[element]['id'], "APPROVED").then(res => {
          tempcount++;
          if (tempcount === arrcount) {
            alert("Updated");
            this.all();
          }
        })
      })

    }
  }

  approveseller() {

  }
}
