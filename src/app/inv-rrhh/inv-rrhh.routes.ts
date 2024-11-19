import { Routes } from "@angular/router";
import { LayoutComponent } from './pages/layout/layout.component'
import {MedicamentosComponent} from './components/medicamentos/medicamentos.component'
import {OdontologiaComponent} from './components/odontologia/odontologia.component'
import {UniformesComponent} from './components/uniformes/uniformes.component'
import {ListComponent} from './components/list/list.component'
import {ListCategoriaComponent} from './components/list-categoria/list-categoria.component'
import {ListTrabajadorComponent} from './components/list-trabajador/list-trabajador.component'
import {ListOtroComponent} from './components/list-otro/list-otro.component'
import {ReportsComponent} from './components/report/reports/reports.component'


export const INV_ROUTES: Routes = [
    {
        //path: '', component: LayoutComponent, children: [
        path: '', component: LayoutComponent, children: [
            { path: 'medicamentos', component: MedicamentosComponent, canActivate: []},
            { path: 'uniformes', component: UniformesComponent, canActivate: []},
            { path: 'odontologia', component: OdontologiaComponent, canActivate: []},
            { path: 'lista', component: ListComponent, canActivate: []},
            { path: 'listCategoria', component: ListCategoriaComponent, canActivate: []},
            { path: 'listTrabajador', component: ListTrabajadorComponent, canActivate: []},
            { path: 'listOtros', component: ListOtroComponent, canActivate: []},
            { path: 'reports', component: ReportsComponent, canActivate: []},
            //{ path: 'crear', component: CrearComponent, canActivate: [] },
            //{ path: 'actualizar', component: UpdateComponent , canActivate: []},
            //{ path: 'generar', component: GenerateComponent , canActivate: []},
            //{ path: '', redirectTo: 'nuevo-ingreso', pathMatch: 'full' }
        ],

    }
];

