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
import { jsPDF } from 'jspdf';





@Component({
  selector: 'app-asignar-otro',
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
  templateUrl: './asignar-otro.component.html',
  styleUrl: './asignar-otro.component.css'
})
export class AsignarOtroComponent  implements OnInit {
invService= inject(InvService);
router=inject(Router);
sharedService=inject(SharedService);
@Output() closeDialogEvent = new EventEmitter<void>();

asignar: FormGroup<Asignar>;
asignarTrabajor: FormGroup<AsignarTrabajor>;
asignarFamiliar: FormGroup<AsignarFamiliar>;
asignarOtro: FormGroup<AsignarOtro>;

cart: ProductCart[] = [];



constructor() {
  	this.asignar = new FormGroup<Asignar>(new Asignar());
  	this.asignarTrabajor = new FormGroup<AsignarTrabajor>(new AsignarTrabajor());
  	this.asignarFamiliar = new FormGroup<AsignarFamiliar>(new AsignarFamiliar());
  	this.asignarOtro = new FormGroup<AsignarOtro>(new AsignarOtro());
}

ngOnInit(): void {
 this.sharedService.cart$.subscribe(products => {
    this.cart = products;
 });
}

/*
generatePDF(acta: any) {
  const doc = new jsPDF();

  // Ruta de la imagen en la carpeta assets
  const imgPath = 'assets/acta.png'; // Ruta relativa desde el proyecto Angular
  
  // Cargar la imagen desde assets
  const img = new Image();
  img.src = imgPath;

  img.onload = () => {
    // Agregar la imagen al PDF (ajustar posición y tamaño)
    doc.addImage(img, 'PNG', 10, 10, 190, 25); // Ajustar tamaño y posición según sea necesario

    // Agregar contenido al PDF
    doc.setFontSize(18);
    doc.text('ACTA DE ENTREGA', 105, 50, { align: 'center' });

    doc.setFontSize(14);
    doc.text('ASIGNACIÓN: Productos', 105, 60, { align: 'center' });

    const text = `La Oficina Nacional del Tesoro, a través de la Dirección General de Recursos Humanos, y en aras de llevar mejoras a las condiciones de vida de los trabajadores, hace entrega de los medicamentos que se relacionan a continuación, a la Ciudadana SUBGEYDY FIGUEROA, titular de la Cédula de Identidad Nro. V-16.091.411, para tratamiento de su madre DILIA ARVELO.`;
    doc.setFontSize(12);
    doc.text(text, 15, 80, { maxWidth: 180 });

    // Agregar lista ficticia de productos
    const productos = [
      'VALSARTAN                    1 CAJA',
      'AMLODIPINA                   1 CAJA',
      'ATORVASTATINA               1 CAJA',
      'OMEGA 3                      1 FRASCO'
    ];

    let yPosition = 100;
    productos.forEach(producto => {
      doc.text(producto, 15, yPosition);
      yPosition += 10;
    });

    // Agregar texto para "Autorizado por"
    doc.text('AUTORIZADO POR:', 15, yPosition + 10);

    yPosition += 20;
    doc.text('_______________________________', 15, yPosition);
    doc.text('ARELIS DIAZ', 15, yPosition + 10);
    doc.text('Directora General de Recursos Humanos', 15, yPosition + 20);
    doc.text('Oficina Nacional del Tesoro', 15, yPosition + 30);

    // Descargar PDF
    doc.save('Acta_de_Entrega.pdf');
  };

  img.onerror = (error) => {
    console.error('Error al cargar la imagen:', error);
  };
}
*/

onSubmit() {
if(!this.asignarOtro.valid) return;
  const {otro,observacion} = this.asignarOtro.value;
  const createAsignacionDto = {
       
      otro: otro, // Si es necesario, asigna un valor a 'otro' o déjalo vacío
      observacion:  observacion, // Puede ser un campo opcional, agrega información relevante
      tipo: TipoAsignacion.OTRO, // El tipo de asignación
      productos: this.cart.map((producto) => ({
        id: producto.id,
        name: producto.name,
        quantity: producto.quantity
      }))
    };
    this.invService.createAsignacion(createAsignacionDto).subscribe((response) => {
       console.log(response);
          let message:Message={
              title:"Producto asignado",
              error:false,
              enable:true,
              type:1,
          };
          let reload:Message={
              title:"",
              error:false,
              enable:false,
              type:0,
              reload:true
          };
          this.invService.getAsignacionActa(createAsignacionDto);
          this.sharedService.sendmsg(message);
          this.sharedService.clearCart();
          //this.generatePDF(createAsignacionDto);

          this.sharedService.sendmsg(reload);
          this.closeDialogEvent.emit();//mensaje para cerrar el dialog
          
    }, error => {
       console.error('Error en la solicitud :', error);
    });



}


}

