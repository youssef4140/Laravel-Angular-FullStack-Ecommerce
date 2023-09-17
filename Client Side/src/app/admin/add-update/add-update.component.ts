import { Component,ViewEncapsulation,Inject } from '@angular/core';
import {  MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/_models/models';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/_services/admin/admin.service';
@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AddUpdateComponent {

  product!: Product|null;
  update: boolean = false;
  productForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {product: Product,update:boolean},
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _admin: AdminService,
    private dialogRef: MatDialogRef<AddUpdateComponent>,
    ) { 
    this.product = data?.product
    this.update = data?.update
    // console.log(this.product)

    this.productForm = this.formBuilder.group({
      name: [this.product?.name, [Validators.required]],
      description: [this.product?.description, [Validators.required]],
      price: [this.product?.price, [Validators.required]],
      stock: [this.product?.stock, [Validators.required]],
      image: [this.product?.image, [Validators.required]],
      category: [this.product?.category, [Validators.required]],
      status: [this.product?.status, [Validators.required]],
    });
  }

  onSubmit() {
      if (this.productForm.valid) {
    this.update? this.updateProduct():this.addProduct();;

      } else {
        this._snackBar.open('Please enter valid register info', 'X', {
          duration: 1000,
          panelClass: ['custom-snackbar'],
        });
      }
  }

  private addProduct() {
    this._admin.addProduct(this.productForm.value)
      .subscribe({
        next:(result)=>{
          // console.log(result);
          this.dialogRef.close(result);

        },
        error:(error)=>{
          console.error(error);
        }

      })
  }
  private updateProduct() {
    if(!this.product) return;
    this._admin.updateProduct(this.productForm.value,this.product.id)
      .subscribe({
        next:(result)=>{
          // console.log(result);
          this.dialogRef.close(result);

        },
        error:(error)=>{
          console.error(error);
        },
   

      })
  }


}
