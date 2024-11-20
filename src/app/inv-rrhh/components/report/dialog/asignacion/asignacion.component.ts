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
import {Asignacion} from '../../formGroupReport/Asignacion-FormGroup'

import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

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
  			 MatDatepickerModule,
  			MatCheckboxModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css'
})
export class AsignacionComponent implements OnInit {
invService= inject(InvService);
router=inject(Router);
sharedService=inject(SharedService);
asignacion: FormGroup<Asignacion>;
constructor(public dialogRef: MatDialogRef<AsignacionComponent>) {
  	this.asignacion = new FormGroup<Asignacion>(new Asignacion());
}

ngOnInit(): void {
 
}
onSubmit() {
    if(!this.asignacion.valid) return;
    const {desde,hasta} = this.asignacion.value;
    const consulta={
        //otro:otro,
            desde:desde,
            hasta:hasta
    };
    //console.log(consulta)
    this.invService.createReportTotal(consulta);
    this.dialogRef.close();
}

}
