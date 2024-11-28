

import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Aquí puedes agregar tu lógica de autenticación (como agregar el token en los headers)
  const token = localStorage.getItem('accessToken'); // ejemplo de cómo obtener el token

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned); // pasa la solicitud modificada al siguiente interceptor o al backend
  }

  return next(req); // pasa la solicitud sin modificaciones si no hay token
};
