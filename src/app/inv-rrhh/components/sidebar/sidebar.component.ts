import { Component,OnInit,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {InvService} from '../../services/inv.service'
import {Categoria} from '../../interfaces/categorias-interface'

import {CreateProductComponent} from '../../dialog/create-product/create-product.component'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {CartComponent} from '../../dialog/cart/cart.component'
import {CategoriaComponent} from '../../dialog/categoria/categoria.component'
import {AsignacionComponent} from '../../dialog/asignacion/asignacion.component'


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule,
            MatMenuModule,
            MatTooltipModule,
            MatIconModule,
            CreateProductComponent,
            CartComponent,
            CategoriaComponent,
            AsignacionComponent],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  router=inject(Router);
  sharedService=inject(SharedService);
  invService= inject(InvService);
  dialog= inject(MatDialog);

  listMedicamentos :Categoria[]=[]
  listUniformes :Categoria[]=[]
  listOdontologia :Categoria[]=[]
  

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

  clickMedicamentos(type:string,id:number){
   // this.sharedService.send({content:type});
    this.router.navigate(['/medicamentos'], { queryParams: { categoria: id } });// this.navegar("medicamentos");
  }
  clickUniformes(type:string,id:number){
   // this.sharedService.send({content:type});
    this.router.navigate(['/uniformes'], { queryParams: { categoria: id } });//this.navegar("uniformes");
  }
  clickOdontologicos(type:string,id:number){
  //  this.sharedService.send({content:type});
    this.router.navigate(['/odontologia'], { queryParams: { categoria: id } });//this.navegar("odontologia");
  }
  
  lista(){
    //this.sharedService.send({content:""});
    this.router.navigate(['/lista']);
  }

    listaCategoria(){
    //this.sharedService.send({content:""});
    this.router.navigate(['/listCategoria']);
  }

  listaOtros(){
    //this.sharedService.send({content:""});
    this.router.navigate(['/listOtros']);
  }

listPersonal(){
  this.router.navigate(['/listTrabajador']);
}

reports(){
  this.router.navigate(['/reports']);
}
  loadCategoriasMedicamentos(){
    this.invService.getCategoria(0).subscribe(({categoria}) => {
       this.listMedicamentos=categoria;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }

  loadCategoriasOdontologia(){
    this.invService.getCategoria(1).subscribe(({categoria}) => {
       this.listOdontologia=categoria;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }

  loadCategoriasUniformes(){
    this.invService.getCategoria(2).subscribe(({categoria}) => {
       this.listUniformes=categoria;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }


  ngOnInit(): void {
    this.loadCategoriasMedicamentos();
    this.loadCategoriasUniformes();
    this.loadCategoriasOdontologia();
  }

  


  asignacion(){
    const dialogRef = this.dialog.open(AsignacionComponent, {
     width: '25%',
       //     height:'700px',
      data: { message: 'Este es un mensaje de prueba' },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('El diálogo se cerró');
      //console.log('Resultado:', result);
      //this.navegar("/");
    });
  }


  carrito(){
    const dialogRef = this.dialog.open(CartComponent, {
     width: '300px',
       //     height:'700px',
      data: { message: 'Este es un mensaje de prueba' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
          if(result.res===true){
             console.log("crear asignacion")
             this.asignacion();
          }
      }
    });
  }
  crearProducto(){
    const dialogRef = this.dialog.open(CreateProductComponent, {
     width: '300px',
       //     height:'700px',
      data: { message: 'Este es un mensaje de prueba' },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('El diálogo se cerró');
      //console.log('Resultado:', result);
      //this.navegar("/");
    });

  }

   crearCategoria(){
    const dialogRef = this.dialog.open(CategoriaComponent, {
     width: '300px',
       //     height:'700px',
      data: { message: 'Este es un mensaje de prueba' },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('El diálogo se cerró');
      //console.log('Resultado:', result);
      //this.navegar("/");
    });

  }
/*
/// esta data yo la voy a consultar del backend
medicamentos = [
    'Antibióticos',
    'Analgésicos',
    'Antiinflamatorios',
    'Antidepresivos',
    'Antihistamínicos',
    'Antipiréticos',
    'Vacunas',
    'Medicamentos para Diabetes',
    'Medicamentos Cardiovasculares',
    'Suplementos Vitaminicos',
  ];
uniformes = [
  'Uniformes Escolares',
  'Uniformes para Limpieza',
  'Uniformes de Trabajo',
  'Zapatos Escolares',
  'Ropa de Protección',
  'Uniformes para Analistas',
  'Uniformes para Personal de Salud',
  'Accesorios para Uniformes',
  'Ropa de Oficina',
  'Uniformes Deportivos',
];

equiposDentales = [
  'Exploradores Dentales',
  'Espejos Dentales',
  'Pinzas de Extracción',
  'Jeringas Dentales',
  'Material de Relleno',
  'Impresiones Dentales',
  'Radiografías Dentales',
  'Equipos de Esterilización',
  'Protectores Bucales',
  'Consultorios Móviles',
];*/

}
