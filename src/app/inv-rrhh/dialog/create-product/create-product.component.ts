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
import {Product} from '../../formGroup/createProductformGroup'
import {MatSelectModule} from '@angular/material/select';
import {TipoProducto} from '../../interfaces/inv-enum'
import {ListTipo} from '../../interfaces/createProduct-interface'
import {InvService} from '../../services/inv.service'
import {Categoria} from '../../interfaces/categorias-interface'
import {ProductForm} from '../../interfaces/createProduct-interface'
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-product',
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

  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})


export class CreateProductComponent implements OnInit {
invService= inject(InvService);
router=inject(Router);
newProduct: FormGroup<Product>;

 selectedTipo: TipoProducto | null = null; // Inicializa como null
 selectedCategoria: string | null = null; // Para la categoría seleccionada
 
 listMedicamentos :Categoria[]=[]
 listUniformes :Categoria[]=[]
 listOdontologia :Categoria[]=[]

 tipos: ListTipo[] = [
    { tipo: 'Medicamentos', value: TipoProducto.MEDICAMENTOS },
    { tipo: 'Uniformes', value: TipoProducto.UNIFORMES },
    { tipo: 'Equipos Odontológicos', value: TipoProducto.EQUIPOS_ODONTOLOGICOS }
  ];



 onTipoSelected(event: any): void {
    this.selectedTipo = event.value; // Obtiene el valor seleccionado
    this.selectedCategoria = null; // Resetea la categoría seleccionada
    // Aquí puedes realizar otras acciones según el tipo seleccionado
    //console.log('Tipo seleccionado:', this.selectedTipo);
  }



  loadCategoriasMedicamentos(){
    this.invService.getCategoria(0).subscribe(({categoria}) => {
       this.listMedicamentos=categoria;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }

  loadCategoriasOdontologia(){
    this.invService.getCategoria(1).subscribe(({categoria}) => {
       this.listOdontologia=categoria;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }

  loadCategoriasUniformes(){
    this.invService.getCategoria(2).subscribe(({categoria}) => {
       this.listUniformes=categoria;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }




getCategorias(): Categoria[] {
    switch (this.selectedTipo) {
      case TipoProducto.MEDICAMENTOS:
        //return ['Antibióticos', 'Analgésicos', 'Antiinflamatorios'];
        return this.listMedicamentos;
      case TipoProducto.UNIFORMES:
        //return ['Camisas', 'Pantalones'];
        return this.listUniformes;
      case TipoProducto.EQUIPOS_ODONTOLOGICOS:
        //return ['Cámaras', 'Espejos'];
        return this.listOdontologia;
      default:
        return [];
    }
  }


constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  	this.newProduct = new FormGroup<Product>(new Product());
}



ngOnInit(): void {
    this.loadCategoriasMedicamentos();
    this.loadCategoriasUniformes();
    this.loadCategoriasOdontologia();
}



onSubmit() {
  if(!this.newProduct.valid) return;
  const {nombre,descripcion,codigo,stock,tipo,categoriaId} = this.newProduct.value;
  //console.log(nombre,descripcion,codigo,stock,tipo,categoriaId)

  const producto:ProductForm = {
      nombre: nombre??'',
	    descripcion: descripcion??'',
	    codigo: codigo??'',
	    stock: Number(stock),
	    tipo: tipo??'',
	    categoriaId:Number(categoriaId)
  }
   

  this.invService.createProduct(producto).subscribe((response) => {
        console.log(response)
        this.dialogRef.close();
        this.router.navigate(['/']);
    }, error => {
       console.error('Error en la solicitud :', error);
       this.dialogRef.close();
    });
}



}
