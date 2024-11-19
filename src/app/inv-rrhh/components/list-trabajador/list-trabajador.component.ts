import { Component ,OnInit,inject,ViewChild} from '@angular/core';
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { MatDialog } from '@angular/material/dialog';
import { Router ,ActivatedRoute} from '@angular/router';
import {InvService} from '../../services/inv.service'
import {Producto} from '../../interfaces/createProduct-interface'
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
import {Trabajador} from '../../interfaces/trabajador-interface'
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import {Asignacion} from '../../interfaces/asignacion-interface'
import {FamiliarInterface,ProductoAsignado,ResponseAsignacion} from '../../interfaces/familiar-interface'
import {AsignacionDetalleComponent} from '../../dialog/asignacion-detalle/asignacion-detalle.component'
import {TipoAsignacion} from '../../interfaces/inv-enum'

import {AsignacionDetalleTrabajadorComponent} from '../../dialog/asignacion-detalle-trabajador/asignacion-detalle-trabajador.component'
import {AsignacionDetalleOtroComponent} from '../../dialog/asignacion-detalle-otro/asignacion-detalle-otro.component'


@Component({
  selector: 'app-list-trabajador',
  standalone: true,
  imports: [  ReactiveFormsModule,
              MatTooltipModule,
              MatCardModule,
              CommonModule,
              MatFormFieldModule,
              MatInputModule,
              CardComponent,
              MatTableModule, 
              MatPaginatorModule,
              MatButtonModule, 
              MatMenuModule,
              AsignacionDetalleComponent,
              AsignacionDetalleTrabajadorComponent,
              AsignacionDetalleOtroComponent
            ],
  templateUrl: './list-trabajador.component.html',
  styleUrl: './list-trabajador.component.css'
})

export class ListTrabajadorComponent  implements OnInit {
	router=inject(Router);
	invService= inject(InvService);
	sharedService=inject(SharedService);
	route=inject(ActivatedRoute);
  dialog= inject(MatDialog);
  all :Trabajador[]=[]
  listAsignacion:Asignacion[]=[]
  displayedColumns: string[] = ['id','cedula', 'nombre', 'apellido','acciones'];
   

  dataSource!: MatTableDataSource<Trabajador>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    


  loadAllTrabajadores(){
    this.invService.getPersonal().subscribe(({trabajador}) => {
       this.all=trabajador;
       this.dataSource = new MatTableDataSource(this.all);
       this.dataSource.paginator = this.paginator;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }


filterByCategory() {
    this.dataSource.filter = this.dataSource.filter; // Esto aplicará el filterPredicate
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      	this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.loadAllTrabajadores();
  }


  familiar: FamiliarInterface | undefined;
  productos: ProductoAsignado[] = [];




asignarFamiliar(asignacion_id:number,asignacion_familiarId:number){
this.invService.getProductoAsignado(Number(asignacion_id),Number(asignacion_familiarId)).subscribe((response:ResponseAsignacion) => {
       this.familiar = response.familiar[0];
       this.productos = response.productos;

        const dialogRef = this.dialog.open(AsignacionDetalleComponent, {
        width: 'auto',
        maxWidth: '90vw',
        autoFocus: false,
          //     height:'700px',
          data: { 
                  "familiar":this.familiar,
                  "productos":this.productos
                },
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log('El diálogo se cerró');
          //console.log('Resultado:', result);
          //this.navegar("/");
        });

    }, error => {
       console.error('Error en la solicitud :', error);
    });
}


asignarTrabajador(asignacion_id:number){
    this.invService.getProductoAsignado2(Number(asignacion_id)).subscribe(({productos}) => {
      console.log(productos)
        const dialogRef = this.dialog.open(AsignacionDetalleTrabajadorComponent, {
        width: 'auto',
        maxWidth: '90vw',
        autoFocus: false,
     
        data: { 
                   "productos":productos
                },
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });

    }, error => {
       console.error('Error en la solicitud :', error);
    });
}

asignarOtro(asignacion_id:number){
    this.invService.getProductoAsignado2(Number(asignacion_id)).subscribe(({productos}) => {
      console.log(productos)
        const dialogRef = this.dialog.open(AsignacionDetalleOtroComponent, {
        width: 'auto',
        maxWidth: '90vw',
        autoFocus: false,
     
        data: { 
                   "productos":productos
                },
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });

    }, error => {
       console.error('Error en la solicitud :', error);
    });
}

loadProductoAsignado(asignacion:Asignacion){

  if(asignacion.tipo===TipoAsignacion.FAMILIAR){
      this.asignarFamiliar(asignacion.id,asignacion.familiarId ?? 0);
  }else if(asignacion.tipo===TipoAsignacion.TRABAJADOR){
      this.asignarTrabajador(asignacion.id);
  }else if(asignacion.tipo===TipoAsignacion.OTRO){
     // this.asignarOtro(asignacion.id);
  }
}



loadAsigaciones(id:number){
	this.invService.findAsignacionByTrabajador(id).subscribe(({asignacion}) => {
       this.listAsignacion=asignacion;
      // console.log(asignacion)
    }, error => {
       console.error('Error en la solicitud :', error);
    });
}


}
