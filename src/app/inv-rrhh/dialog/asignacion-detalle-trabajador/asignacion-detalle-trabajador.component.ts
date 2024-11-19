import { AfterViewInit,Component,OnInit,Inject,inject ,ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatSelectModule} from '@angular/material/select';

import {InvService} from '../../services/inv.service'

import { Router ,ActivatedRoute} from '@angular/router';
import {DetailAsignacionTrabajador,ProductoAsignado} from '../../interfaces/familiar-interface'

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-asignacion-detalle-trabajador',
  standalone: true,
  imports: [MatSelectModule,
  			MatFormFieldModule,
  			MatInputModule,
  			ReactiveFormsModule,
  			CommonModule,
  			MatCardModule,
  			MatTableModule, 
            MatPaginatorModule],
  templateUrl: './asignacion-detalle-trabajador.component.html',
  styleUrl: './asignacion-detalle-trabajador.component.css'
})
export class AsignacionDetalleTrabajadorComponent implements OnInit {
dataSource!: MatTableDataSource<ProductoAsignado>;
@ViewChild(MatPaginator) paginator!: MatPaginator;

 displayedColumns: string[] = [ 'name', 'quantity'];


constructor(
    public dialogRef: MatDialogRef<AsignacionDetalleTrabajadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailAsignacionTrabajador,
  ) { }



//public detail: DetailAsignacion | undefined = undefined;

loadData(){
	//this.all=this.productos
	this.dataSource = new MatTableDataSource(this.data.productos);
    //this.dataSource.paginator = this.paginator;
     
}


ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


ngOnInit(): void {
    this.loadData();
 //this.dataSource.sort = this.sort;
}
}
