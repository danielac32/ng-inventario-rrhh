import { Component,OnInit,Inject,inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Product,ProductStock} from '../../formGroup/updateProductFormGroup'
import {MatSelectModule} from '@angular/material/select';
import {TipoProducto} from '../../interfaces/inv-enum'
import {ListTipo} from '../../interfaces/createProduct-interface'
import {InvService} from '../../services/inv.service'
import {Categoria} from '../../interfaces/categorias-interface'
import {ProductForm,Producto} from '../../interfaces/createProduct-interface'
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { Router ,ActivatedRoute} from '@angular/router';
import {ProductCart} from '../../shared/shared.cart-interface'
import { Observable ,throwError} from 'rxjs';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatSelectModule,
  			MatFormFieldModule,
  			MatInputModule,
  			MatButtonModule,
  			FormsModule,
  			ReactiveFormsModule,
  			CommonModule,
  			MatCardModule,
  			MatCheckboxModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
invService= inject(InvService);
 
sharedService=inject(SharedService);
router=inject(Router);
 
cart: ProductCart[] = [];
verifyCheck:boolean=false;


constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  	//this.updateProduct = new FormGroup<ProductStock>(new ProductStock());
}


get(id: number, value: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    this.invService.checkProductStockAvailable(id, value).subscribe(
      ({ verify }) => {
        resolve(verify); // Devuelve el valor real cuando la respuesta llega
      },
      error => {
        console.error('Error en la solicitud:', error);
        reject(false); // En caso de error, devuelve false
      }
    );
  });
}

ngOnInit(): void {
 // this.get(2, 1).subscribe(val => {
 // console.log(val); // Aquí obtendrás el valor `true` o `false` según la respuesta
//});
/*(async () => {
  let val = await this.get(2, 1);
  console.log(val); // Aquí obtendrás el valor correcto después de la respuesta
})();*/


    this.sharedService.cart$.subscribe(products => {
      this.cart = products;
       

    });

}

  addProduct(product: ProductCart) {
    this.sharedService.addProduct(product);
  }

  incrementQuantity(productId: number) {
    this.sharedService.incrementQuantity(productId);
  }

  decrementQuantity(productId: number) {
    this.sharedService.decrementQuantity(productId);
  }


async verify(){
  for (const product of this.cart) {
    try {
      const isAvailable = await this.get(product.id, product.quantity); // Espera a obtener el resultado de get

      if (!isAvailable) {
        console.log(`No hay stock para ID: ${product.id}, Nombre: ${product.name}, Cantidad: ${product.quantity}`);
        this.sharedService.removeProduct(product.id); // Remueve el producto si no hay stock
      } else {
        console.log(`Stock disponible para ID: ${product.id}, Nombre: ${product.name}, Cantidad: ${product.quantity}`);
      }
    } catch (error) {
      console.error(`Error al verificar el stock de ID: ${product.id}`, error);
    }
  }
  this.verifyCheck = true;
}

onSubmit() {
  if(this.verifyCheck){
     this.verifyCheck = false;
     this.dialogRef.close({res:true});
  }
}



}
