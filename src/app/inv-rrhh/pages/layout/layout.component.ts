import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component'
import {CardComponent} from '../../components/card/card.component'
import {MainContentComponent} from '../../components/main-content/main-content.component'
import {SidebarComponent} from '../../components/sidebar/sidebar.component'
import {SubNavbarComponent} from '../../components/sub-navbar/sub-navbar.component'
import { RouterOutlet } from '@angular/router';
import {NavComponent} from '../../components/nav/nav.component'



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,NavComponent,NavbarComponent,CardComponent,MainContentComponent,SidebarComponent,SubNavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
error : Boolean=false;
}
