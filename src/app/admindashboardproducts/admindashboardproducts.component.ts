import { AdminService } from './../../services/AdminService';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/ProductsService';

@Component({
  selector: 'app-admindashboardproducts',
  templateUrl: './admindashboardproducts.component.html',
  styleUrls: ['./admindashboardproducts.component.css']
})
export class AdmindashboardproductsComponent implements OnInit {

  sellers;
  constructor(private AdminService: AdminService, private ProductsService: ProductsService) { }

  ngOnInit() {

    this.all();
  }

  all() {
    this.ProductsService.getallproducts().then(res => {
      console.log(res['data'])
      this.sellers = res['data']
    })
  }
  updatestatus(id) {
    console.log(id)
    this.ProductsService.updatestatus(id, $('#' + id).val()).then(res => {
      alert(res['data']);
      this.all();
    })
  }

  search() {
    this.ProductsService.searchproducts($('#searchquery').val(), $('#searchoptions').val()).then(res => {
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
      this.ProductsService.filterproducts($('#filtersellers').val()).then(res => {
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
      alert("Select Atleast One Product to Approve");
    }
    else {
      var arr = $('.statusbox:checked');
      var arrcount = arr.length;
      var tempcount = 0;
      $('.statusbox:checked').each(element => {

        this.ProductsService.updatestatus(arr[element]['id'], "APPROVED").then(res => {
          tempcount++;
          if (tempcount === arrcount) {
            alert("Updated");
            $('#bulkapprove').hide();
            this.all();
          }
        })
      })

    }
  }

  approveseller() {

  }
}

