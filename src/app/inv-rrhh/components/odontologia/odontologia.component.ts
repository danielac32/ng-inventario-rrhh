import { Component ,OnInit,inject,ViewChild} from '@angular/core';
import {CardComponent} from '../../components/card/card.component'
import {SubNavbarComponent} from '../sub-navbar/sub-navbar.component'
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { MatDialog } from '@angular/material/dialog';
import { Router ,ActivatedRoute} from '@angular/router';
import {InvService} from '../../services/inv.service'
import {Producto} from '../../interfaces/createProduct-interface'
import {TypeProduct} from '../../interfaces/inv-enum'



import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatCardModule } from '@angular/material/card'; 
import { ReactiveFormsModule } from '@angular/forms';
import {UpdateProductComponent} from '../../dialog/update-product/update-product.component'
import {AddComponent} from '../../dialog/add/add.component'
import {SubComponent} from '../../dialog/sub/sub.component'
import {DeletePassComponent} from '../../dialog/delete-pass/delete-pass.component'





@Component({
  selector: 'app-odontologia',
  standalone: true,
  imports: [CardComponent,
            SubNavbarComponent,
            MatCardModule,
            MatPaginatorModule,
            MatTableModule,
            CommonModule,
            MatFormFieldModule,
            MatInputModule,
            MatTooltipModule,
            ReactiveFormsModule,
            UpdateProductComponent,
            AddComponent,
            SubComponent,
            DeletePassComponent
            ],
  templateUrl: './odontologia.component.html',
  styleUrl: './odontologia.component.css'
})
export class OdontologiaComponent implements OnInit {
 
router=inject(Router);
invService= inject(InvService);
sharedService=inject(SharedService);
route=inject(ActivatedRoute);
dialog= inject(MatDialog);



items : Producto[]=[];

displayedColumns: string[] = ['id','descripcion', 'codigo', 'stock', 'nombre', 'tipo', 'createdAt', 'categoria','acciones'];
  
  dataSource!: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  loadOdontologia(categoria:string){
    this.invService.getProductoCategoria(TypeProduct.EQUIPOS_ODONTOLOGICOS,+categoria).subscribe(({producto}) => {
       this.items=producto;
       //console.log(producto)
       if (this.items.length === 0) {
      this.sendEmpty();
    }
       this.dataSource = new MatTableDataSource(this.items);
       this.dataSource.paginator = this.paginator;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }

sendEmpty(){
         let message:Message={
              title:"Lista vacia",
              error:false,
              enable:true,
              type:3,
          };
         this.sharedService.sendmsg(message);
}




remove(id:number){
   this.invService.deleteProduct(id).subscribe(({producto}) => {
      let message:Message={
              title:"Producto Eliminado",
              error:false,
              enable:true,
              type:1,
          };
          this.sharedService.sendmsg(message);
          this.router.navigate(['/']);
   }, error => {
        console.error('Error en la solicitud :', error);
         let message:Message={
                title:"Error al eliminar producto",
                error:true,
                enable:true,
                type:2,
            };
           this.sharedService.sendmsg(message);
           this.router.navigate(['/']);
  });
}


delete(id:number){
const dialogRef = this.dialog.open(DeletePassComponent, {
     width: '300px',
       //     height:'700px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(result => {
        //console.log(result)
        if(result){
          if(result.res===true){
             this.remove(id);
          }else if(result.res===false){
             
          }
        }
    });
}



delete2(id:number){
    this.invService.deleteProduct(id).subscribe(({producto}) => {

        /*let message:Message={
            title:"Producto Eliminado",
            error:false,
            enable:true,
            type:1,
        };
        this.sharedService.send(message);
        this.router.navigate(['/']);


        setTimeout(() => {
          this.sharedService.send({ ...message, enable: false });
        }, 3000);*/
          let message:Message={
              title:"Producto Eliminado",
              error:false,
              enable:true,
              type:1,
          };
          this.sharedService.sendmsg(message);
          this.router.navigate(['/']);
    }, error => {
       console.error('Error en la solicitud :', error);
       let message:Message={
              title:"Error al elinar producto",
              error:true,
              enable:true,
              type:2,
          };
         this.sharedService.sendmsg(message);
         this.router.navigate(['/']);
       /*et message:Message={
            title:"Error al elinar producto",
            error:true,
            enable:true,
            type:2,
        };
        this.sharedService.send(message);
        this.router.navigate(['/']);


        setTimeout(() => {
          this.sharedService.send({ ...message, enable: false });
        }, 3000);*/
    });
}


update(id:number){
  const dialogRef = this.dialog.open(UpdateProductComponent, {
     width: '300px',
       //     height:'700px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('El diálogo se cerró');
      //console.log('Resultado:', result);
      //this.navegar("/");
    });

}

add(id:number){
const dialogRef = this.dialog.open(AddComponent, {
     width: '300px',
       //     height:'700px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('El diálogo se cerró');
      //console.log('Resultado:', result);
      //this.navegar("/");
    });
}
sub(id:number){
const dialogRef = this.dialog.open(SubComponent, {
     width: '300px',
       //     height:'700px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('El diálogo se cerró');
      //console.log('Resultado:', result);
      //this.navegar("/");
    });
}
push(producto:Producto){
      this.sharedService.addProduct({
        id:producto.id,
        name:producto.nombre,
        quantity:1
      });
}


filterByCategory() {
    this.dataSource.filter = this.dataSource.filter; // Esto aplicará el filterPredicate
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }
 ngOnInit(){
  this.route.queryParams.subscribe(params => {
    const categoria = params['categoria'];
   this.loadOdontologia(categoria);
  });
 }
}
