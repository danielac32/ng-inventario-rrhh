import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './inv-rrhh/auth/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
  providers: [
    
  ],
})
export class AppComponent {
  title = 'front-inventario-rrhh';
}
