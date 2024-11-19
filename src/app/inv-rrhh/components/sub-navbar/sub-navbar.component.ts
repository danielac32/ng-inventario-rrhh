import { Component ,OnInit} from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import {SharedService} from '../../shared/shared.service'
import {Message} from '../../interfaces/shared-interface'
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-sub-navbar',
  standalone: true,
  imports: [CarouselModule,CommonModule,MatTooltipModule,MatIconModule,],
  templateUrl: './sub-navbar.component.html',
  styleUrl: './sub-navbar.component.css'
})


export class SubNavbarComponent implements OnInit{
  public error : Boolean=false;
  public enable : Boolean=false;

  public mensaje: Message | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.subscription = this.sharedService.message$.subscribe((message) => {
      if(message)
      {
        this.mensaje = message; // Actualiza el mensaje cuando se recibe uno nuevo
      this.enable = message!.enable;
      }
    });
  }




}
