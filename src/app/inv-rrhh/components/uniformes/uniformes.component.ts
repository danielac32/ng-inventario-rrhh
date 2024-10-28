import { Component ,OnInit,inject} from '@angular/core';
import {CardComponent} from '../../components/card/card.component'


@Component({
  selector: 'app-uniformes',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './uniformes.component.html',
  styleUrl: './uniformes.component.css'
})
export class UniformesComponent implements OnInit {
items = [
    { title: 'Uniforme 1', content: 'Bata Médica', id: 1 },
    { title: 'Uniforme 2', content: 'Pantalón de Trabajo', id: 2 },
    { title: 'Uniforme 3', content: 'Camisa Quirúrgica', id: 3 },
    { title: 'Uniforme 4', content: 'Chaqueta de Enfermería', id: 4 },
    { title: 'Uniforme 5', content: 'Zapatillas de Seguridad', id: 5 },
    { title: 'Uniforme 6', content: 'Gorro Quirúrgico', id: 6 },
    { title: 'Uniforme 7', content: 'Mascarilla Facial', id: 7 },
    { title: 'Uniforme 8', content: 'Guantes Desechables', id: 8 }
    /*{ title: 'Card 9', content: 'Content for Card 9', id: 9 },
    { title: 'Card 10', content: 'Content for Card 10', id: 10 },
    { title: 'Card 11', content: 'Content for Card 11', id: 11 },
    { title: 'Card 12', content: 'Content for Card 12', id: 12 },
    { title: 'Card 13', content: 'Content for Card 13', id: 13 },
    { title: 'Card 14', content: 'Content for Card 14', id: 14 },
    { title: 'Card 15', content: 'Content for Card 15', id: 15 },
    { title: 'Card 16', content: 'Content for Card 16', id: 16 },
    { title: 'Card 17', content: 'Content for Card 17', id: 17 },
    { title: 'Card 18', content: 'Content for Card 18', id: 18 },
    { title: 'Card 19', content: 'Content for Card 19', id: 19 },
    { title: 'Card 20', content: 'Content for Card 20', id: 20 },
    { title: 'Card 21', content: 'Content for Card 21', id: 21 },
    { title: 'Card 22', content: 'Content for Card 22', id: 22 },
    { title: 'Card 23', content: 'Content for Card 23', id: 23 },
    { title: 'Card 24', content: 'Content for Card 24', id: 24 },
    { title: 'Card 25', content: 'Content for Card 25', id: 25 },
    { title: 'Card 26', content: 'Content for Card 26', id: 26 },
    { title: 'Card 27', content: 'Content for Card 27', id: 27 },
    { title: 'Card 28', content: 'Content for Card 28', id: 28 },
    { title: 'Card 29', content: 'Content for Card 29', id: 29 },
    { title: 'Card 30', content: 'Content for Card 30', id: 30 },
    { title: 'Card 31', content: 'Content for Card 31', id: 31 },
    { title: 'Card 32', content: 'Content for Card 32', id: 32 },
    { title: 'Card 33', content: 'Content for Card 33', id: 33 },
    { title: 'Card 34', content: 'Content for Card 34', id: 34 },
    { title: 'Card 35', content: 'Content for Card 35', id: 35 },
    { title: 'Card 36', content: 'Content for Card 36', id: 36 },
    { title: 'Card 37', content: 'Content for Card 37', id: 37 },
    { title: 'Card 38', content: 'Content for Card 38', id: 38 },
    { title: 'Card 39', content: 'Content for Card 39', id: 39 },
    { title: 'Card 40', content: 'Content for Card 40', id: 40 },
    { title: 'Card 41', content: 'Content for Card 41', id: 41 },
    { title: 'Card 42', content: 'Content for Card 42', id: 42 },
    { title: 'Card 43', content: 'Content for Card 43', id: 43 },
    { title: 'Card 44', content: 'Content for Card 44', id: 44 },
    { title: 'Card 45', content: 'Content for Card 45', id: 45 },
    { title: 'Card 46', content: 'Content for Card 46', id: 46 },
    { title: 'Card 47', content: 'Content for Card 47', id: 47 },
    { title: 'Card 48', content: 'Content for Card 48', id: 48 },
    { title: 'Card 49', content: 'Content for Card 49', id: 49 },
    { title: 'Card 50', content: 'Content for Card 50', id: 50 },*/
];


 ngOnInit(){

 }
}