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
import {Asignar,AsignarTrabajor,AsignarFamiliar,AsignarOtro} from '../../formGroup/asignarFormGroup'
import {AsignarFamiliarComponent} from '../../components/asignar-familiar/asignar-familiar.component'
import {AsignarOtroComponent} from '../../components/asignar-otro/asignar-otro.component'
import {AsignarTrabajadorComponent} from '../../components/asignar-trabajador/asignar-trabajador.component'

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [MatSelectModule,
  			MatFormFieldModule,
  			MatInputModule,
  			MatButtonModule,
  			FormsModule,
  			ReactiveFormsModule,
  			CommonModule,
  			MatCardModule,
  			MatCheckboxModule,
        AsignarFamiliarComponent,
        AsignarOtroComponent,
        AsignarTrabajadorComponent
        ],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css'
})
export class AsignacionComponent implements OnInit {
invService= inject(InvService);
router=inject(Router);

asignar: FormGroup<Asignar>;
asignarTrabajor: FormGroup<AsignarTrabajor>;
asignarFamiliar: FormGroup<AsignarFamiliar>;
asignarOtro: FormGroup<AsignarOtro>;


selectedOption = new FormControl('');

  options = [
    { value: "1", viewValue: 'Familiar' },
    { value: "2", viewValue: 'Trabajador' },
    { value: "3", viewValue: 'Otro' },
  ];

  
constructor(
    public dialogRef: MatDialogRef<AsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  	this.asignar = new FormGroup<Asignar>(new Asignar());
  	this.asignarTrabajor = new FormGroup<AsignarTrabajor>(new AsignarTrabajor());
  	this.asignarFamiliar = new FormGroup<AsignarFamiliar>(new AsignarFamiliar());
  	this.asignarOtro = new FormGroup<AsignarOtro>(new AsignarOtro());
}
closeDialog(){
  this.dialogRef.close();
}
ngOnInit(): void {

}
onSubmit() {

}
}
