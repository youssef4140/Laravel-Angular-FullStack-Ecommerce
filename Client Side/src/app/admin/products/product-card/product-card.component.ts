import { Component, Input, EventEmitter,Output } from '@angular/core';
import { Product } from 'src/app/_models/models';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  color:ThemePalette = 'warn';

  @Input() product!: Product;
  @Output() idDelete = new EventEmitter<number>();
  @Output() idCheckBox = new EventEmitter<number>();
  @Output() update = new EventEmitter<Product>();



  deleteProduct(id:number){
    this.idDelete.emit(id);

  }

  checkProduct(id:number){
    this.idCheckBox.emit(id);
  }

  updateProduct(product:Product){
    this.update.emit(product);
  }
}
