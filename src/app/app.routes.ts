import { Routes } from '@angular/router';

export const routes: Routes = [


	{
        path: '', 
        loadChildren: () => import('./inv-rrhh/inv-rrhh.routes').then(m => m.INV_ROUTES),
        //canActivate: [AuthGuard]
    }




];
