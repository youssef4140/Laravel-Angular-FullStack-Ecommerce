import { Component,Input } from '@angular/core';
import { Product } from 'src/app/_models/models';



interface ProductWithSubTotalAndQuantity {
  product: Product,
  quantity: number,
  subtotal: string,
}

interface OrderWithProductWithSubTotalAndQuantity{
  total: string,
  status: string,
  products: ProductWithSubTotalAndQuantity[],
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() orders!: OrderWithProductWithSubTotalAndQuantity[];

}
