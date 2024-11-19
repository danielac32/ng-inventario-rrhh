import { Injectable,inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Message} from '../interfaces/shared-interface'
import { Router ,ActivatedRoute} from '@angular/router';
import {ProductCart} from './shared.cart-interface'



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  router=inject(Router);
  private messageSubject = new BehaviorSubject<Message | null>(null); // Permitir null si es necesario
  message$ = this.messageSubject.asObservable();

  send(message: Message) {
    this.messageSubject.next(message);
  }


  sendmsg(message: Message){
  	this.send(message);
    setTimeout(() => {
      this.send({ ...message, enable: false });
    }, 3000);
    //this.router.navigate(['/']);
  }

  private cart: ProductCart[] = [];
  private cartSubject = new BehaviorSubject<ProductCart[]>([]);

  cart$ = this.cartSubject.asObservable();

  addProduct(product: ProductCart) {
    const existingProduct = this.cart.find(p => p.id === product.id);

    if (existingProduct) {
      this.incrementQuantity(product.id);
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.updateCart();
  }

  incrementQuantity(productId: number) {
    const product = this.cart.find(p => p.id === productId);
    if (product) {
      product.quantity++;
      this.updateCart();
    }
  }

  decrementQuantity(productId: number) {
    const product = this.cart.find(p => p.id === productId);
    if (product) {
      product.quantity--;
      if (product.quantity === 0) {
        this.removeProduct(productId);
      } else {
        this.updateCart();
      }
    }
  }

  removeProduct(productId: number) {
    this.cart = this.cart.filter(p => p.id !== productId);
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next([...this.cart]);
  }
  clearCart() {
    this.cart = [];
    this.updateCart();
  }

  getParent(p:string):string{
      switch (p) {
        case "M":
          return "Madre";
          case "P":
          return "Padre";
          case "H":
          return "Hijo";
          case "C":
          return "Conyuge";
        default:
          // code...
          return "";
      }
  }



}
