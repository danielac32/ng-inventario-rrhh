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
import {AsignacionFamiliar} from '../../formGroupReport/AsignacionFamiliar-FormGroup'

import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-asignacion-familiar',
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
  templateUrl: './asignacion-familiar.component.html',
  styleUrl: './asignacion-familiar.component.css'
})


export class AsignacionFamiliarComponent implements OnInit {
invService= inject(InvService);
router=inject(Router);
sharedService=inject(SharedService);
trabajador: Trabajador[] = [];
familiar :Familiar[]=[]
selectedTrabajador: Trabajador | null = null;
searchControl = new FormControl('');
filteredTrabajadores = [...this.trabajador]; // Inicializa con la lista completa
@ViewChild('selectTrabajador') selectTrabajador!: MatSelect;




asignacionFamiliar: FormGroup<AsignacionFamiliar>;
constructor(public dialogRef: MatDialogRef<AsignacionFamiliarComponent>) {
  	this.asignacionFamiliar = new FormGroup<AsignacionFamiliar>(new AsignacionFamiliar());
}


openSelect() {
     if (this.selectTrabajador) {
      this.selectTrabajador.open(); // Abre el select
    } else {
      console.error('selectTrabajador no está definido');
    }
  }
filterTrabajadores() {
    const searchTerm = this.searchControl.value;
    if (!searchTerm) {
      this.filteredTrabajadores = [...this.trabajador]; // Si no hay búsqueda, muestra todos
    } else {
      this.filteredTrabajadores = this.trabajador.filter(t =>
        `${t.cedula} ${t.primer_nombre} ${t.primer_apellido}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
  }

onSelected(event: any): void {
    console.log(event.value)
    this.selectedTrabajador=event.value;
    this.invService.getFamiliares(Number(this.selectedTrabajador?.id_personal)).subscribe(({familiar}) => {
       this.familiar=familiar;
       //console.log(familiar)
    }, error => {
       console.error('Error en la solicitud :', error);
    });
}


loadTrabajadores(){
    this.invService.getPersonal().subscribe(({trabajador}) => {
      this.trabajador=trabajador;
      this.searchControl.valueChanges.subscribe(() => {
        this.filterTrabajadores();
      });
      
    }, error => {
       console.error('Error en la solicitud :', error);
    });
}

loadFamiliares(){
    this.invService.getFamiliares(1).subscribe(({familiar}) => {
       this.familiar=familiar;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
}

getFamiliares(): Promise<Familiar[]> {
  return new Promise((resolve, reject) => {
    if (this.selectedTrabajador) {
      this.invService.getFamiliares(this.selectedTrabajador.id_personal).subscribe(
        ({ familiar }) => {
          resolve(familiar); // Devuelve el array de familiares cuando la respuesta llega
        },
        error => {
          console.error('Error en la solicitud:', error);
          reject([]); // En caso de error, devuelve un array vacío
        }
      );
    } else {
      resolve([]); // Si no hay trabajador seleccionado, devuelve un array vacío
    }
  });
}



ngOnInit(): void {
this.loadTrabajadores();
}

onSubmit() {
    if(!this.asignacionFamiliar.valid) return;
    const {trabajador,familiar,desde,hasta} = this.asignacionFamiliar.value;

    let trabajadorObj: Trabajador;
    try {
      trabajadorObj = typeof trabajador === 'string' ? JSON.parse(trabajador) : trabajador;
    } catch (error) {
      console.error("Error al parsear trabajador:", error);
      return;
    }
    let familiarObj: Familiar;
    try {
      familiarObj = typeof familiar === 'string' ? JSON.parse(familiar) : familiar;
    } catch (error) {
      console.error("Error al parsear familiar:", error);
      return;
    }


    //console.log(trabajador,familiar,desde,hasta)
    const consulta={
    		trabajadorId: trabajadorObj.id_personal, // Asigna el ID del trabajador
        familiarId: familiarObj.id_familiar,
        nombre:familiarObj.primer_nombre,
        apellido:familiarObj.primer_apellido,
        cedula:familiarObj.cedula_familiar,
        parentesco:familiarObj.parentesco,
        desde:desde,
        hasta:hasta
    };
    //console.log(consulta)
    this.invService.createReportFamiliar(consulta);
    this.dialogRef.close();

}

}
