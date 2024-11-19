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
import {Product} from '../../formGroup/updateProductFormGroup'
import {MatSelectModule} from '@angular/material/select';
import {TipoProducto} from '../../interfaces/inv-enum'
import {ListTipo} from '../../interfaces/createProduct-interface'
import {InvService} from '../../services/inv.service'
import {Categoria} from '../../interfaces/categorias-interface'
import {ProductForm,Producto} from '../../interfaces/createProduct-interface'
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-product',
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
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
invService= inject(InvService);
updateProduct: FormGroup<Product>;
sharedService=inject(SharedService);
	router=inject(Router);

constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  	this.updateProduct = new FormGroup<Product>(new Product());
}
ngOnInit(): void {
		console.log(this.data?.id)
		this.invService.getProductoById(this.data?.id).subscribe(({producto}) => {
	      	this.updateProduct.get('nombre')?.setValue(producto.nombre??"");
	      	this.updateProduct.get('descripcion')?.setValue(producto.descripcion??"");
	      	this.updateProduct.get('codigo')?.setValue(producto.codigo??"");
	    }, error => {
	       console.error('Error en la solicitud :', error);
	       let message:Message={
	            title:"Error cargado producto",
	            error:true,
	            enable:true,
	            type:2,
	        };
	       this.sharedService.sendmsg(message);
	       this.dialogRef.close();
	    });
}
onSubmit() {
	  if (!this.updateProduct.valid) {
          
          return;
      }
      const {nombre,descripcion,codigo} = this.updateProduct.value;
      this.invService.updateProduct(this.data?.id,{nombre,descripcion,codigo}).subscribe((response) => {
	      	console.log(response)
	      	let message:Message={
	            title:"Producto Actualizado",
	            error:false,
	            enable:true,
	            type:1,
	        };
	      	this.sharedService.sendmsg(message);
	      	this.dialogRef.close();
	      	this.router.navigate(['/']);
	    }, error => {
	       console.error('Error en la solicitud :', error);
	       let message:Message={
	            title:"Error Producto Actualizado",
	            error:true,
	            enable:true,
	            type:2,
	        };
	       this.sharedService.sendmsg(message);
	       this.dialogRef.close();
	    });
}
}
