import { AfterViewInit,Component,OnInit,Inject,inject ,ViewChild} from '@angular/core';
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

import {InvService} from '../../services/inv.service'

import { Router ,ActivatedRoute} from '@angular/router';
import {DetailAsignacion,ProductoAsignado} from '../../interfaces/familiar-interface'

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-asignacion-detalle-otro',
  standalone: true,
  imports: [],
  templateUrl: './asignacion-detalle-otro.component.html',
  styleUrl: './asignacion-detalle-otro.component.css'
})
export class AsignacionDetalleOtroComponent {

}
