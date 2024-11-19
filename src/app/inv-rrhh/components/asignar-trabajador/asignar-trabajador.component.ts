import { Component,OnInit,Inject,inject,ViewChild,EventEmitter,Output } from '@angular/core';
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
import {Trabajador} from '../../interfaces/trabajador-interface'
import {Familiar} from '../../interfaces/familiar-interface'
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import {ProductCart} from '../../shared/shared.cart-interface'
import {SharedService} from '../../shared/shared.service'
import {TipoAsignacion} from '../../interfaces/inv-enum'
 import {Message} from '../../interfaces/shared-interface'
@Component({
  selector: 'app-asignar-trabajador',
  standalone: true,
  imports: [MatSelectModule,
  			MatFormFieldModule,
  			MatInputModule,
  			MatButtonModule,
  			FormsModule,
  			ReactiveFormsModule,
  			CommonModule,
  			MatCardModule,
  			MatCheckboxModule,],
  templateUrl: './asignar-trabajador.component.html',
  styleUrl: './asignar-trabajador.component.css'
})
export class AsignarTrabajadorComponent implements OnInit {
invService= inject(InvService);
router=inject(Router);
sharedService=inject(SharedService);
 @Output() closeDialogEvent = new EventEmitter<void>();


asignar: FormGroup<Asignar>;
asignarTrabajor: FormGroup<AsignarTrabajor>;
asignarFamiliar: FormGroup<AsignarFamiliar>;
asignarOtro: FormGroup<AsignarOtro>;
constructor() {
  	this.asignar = new FormGroup<Asignar>(new Asignar());
  	this.asignarTrabajor = new FormGroup<AsignarTrabajor>(new AsignarTrabajor());
  	this.asignarFamiliar = new FormGroup<AsignarFamiliar>(new AsignarFamiliar());
  	this.asignarOtro = new FormGroup<AsignarOtro>(new AsignarOtro());
}


 trabajador: Trabajador[] = [];
 
 selectedTrabajador: Trabajador | null = null;
 searchControl = new FormControl('');
 

 filteredTrabajadores = [...this.trabajador]; // Inicializa con la lista completa
 

 @ViewChild('selectTrabajador') selectTrabajador!: MatSelect;
 cart: ProductCart[] = [];

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
}


loadTrabajadores(){
    this.invService.getPersonal().subscribe(({trabajador}) => {
      this.trabajador=trabajador;

      this.searchControl.valueChanges.subscribe(() => {
      this.filterTrabajadores();
    });

     this.sharedService.cart$.subscribe(products => {
        this.cart = products;
     });

    }, error => {
       console.error('Error en la solicitud :', error);
    });
}
 

ngOnInit(): void {
this.loadTrabajadores();
}


onSubmit() {
  if(!this.asignarTrabajor.valid) return;
  const {trabajador} = this.asignarTrabajor.value;

  let trabajadorObj: Trabajador;
  try {
    trabajadorObj = typeof trabajador === 'string' ? JSON.parse(trabajador) : trabajador;
  } catch (error) {
    console.error("Error al parsear trabajador:", error);
    return;
  }


  const createAsignacionDto = {
      trabajadorId: trabajadorObj.id_personal, // Asigna el ID del trabajador
       
      //otro: '', // Si es necesario, asigna un valor a 'otro' o déjalo vacío
      observacion: 'Entrega de productos a trabajador', // Puede ser un campo opcional, agrega información relevante
      tipo: TipoAsignacion.TRABAJADOR, // El tipo de asignación
      productos: this.cart.map((producto) => ({
        id: producto.id,
        name: producto.name,
        quantity: producto.quantity
      }))
    };
    

    this.invService.createAsignacion(createAsignacionDto).subscribe((response) => {
       console.log(response)
          let message:Message={
              title:"Producto asignado",
              error:false,
              enable:true,
              type:1,
          };
          this.sharedService.sendmsg(message);
          this.sharedService.clearCart();
       this.closeDialogEvent.emit();//mensaje para cerrar el dialog
    }, error => {
       console.error('Error en la solicitud :', error);
    });

}


}