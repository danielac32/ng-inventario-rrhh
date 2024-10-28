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

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule,
            MatMenuModule,
            MatTooltipModule,
            MatIconModule,
            CreateProductComponent],

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

  clickMedicamentos(type:string){
    this.sharedService.send({content:type});
    this.navegar("medicamentos");
  }
  clickUniformes(type:string){
    this.sharedService.send({content:type});
    this.navegar("uniformes");
  }
  clickOdontologicos(type:string){
    this.sharedService.send({content:type});
    this.navegar("odontologia");
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



  crearProducto(){
    const dialogRef = this.dialog.open(CreateProductComponent, {
     width: '300px',
       //     height:'700px',
      data: { message: 'Este es un mensaje de prueba' },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('El diálogo se cerró');
      //console.log('Resultado:', result);
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
