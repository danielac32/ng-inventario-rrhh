import { Routes } from '@angular/router';

export const routes: Routes = [
	

	 {
        path: 'auth',
        loadChildren: () => import('./inv-rrhh/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },

	{
        path: '', 
        loadChildren: () => import('./inv-rrhh/inv-rrhh.routes').then(m => m.INV_ROUTES),
        //canActivate: [AuthGuard]
    }




];
