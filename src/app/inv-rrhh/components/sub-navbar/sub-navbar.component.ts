import { Component ,OnInit} from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-navbar',
  standalone: true,
  imports: [CarouselModule,CommonModule],
  templateUrl: './sub-navbar.component.html',
  styleUrl: './sub-navbar.component.css'
})
export class SubNavbarComponent implements OnInit{
 
  items = [
    { title: 'Card 1', content: 'Content for Card 1', id: 1 },
    { title: 'Card 2', content: 'Content for Card 2', id: 2 },
    { title: 'Card 3', content: 'Content for Card 3', id: 3 },
    { title: 'Card 4', content: 'Content for Card 4', id: 4 },
    { title: 'Card 5', content: 'Content for Card 5', id: 5 },
    { title: 'Card 6', content: 'Content for Card 6', id: 6 },
    { title: 'Card 7', content: 'Content for Card 7', id: 7 },
    { title: 'Card 8', content: 'Content for Card 8', id: 8 },
    { title: 'Card 9', content: 'Content for Card 9', id: 9 },
    { title: 'Card 10', content: 'Content for Card 10', id: 10 },
    
  ];


  public mensaje: Message | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.subscription = this.sharedService.message$.subscribe((message) => {
      this.mensaje = message; // Actualiza el mensaje cuando se recibe uno nuevo
    });
  }




}
