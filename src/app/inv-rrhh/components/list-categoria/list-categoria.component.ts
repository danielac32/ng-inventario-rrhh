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
import {Categoria} from '../../interfaces/categorias-interface'
import {DeletePassComponent} from '../../dialog/delete-pass/delete-pass.component'
import {UpdateCategoriaComponent} from '../../dialog/update-categoria/update-categoria.component'

@Component({
  selector: 'app-list-categoria',
  standalone: true,
  imports: [ReactiveFormsModule,
            MatTooltipModule,
            MatCardModule,
            CommonModule,
            MatFormFieldModule,
            MatInputModule,
            CardComponent,
            MatTableModule, 
            MatPaginatorModule,
            DeletePassComponent,
            UpdateCategoriaComponent
            ],
  templateUrl: './list-categoria.component.html',
  styleUrl: './list-categoria.component.css'
})
export class ListCategoriaComponent implements OnInit {
	router=inject(Router);
	invService= inject(InvService);
	sharedService=inject(SharedService);
	route=inject(ActivatedRoute);
    dialog= inject(MatDialog);
	all :Categoria[]=[]


    displayedColumns: string[] = ['id','nombre', 'tipo','acciones'];
   

    dataSource!: MatTableDataSource<Categoria>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
  loadAllCategorias(){
    this.invService.getAllCategoria().subscribe(({categoria}) => {
       this.all=categoria;
       this.dataSource = new MatTableDataSource(this.all);
       this.dataSource.paginator = this.paginator;
    }, error => {
       console.error('Error en la solicitud :', error);
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

  ngOnInit(): void {
    //this.loadMedicamentos();
    //this.loadOdontologia();
    //this.loadUniformes();
    this.loadAllCategorias();
  }



remove(id:number){
	 this.invService.deleteCategoria(id).subscribe(({categoria}) => {
	 	 let message:Message={
              title:"Categoria Eliminado",
              error:false,
              enable:true,
              type:1,
          };
          this.sharedService.sendmsg(message);
          this.router.navigate(['/']);
	 }, error => {
	 	   console.error('Error en la solicitud :', error);
	       let message:Message={
	              title:"Error al eliminar categoria",
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
update(id:number){
const dialogRef = this.dialog.open(UpdateCategoriaComponent, {
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

}
