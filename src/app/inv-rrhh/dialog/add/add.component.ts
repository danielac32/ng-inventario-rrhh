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
import {TipoModificacion} from '../../interfaces/inv-enum'
@Component({
  selector: 'app-add',
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
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
invService= inject(InvService);
updateProduct: FormGroup<ProductStock>;
sharedService=inject(SharedService);
router=inject(Router);
stock:number=0;
actualStock:number=0;

constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  	this.updateProduct = new FormGroup<ProductStock>(new ProductStock());
}
ngOnInit(): void {
		console.log(this.data?.id)
		this.invService.getProductoById(this.data?.id).subscribe(({producto}) => {
	      	//this.updateProduct.get('nombre')?.setValue(producto.nombre??"");
	      	//this.updateProduct.get('descripcion')?.setValue(producto.descripcion??"");
	      	//this.updateProduct.get('codigo')?.setValue(producto.codigo??"");
	      	this.stock=producto.stock;
	      	this.actualStock=producto.stock;
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
      const {stock} = this.updateProduct.value;
      if(!stock) return;
      if(Number(stock)<0){
      	    let message:Message={
	            title:"El numero no puede ser negativo",
	            error:true,
	            enable:true,
	            type:2,
	        };
	      	this.sharedService.sendmsg(message);
	      	this.dialogRef.close();
	      	return;
      }

 	
      let finalStock= this.actualStock+Number(stock);
      if(Number(finalStock)<0){
      	 let message:Message={
            title:"El numero no puede ser negativo",
            error:true,
            enable:true,
            type:2,
        };
      	this.sharedService.sendmsg(message);
      	this.dialogRef.close();
      	return;
      }
      this.invService.addStockProduct(this.data?.id,{ 
      	 												"stock":Number(stock),
      													"cantidad":Number(finalStock),
      													"tipo":TipoModificacion.SUMA,
      													"entregado":"NO"
      												}).subscribe((response) => {
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
	            title:"Error Producto",
	            error:true,
	            enable:true,
	            type:2,
	        };
	       this.sharedService.sendmsg(message);
	       this.dialogRef.close();
	    });
}
}