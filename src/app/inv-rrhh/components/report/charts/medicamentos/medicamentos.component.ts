import { Component,OnInit,Inject,inject,ViewChild,Output,EventEmitter,NgModule } from '@angular/core';
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
import {InvService} from '../../../../services/inv.service'

import { Router ,ActivatedRoute} from '@angular/router';
 
import {Trabajador} from '../../../../interfaces/trabajador-interface'
import {Familiar} from '../../../../interfaces/familiar-interface'
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import {ProductCart} from '../../../../shared/shared.cart-interface'
import {SharedService} from '../../../../shared/shared.service'
import {TipoAsignacion} from '../../../../interfaces/inv-enum'
import {Message} from '../../../../interfaces/shared-interface' 
import {AsignacionTrabajador} from '../../formGroupReport/AsignacionTrabajador-FormGroup'
 
 import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
 
 import {Producto} from '../../../../interfaces/createProduct-interface'
import {TypeProduct} from '../../../../interfaces/inv-enum'
import { ChangeDetectorRef } from '@angular/core';
import { CanvasJSChart } from '@canvasjs/angular-charts';



@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            MatCardModule,
            CanvasJSAngularChartsModule
        ],
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.css'
})




export class MedicamentosComponent implements OnInit {
invService= inject(InvService);
router=inject(Router);
sharedService=inject(SharedService);
items : Producto[]=[];
private cdr = inject(ChangeDetectorRef);
  @ViewChild(CanvasJSChart) chartComponent!: CanvasJSChart;



chartOptions: any = {
    title: {
      text: "Stock de Medicamentos"
    },
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    axisY: {
      includeZero: true,
      valueFormatString: "#,##0" // Formato sin símbolo de moneda
    },
    data: [{
      type: "column",
      color: "#01b8aa",
      dataPoints: [] // Se llenará dinámicamente
    }]
  };


 loadMedicamentos(){
    this.invService.getProducto(TypeProduct.MEDICAMENTOS).subscribe(({producto}) => {
       this.items=producto;
       console.log(producto)
       this.updateChartData();
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }
  

  updateChartData() {
    this.chartOptions.data[0].dataPoints = this.items.map(item => ({
      label: item.nombre, // Nombre del medicamento para el eje X
      y: item.stock       // Stock para el eje Y
    }));

   // Renderizar el gráfico usando la referencia
    if (this.chartComponent && this.chartComponent.chart) {
      this.chartComponent.chart.render();
    }
//this.cdr.detectChanges();
  }

ngOnInit(): void {
    this.invService.getProducto(TypeProduct.MEDICAMENTOS).subscribe(({producto}) => {
       this.items=producto;
       //console.log(producto)
       this.updateChartData();
    }, error => {
       console.error('Error en la solicitud :', error);
    });
}




}
