import { Component, inject ,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

 
import { MatMenuModule } from '@angular/material/menu';
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'

import { MatTooltipModule } from '@angular/material/tooltip';
 
import {InvService} from '../../services/inv.service'
import {Categoria} from '../../interfaces/categorias-interface'

import {CreateProductComponent} from '../../dialog/create-product/create-product.component'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {CartComponent} from '../../dialog/cart/cart.component'
import {CategoriaComponent} from '../../dialog/categoria/categoria.component'
import {AsignacionComponent} from '../../dialog/asignacion/asignacion.component'
import { RouterOutlet } from '@angular/router';
import {SubNavbarComponent} from '../../components/sub-navbar/sub-navbar.component'
import {NavbarComponent} from '../../components/navbar/navbar.component'
import {AuthService} from '../../auth/services/auth.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    AsyncPipe,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    CreateProductComponent,
    CartComponent,
    CategoriaComponent,
    AsignacionComponent,
    RouterOutlet,
    SubNavbarComponent,
    NavbarComponent
  ]
})
export class NavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


router=inject(Router);
  sharedService=inject(SharedService);
  invService= inject(InvService);
  dialog= inject(MatDialog);
  authService=inject(AuthService);


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

salir(){
  this.authService.logout();
}

listaAsignaciones(){
  this.router.navigate(['/listaAsignaciones']);
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


}
