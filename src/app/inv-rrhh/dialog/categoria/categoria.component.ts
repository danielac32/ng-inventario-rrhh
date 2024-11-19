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
import {CategoriaForm} from '../../formGroup/categoriaFormGroup'
import {MatSelectModule} from '@angular/material/select';
import {TipoProducto} from '../../interfaces/inv-enum'
import {ListTipo} from '../../interfaces/createProduct-interface'
import {InvService} from '../../services/inv.service'
import {Categoria} from '../../interfaces/categorias-interface'
import {ProductForm} from '../../interfaces/createProduct-interface'
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categoria',
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
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

invService= inject(InvService);
router=inject(Router);
newCategoria: FormGroup<CategoriaForm>;


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


constructor(
    public dialogRef: MatDialogRef<CategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  	this.newCategoria = new FormGroup<CategoriaForm>(new CategoriaForm());
}
ngOnInit(): void {
    
}

onSubmit() {
  if(!this.newCategoria.valid) return;
  const {name,tipo} = this.newCategoria.value;
  console.log(name,tipo)
  

  const categoria:{name:string,tipo:string}=
  {
      name:name ?? '',
      tipo:tipo ?? '',
  }

  this.invService.createCategoria(categoria).subscribe((response) => {
      console.log(response)
      this.dialogRef.close();
      //this.router.navigate(['/']);
  }, error => {
     console.error('Error en la solicitud :', error);
     this.dialogRef.close();
  });



}
}
