import { Component,OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin/admin.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(
    private admin: AdminService
  ){}
    orders: any[] = [];
  ngOnInit(): void {
      this.getOrders();
  }

  private getOrders(){
    this.admin.getAllOrders()
      .subscribe({
        next:(result) => {
          this.orders = result;
        },
        error:(error) => {
          console.log(error);
        }
      })
  }
  



}
