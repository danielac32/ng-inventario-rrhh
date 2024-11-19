import { Component,OnInit,Inject,inject,ViewChild } from '@angular/core';
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

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {Modificacion} from '../../interfaces/history-interface'
import {Message} from '../../interfaces/shared-interface'
import {SharedService} from '../../shared/shared.service'


@Component({
  selector: 'app-details',
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
  			MatTableModule, 
            MatPaginatorModule,],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
invService= inject(InvService);
router=inject(Router);
sharedService=inject(SharedService);
all :Modificacion[]=[]


constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  	 
}

displayedColumns: string[] = ['id','cantidad', 'descripcion', 'tipo', 'entregado',  'createdAt'];
   
dataSource!: MatTableDataSource<Modificacion>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;



loadHistory(){
    this.invService.getHistoryProductId(this.data.id).subscribe(({modificaciones}) => {
    	console.log(modificaciones)

       this.all=modificaciones;
       if (this.all.length === 0) {
      this.sendEmpty();
    }
       this.dataSource = new MatTableDataSource(this.all);
       this.dataSource.paginator = this.paginator;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
}

sendEmpty(){
         let message:Message={
              title:"No tiene historial",
              error:false,
              enable:true,
              type:3,
          };
         this.sharedService.sendmsg(message);
         this.dialogRef.close();
}



ngOnInit(): void {

this.loadHistory();
   
}
onSubmit() {

}
}
