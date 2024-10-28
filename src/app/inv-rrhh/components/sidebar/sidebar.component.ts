import { Component,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule,
            MatMenuModule],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


sharedService=inject(SharedService);

clickMedicamentos(type:string){
  this.sharedService.send({content:type});
}
clickUniformes(type:string){
  this.sharedService.send({content:type});
}
clickOdontologicos(type:string){
  this.sharedService.send({content:type});
}



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
];

}
