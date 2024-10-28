import { Routes } from "@angular/router";
import { LayoutComponent } from './pages/layout/layout.component'


export const INV_ROUTES: Routes = [
    {
        //path: '', component: LayoutComponent, children: [
        path: '', component: LayoutComponent, children: [
            //{ path: 'list', component: IndexComponent, canActivate: []},
            //{ path: 'buscar', component: BuscarComponent, canActivate: []},
            //{ path: 'crear', component: CrearComponent, canActivate: [] },
            //{ path: 'actualizar', component: UpdateComponent , canActivate: []},
            //{ path: 'generar', component: GenerateComponent , canActivate: []},
            //{ path: '', redirectTo: 'nuevo-ingreso', pathMatch: 'full' }
        ]
    }
];

