import { Component ,OnInit,inject,ViewChild} from '@angular/core';
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { MatDialog } from '@angular/material/dialog';
import { Router ,ActivatedRoute} from '@angular/router';
import {InvService} from '../../services/inv.service'
import {Producto} from '../../interfaces/createProduct-interface'
import {TypeProduct} from '../../interfaces/inv-enum'
import {CardComponent} from '../../components/card/card.component'

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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
import {DetailsComponent} from '../../dialog/details/details.component'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [UpdateProductComponent,
            ReactiveFormsModule,
            MatTooltipModule,
            MatCardModule,
            CommonModule,
            MatFormFieldModule,
            MatInputModule,
            CardComponent,
            MatTableModule, 
            MatPaginatorModule,
            AddComponent,
            SubComponent,
            DeletePassComponent,
            DetailsComponent
            ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})


export class ListComponent  implements OnInit {
	router=inject(Router);
	invService= inject(InvService);
	sharedService=inject(SharedService);
	route=inject(ActivatedRoute);
  dialog= inject(MatDialog);


	items : Producto[]=[];

    listMedicamentos :Producto[]=[]
	listUniformes :Producto[]=[]
	listOdontologia :Producto[]=[]
  all :Producto[]=[]


    displayedColumns: string[] = ['id','descripcion', 'codigo', 'stock', 'nombre', 'tipo', 'createdAt', 'categoria','acciones'];
   

    dataSource!: MatTableDataSource<Producto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }


  loadAllProuctos(){
    this.invService.getAllProducto().subscribe(({producto}) => {
       this.all=producto;
       this.dataSource = new MatTableDataSource(this.all);
       this.dataSource.paginator = this.paginator;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }
/*
  loadMedicamentos(){
    this.invService.getProducto(TypeProduct.MEDICAMENTOS).subscribe(({producto}) => {
       this.listMedicamentos=producto;
       this.dataSource = new MatTableDataSource(this.listMedicamentos);
       this.dataSource.paginator = this.paginator;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }

  loadOdontologia(){
    this.invService.getProducto(TypeProduct.EQUIPOS_ODONTOLOGICOS).subscribe(({producto}) => {
       this.listOdontologia=producto;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }

  loadUniformes(){
    this.invService.getProducto(TypeProduct.UNIFORMES).subscribe(({producto}) => {
       this.listUniformes=producto;
    }, error => {
       console.error('Error en la solicitud :', error);
    });
  }
*/


remove(id:number){
   this.invService.deleteProduct(id).subscribe(({producto}) => {
      let message:Message={
              title:"Producto Eliminado",
              error:false,
              enable:true,
              type:1,
          };
          this.sharedService.sendmsg(message);
          let reload:Message={
              title:"",
              error:false,
              enable:false,
              type:0,
              reload:true
            };
            this.sharedService.sendmsg(reload);
          //this.router.navigate(['/']);
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

details(id:number){
    const dialogRef = this.dialog.open(DetailsComponent, {
      width: 'auto',
    maxWidth: '90vw',
    autoFocus: false,
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
    let message:Message={
        title:"Añadido al carrito",
        error:false,
        enable:true,
        type:4,
    };
    this.sharedService.sendmsg(message);      
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
  

   public mensaje: Message | null = null;
  private subscription: Subscription = new Subscription();


  ngOnInit(): void {
    //this.loadMedicamentos();
    //this.loadOdontologia();
    //this.loadUniformes();

    this.subscription = this.sharedService.message$.subscribe((message) => {
      if(message)
      {
          this.mensaje = message; 
          if(this.mensaje?.reload){
              this.loadAllProuctos();
          }
      }
    });
    this.loadAllProuctos();
  }



 
}
