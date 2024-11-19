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
import {CategoriaFormUpdate} from '../../formGroup/categoriaFormGroup'
import {MatSelectModule} from '@angular/material/select';
import {TipoProducto} from '../../interfaces/inv-enum'
import {ListTipo} from '../../interfaces/createProduct-interface'
import {InvService} from '../../services/inv.service'
import {Categoria} from '../../interfaces/categorias-interface'
import {ProductForm,Producto} from '../../interfaces/createProduct-interface'
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { Router ,ActivatedRoute} from '@angular/router';
//import {Categoria} from '../../interfaces/categorias-interface'



@Component({
  selector: 'app-update-categoria',
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
  templateUrl: './update-categoria.component.html',
  styleUrl: './update-categoria.component.css'
})
export class UpdateCategoriaComponent implements OnInit {
invService= inject(InvService);
updateCategoria: FormGroup<CategoriaFormUpdate>;
sharedService=inject(SharedService);
router=inject(Router);
constructor(
    public dialogRef: MatDialogRef<UpdateCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  	this.updateCategoria = new FormGroup<CategoriaFormUpdate>(new CategoriaFormUpdate());
}
ngOnInit(): void {
console.log(this.data?.id)
	this.invService.getCategoriaId(this.data?.id).subscribe(({categoria}) => {
      	this.updateCategoria.get('name')?.setValue(categoria.name??"");
      	
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
	  if (!this.updateCategoria.valid) {
          
          return;
      }
      const {name} = this.updateCategoria.value;
      this.invService.updateCategoria(this.data?.id,{name:name}).subscribe((response) => {
	      	console.log(response)
	      	let message:Message={
	            title:"Categoria Actualizada",
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
	            title:"Error Categoria Actualizado",
	            error:true,
	            enable:true,
	            type:2,
	        };
	       this.sharedService.sendmsg(message);
	       this.dialogRef.close();
	    });
}
}
