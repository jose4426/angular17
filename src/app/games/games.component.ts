import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [ UserComponent],
  template: `
   <ul>
    <h3>Los juegos favoritos de {{username}}</h3>
  @for (game of ganes; track game.id) {
    <li (click)="fav(game.name)">{{game.name}}</li>
  }
   </ul>
  `,
  styles: ``
})
export class GamesComponent {
  
 @Input() username = '';
 @Output() addFavoriteEvent = new EventEmitter<string>()

fav(gamename : string){
this.addFavoriteEvent.emit(gamename);
 // alert(`A ${this.username} le gusta jugar a ${gamename}`)
} 
  ganes=[{
    id: 1,
    name: 'mario bross'
  },
  {
    id: 2,
    name: 'metalSloop'
  },
  {
    id: 3,
    name: 'contra'
  }
]

}
