import { Component ,OnInit,inject,ViewChild} from '@angular/core';
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { MatDialog } from '@angular/material/dialog';
import { Router ,ActivatedRoute} from '@angular/router';
import {InvService} from '../../services/inv.service'
//import {Producto} from '../../interfaces/createProduct-interface'
import {TypeProduct} from '../../interfaces/inv-enum'
import {CardComponent} from '../../components/card/card.component'

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatCardModule } from '@angular/material/card'; 
import { ReactiveFormsModule } from '@angular/forms';
import {UpdateProductComponent} from '../../dialog/update-product/update-product.component'
import {AddComponent} from '../../dialog/add/add.component'
import {SubComponent} from '../../dialog/sub/sub.component'
import {DeletePassComponent} from '../../dialog/delete-pass/delete-pass.component'
import {DetailsComponent} from '../../dialog/details/details.component'
import {TipoAsignacion} from '../../interfaces/inv-enum'
import {ResponseAsignacionOtro,ProductoInterface,Asignacion} from '../../interfaces/asignacion-interface'


import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-list-otro',
  standalone: true,
  imports: [ReactiveFormsModule,
            MatTooltipModule,
            MatCardModule,
            CommonModule,
            MatFormFieldModule,
            MatInputModule,
            CardComponent,
            MatTableModule, 
            MatPaginatorModule,
            MatButtonModule,
            MatMenuModule],
  templateUrl: './list-otro.component.html',
  styleUrl: './list-otro.component.css'
})
export class ListOtroComponent   implements OnInit {
	router=inject(Router);
	invService= inject(InvService);
	sharedService=inject(SharedService);
	route=inject(ActivatedRoute);
    dialog= inject(MatDialog);
 
    asignaciones:Asignacion[]=[]; 

    displayedColumns: string[] = ['id','recibe','observación', 'createdAt','lista'];
   
    dataSource!: MatTableDataSource<Asignacion>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    loadAllProuctos(){
	    this.invService.getProductoAsignacion(2).subscribe(({asignacion}) => {
	       //this.all=asignacion.productos
	       this.asignaciones=asignacion;
	       this.dataSource = new MatTableDataSource(this.asignaciones);
	       this.dataSource.paginator = this.paginator;
         console.log(asignacion)
	    }, error => {
	       console.error('Error en la solicitud :', error);
	    });
	  }

	ngOnInit(): void {
     
    this.loadAllProuctos();
  }






}
