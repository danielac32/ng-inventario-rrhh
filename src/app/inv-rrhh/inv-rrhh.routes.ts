import { Routes } from "@angular/router";
import { LayoutComponent } from './pages/layout/layout.component'
import {MedicamentosComponent} from './components/medicamentos/medicamentos.component'
import {OdontologiaComponent} from './components/odontologia/odontologia.component'
import {UniformesComponent} from './components/uniformes/uniformes.component'


export const INV_ROUTES: Routes = [
    {
        //path: '', component: LayoutComponent, children: [
        path: '', component: LayoutComponent, children: [
            { path: 'medicamentos', component: MedicamentosComponent, canActivate: []},
            { path: 'uniformes', component: UniformesComponent, canActivate: []},
            { path: 'odontologia', component: OdontologiaComponent, canActivate: []},
            //{ path: 'buscar', component: BuscarComponent, canActivate: []},
            //{ path: 'crear', component: CrearComponent, canActivate: [] },
            //{ path: 'actualizar', component: UpdateComponent , canActivate: []},
            //{ path: 'generar', component: GenerateComponent , canActivate: []},
            //{ path: '', redirectTo: 'nuevo-ingreso', pathMatch: 'full' }
        ],

    }
];

