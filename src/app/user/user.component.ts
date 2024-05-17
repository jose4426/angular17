import { Component } from '@angular/core';
import { GamesComponent } from '../games/games.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [GamesComponent, RegisterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  username= 'Jose';
  isLogin = false;
  favGame = '';

  getFavorite(gamename:string){
    this.favGame = gamename;
  }

greet(){

  alert("hollaaa");
}


}
