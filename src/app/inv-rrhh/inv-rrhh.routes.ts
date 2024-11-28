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
import { AuthGuard } from './auth/services/auth.guard'
import {ListaAsignacionComponent} from './components/lista-asignacion/lista-asignacion.component'

export const INV_ROUTES: Routes = [
    {
        //path: '', component: LayoutComponent, children: [
        path: '', component: LayoutComponent, children: [
            { path: 'medicamentos', component: MedicamentosComponent, canActivate: [AuthGuard]},
            { path: 'uniformes', component: UniformesComponent, canActivate: [AuthGuard]},
            { path: 'odontologia', component: OdontologiaComponent, canActivate: [AuthGuard]},
            { path: 'lista', component: ListComponent, canActivate: [AuthGuard]},
            { path: 'listCategoria', component: ListCategoriaComponent, canActivate: [AuthGuard]},
            { path: 'listTrabajador', component: ListTrabajadorComponent, canActivate: [AuthGuard]},
            { path: 'listOtros', component: ListOtroComponent, canActivate: [AuthGuard]},
            { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
            { path: 'listaAsignaciones', component: ListaAsignacionComponent, canActivate: [AuthGuard] },
            //{ path: 'actualizar', component: UpdateComponent , canActivate: []},
            //{ path: 'generar', component: GenerateComponent , canActivate: []},
            { path: '', redirectTo: 'lista', pathMatch: 'full' }
        ],

    }
];

