import { Component,OnInit,Inject,inject,ViewChild,Output,EventEmitter } from '@angular/core';
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
import {AsignacionOtro} from '../../formGroupReport/AsignacionOtro-FromGroup'

import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Asignacion} from '../../../../interfaces/asignacion-interface'



@Component({
  selector: 'app-asignacion-otro',
  standalone: true,
  imports: [MatSelectModule,
  			MatFormFieldModule,
  			MatInputModule,
  			MatButtonModule,
  			FormsModule,
  			ReactiveFormsModule,
  			CommonModule,
  			MatCardModule,
  			 MatDatepickerModule,
  			MatCheckboxModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './asignacion-otro.component.html',
  styleUrl: './asignacion-otro.component.css'
})


export class AsignacionOtroComponent  implements OnInit {
invService= inject(InvService);
router=inject(Router);
sharedService=inject(SharedService);
asignaciones:Asignacion[]=[]; 
searchControl = new FormControl('');
 
filteredOtros = [...this.asignaciones]; // Inicializa con la lista completa
@ViewChild('selectOtro') selectOtro!: MatSelect;




asignacionOtro: FormGroup<AsignacionOtro>;
constructor() {
  	this.asignacionOtro = new FormGroup<AsignacionOtro>(new AsignacionOtro());
}




openSelect() {
    if (this.selectOtro) {
      this.selectOtro.open(); // Abre el select
    } else {
      console.error('selectOtro no está definido');
    }
  }


filterOtros() {
    const searchTerm = this.searchControl.value;
    if (!searchTerm) {
      this.filteredOtros = [...this.asignaciones]; // Si no hay búsqueda, muestra todos
    } else {
      this.filteredOtros = this.asignaciones.filter(t =>
        `${t.otro} ${t.observacion} `
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
  }



loadAllOtro(){
    this.invService.getProductoAsignacion(2).subscribe(({asignacion}) => {
       //this.all=asignacion.productos
       this.asignaciones=asignacion;
       this.searchControl.valueChanges.subscribe(() => {
       this.filterOtros();
      });
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }



ngOnInit(): void {
     
    this.loadAllOtro();
 }

onSubmit() {
    if(!this.asignacionOtro.valid) return;
    const {otro,desde,hasta} = this.asignacionOtro.value;
    const consulta={
    		otro:otro,
            desde:desde,
            hasta:hasta
    };
    console.log(consulta)

}
}
