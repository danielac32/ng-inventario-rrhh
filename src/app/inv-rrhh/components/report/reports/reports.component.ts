import { Component ,OnInit,inject,ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/shared.service'
import {Message} from '../../../interfaces/shared-interface'
import { MatDialog } from '@angular/material/dialog';
import { Router ,ActivatedRoute} from '@angular/router';
import {InvService} from '../../../services/inv.service'
import {Producto} from '../../../interfaces/createProduct-interface'
import {TypeProduct} from '../../../interfaces/inv-enum'
import {CardComponent} from '../../../components/card/card.component'

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatCardModule } from '@angular/material/card'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import {ChangeDetectionStrategy, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';


import {AsignacionFamiliarComponent} from '../dialog/asignacion-familiar/asignacion-familiar.component'
import {AsignacionOtroComponent} from '../dialog/asignacion-otro/asignacion-otro.component'
import {AsignacionTrabajadorComponent} from '../dialog/asignacion-trabajador/asignacion-trabajador.component'
import {ProductoCategoriaComponent} from '../dialog/producto-categoria/producto-categoria.component'
import {ProductoHistorialComponent} from '../dialog/producto-historial/producto-historial.component'
import {ProductoRecordComponent} from '../dialog/producto-record/producto-record.component'
import {AsignacionComponent} from '../dialog/asignacion/asignacion.component'



@Component({
  selector: 'app-reports',
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
              MatExpansionModule,
              AsignacionFamiliarComponent,
              AsignacionOtroComponent,
              AsignacionTrabajadorComponent,
              ProductoCategoriaComponent,
              ProductoHistorialComponent,
              ProductoRecordComponent,
              AsignacionComponent
              ],
              changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
	router=inject(Router);
	invService= inject(InvService);
	sharedService=inject(SharedService);
	route=inject(ActivatedRoute);
    dialog= inject(MatDialog);
    readonly panelOpenState = signal(false);

	ngOnInit(): void {

	}

  generarReporte(){
    const dialogRef = this.dialog.open(AsignacionComponent, {
        width: '315px',
        autoFocus: false,
        
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });
  }
	generarReporteAt(){
		const dialogRef = this.dialog.open(AsignacionTrabajadorComponent, {
        width: '315px',
        autoFocus: false,
        
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });

	}

	generarReporteAf(){
		const dialogRef = this.dialog.open(AsignacionFamiliarComponent, {
        width: '315px',
        autoFocus: false,
        
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });
	}

	generarReporteAo(){
		const dialogRef = this.dialog.open(AsignacionOtroComponent, {
        width: '315px',
        autoFocus: false,
        
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });
	}

    generarReportePc(){
    	const dialogRef = this.dialog.open(ProductoCategoriaComponent, {
        width: 'auto',
        maxWidth: '90vw',
        autoFocus: false,
        
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });
    }

    generarReportePr(){
    	const dialogRef = this.dialog.open(ProductoRecordComponent, {
        width: 'auto',
        maxWidth: '90vw',
        autoFocus: false,
        
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });
    }
    generarReporteH(){
    	const dialogRef = this.dialog.open(ProductoHistorialComponent, {
        width: 'auto',
        maxWidth: '90vw',
        autoFocus: false,
        
        });

        dialogRef.afterClosed().subscribe(result => {
          
        });
    }
  


}
